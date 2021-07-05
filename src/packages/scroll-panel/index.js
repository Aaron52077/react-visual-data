import React, { useEffect, useState, useRef, forwardRef, useMemo } from "react";
import PropTypes from "prop-types";
import { useAutoResize } from "~hooks/useAutoResize";

const defaultConfig = {
  columns: [],
  rows: [],
  rowNum: 5,
  headerBGC: "#00BAFF",
  oddRowBGC: "#003B51",
  evenRowBGC: "#0A2732",
  waitTime: 2000,
  headerHeight: 35,
  columnWidth: [],
  align: [],
  index: false,
  indexHeader: "#",
  carousel: "single",
  hoverPause: true
};

function interceptor(gen) {
  let destroyed = false;

  // 处理 return 之后 resume 的问题
  let stop = false;

  if (typeof gen === "function") gen = gen();

  if (!gen || typeof gen.next !== "function") return () => ({});

  Promise.resolve().then(() => {
    destroyed || next(gen.next());
  });

  return {
    end() {
      destroyed = true;

      Promise.resolve().then(() => {
        gen.return();

        gen = null;
      });
    },
    pause() {
      if (!destroyed) {
        stop = true;
      }
    },
    resume() {
      Promise.resolve().then(() => {
        if (!destroyed && stop) {
          stop = false;

          next(gen.next());
        }
      });
    }
  };

  function next(ret) {
    if (ret.done) return ret.value;

    return Promise.resolve(ret.value).then(() => {
      !destroyed && !stop && next(gen.next());
    });
  }
}

function calcHeaderData({ columns, index, indexHeader }) {
  if (!columns.length) {
    return [];
  }

  columns = [...columns];

  if (index)
    columns.unshift({
      name: indexHeader,
      index: -1
    });

  return columns;
}

function calcRows({ rows, index, headerBGC, rowNum }) {
  if (index) {
    rows = rows.map((row, i) => {
      row = [...row];

      const indexTag = `<span class="index" style="background-color: ${headerBGC};">${i + 1}</span>`;

      row.unshift(indexTag);

      return row;
    });
  }

  rows = rows.map((cell, i) => ({ cell, rowIndex: i }));

  const rowLength = rows.length;

  if (rowLength > rowNum && rowLength < 2 * rowNum) {
    rows = [...rows, ...rows];
  }

  return rows.map((d, i) => ({ ...d, scroll: i }));
}

function calcAligns(mergedConfig, columns) {
  const columnNum = columns.length;

  let aligns = new Array(columnNum).fill("left");

  const { align } = mergedConfig;

  return { ...aligns, ...align };
}

const ScrollRankPanel = forwardRef(({ onClick, config = {}, style, onMouseOver }, ref) => {
  const { width, height, domRef } = useAutoResize(ref);

  const [state, setState] = useState({
    mergedConfig: null,
    columns: [],
    rows: [],
    widths: [],
    heights: [],
    aligns: []
  });

  const { mergedConfig, columns, rows, widths, heights, aligns } = state;

  const stateRef = useRef({
    ...state,
    rowsData: [],
    avgHeight: 0,
    animationIndex: 0
  });

  Object.assign(stateRef.current, state);

  function onResize() {
    if (!mergedConfig) return;

    const widths = calcWidths(mergedConfig, stateRef.current.rowsData);

    const heights = calcHeights(mergedConfig, columns);

    const rows = { widths, heights };

    Object.assign(stateRef.current, rows);
    setState((state) => ({ ...state, ...rows }));
  }

  function calcData() {
    const mergedConfig = { ...defaultConfig, ...config };

    const columns = calcHeaderData(mergedConfig);

    const rows = calcRows(mergedConfig);

    const widths = calcWidths(mergedConfig, stateRef.current.rowsData);

    const heights = calcHeights(mergedConfig, columns);

    const aligns = calcAligns(mergedConfig, columns);

    const data = {
      mergedConfig,
      columns,
      rows,
      widths,
      aligns,
      heights
    };

    Object.assign(stateRef.current, data, {
      rowsData: rows,
      animationIndex: 0
    });

    setState((state) => ({ ...state, ...data }));
  }

  function calcWidths({ columnWidth, columns }, rowsData) {
    const usedWidth = columnWidth.reduce((all, w) => all + w, 0);

    let columnNum = 0;
    if (rowsData[0]) {
      columnNum = rowsData[0].cell.length;
    } else if (columns.length) {
      columnNum = columns.length;
    }

    const avgWidth = (width - usedWidth) / (columnNum - columnWidth.length);

    const widths = new Array(columnNum).fill(avgWidth);

    return { ...widths, ...columnWidth };
  }

  function calcHeights({ headerHeight, rowNum, rows }, columns) {
    let allHeight = height;

    if (columns.length) allHeight -= headerHeight;

    const avgHeight = allHeight / rowNum;

    Object.assign(stateRef.current, { avgHeight });

    return new Array(rows.length).fill(avgHeight);
  }

  function* animation(start = false) {
    let {
      avgHeight,
      animationIndex,
      mergedConfig: { waitTime, carousel, rowNum },
      rowsData
    } = stateRef.current;

    const rowLength = rowsData.length;

    if (start) yield new Promise((resolve) => setTimeout(resolve, waitTime));

    const animationNum = carousel === "single" ? 1 : rowNum;

    let rows = rowsData.slice(animationIndex);
    rows.push(...rowsData.slice(0, animationIndex));

    const heights = new Array(rowLength).fill(avgHeight);
    setState((state) => ({ ...state, rows, heights }));

    yield new Promise((resolve) => setTimeout(resolve, 300));

    animationIndex += animationNum;

    const back = animationIndex - rowLength;
    if (back >= 0) animationIndex = back;

    const newHeights = [...heights];
    newHeights.splice(0, animationNum, ...new Array(animationNum).fill(0));

    Object.assign(stateRef.current, { animationIndex });
    setState((state) => ({ ...state, heights: newHeights }));
  }

  function emitEvent(handle, ri, ci, row, ceil) {
    const { cell, rowIndex } = row;

    handle && handle({ row: cell, ceil, rowIndex, columnIndex: ci });
  }

  function handleHover(enter, ri, ci, row, ceil) {
    if (enter) emitEvent(onMouseOver, ri, ci, row, ceil);

    if (!mergedConfig.hoverPause) return;

    if (enter) {
      task.pause && task.pause();
    } else {
      task.resume && task.resume();
    }
  }

  const getBackgroundColor = (rowIndex) => mergedConfig[rowIndex % 2 === 0 ? "evenRowBGC" : "oddRowBGC"];

  let task = {};

  useEffect(() => {
    calcData();

    let start = true;

    function* loop() {
      while (true) {
        yield* animation(start);

        start = false;

        const { waitTime } = stateRef.current.mergedConfig;

        yield new Promise((resolve) => setTimeout(resolve, waitTime - 300));
      }
    }

    const {
      mergedConfig: { rowNum },
      rows: rowsData
    } = stateRef.current;

    const rowLength = rowsData.length;

    if (rowNum >= rowLength) return;

    task = interceptor(loop);

    return task.end;
  }, [config, domRef.current]);

  useEffect(onResize, [width, height, domRef.current]);

  return (
    <div className="gc-scroll-board" style={style} ref={domRef}>
      {!!columns.length && !!mergedConfig && (
        <div className="header" style={{ backgroundColor: `${mergedConfig.headerBGC}` }}>
          {columns.map((headerItem, i) => (
            <div
              className="header-item"
              key={headerItem + i}
              style={{
                height: `${mergedConfig.headerHeight}px`,
                lineHeight: `${mergedConfig.headerHeight}px`,
                width: `${widths[i]}px`
              }}
              align={aligns[i]}
              dangerouslySetInnerHTML={{ __html: headerItem.name }}
            />
          ))}
        </div>
      )}

      {!!mergedConfig && (
        <div
          className="rows"
          style={{
            height: `${height - (columns.length ? mergedConfig.headerHeight : 0)}px`
          }}
        >
          {rows.map((row, ri) => (
            <div
              className="row-item"
              key={row.toString() + row.scroll}
              style={{
                height: `${heights[ri]}px`,
                lineHeight: `${heights[ri]}px`,
                backgroundColor: `${getBackgroundColor(row.rowIndex)}`
              }}
            >
              {row.cell.map((ceil, ci) => (
                <div
                  className="ceil"
                  key={ceil + ri + ci}
                  style={{ width: `${widths[ci]}px` }}
                  align={aligns[ci]}
                  dangerouslySetInnerHTML={{ __html: ceil }}
                  onClick={() => emitEvent(onClick, ri, ci, row, ceil)}
                  onMouseEnter={() => handleHover(true, ri, ci, row, ceil)}
                  onMouseLeave={() => handleHover(false)}
                />
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

ScrollRankPanel.propTypes = {
  config: PropTypes.object,
  onClick: PropTypes.func,
  onMouseOver: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object
};

const VScrollPanel = ({ options, schema }) => {
  const { data } = schema;

  const option = useMemo(() => {
    return {
      ...options,
      ...data
    };
  }, [options, data]);

  return <ScrollRankPanel config={option} />;
};

export default VScrollPanel;
