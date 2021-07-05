import React, { useEffect, useRef, useState, forwardRef, useMemo } from "react";
import { useAutoResize } from "~hooks/useAutoResize";

const defaultConfig = {
  data: [],
  rowNum: 5,
  waitTime: 2000,
  carousel: "single",
  unit: "",
  sort: true
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

function calcRows({ data, rowNum, sort }) {
  sort &&
    data.sort(({ value: a }, { value: b }) => {
      if (a > b) return -1;
      if (a < b) return 1;
      if (a === b) return 0;
    });

  const value = data.map(({ value }) => value);

  const max = Math.max(...value) || 0;

  data = data.map((row, i) => ({
    ...row,
    ranking: i + 1,
    percent: (row.value / max) * 100
  }));

  const rowLength = data.length;

  if (rowLength > rowNum && rowLength < 2 * rowNum) {
    data = [...data, ...data];
  }

  data = data.map((d, i) => ({ ...d, scroll: i }));

  return data;
}

const ScrollRankPanel = forwardRef(({ config = {}, style }, ref) => {
  const { width, height, domRef } = useAutoResize(ref);

  const [store, setState] = useState({
    mergedConfig: null,
    rows: [],
    heights: []
  });

  const { mergedConfig, rows, heights } = store;

  const stateRef = useRef({
    ...store,
    rowsData: [],
    avgHeight: 0,
    animationIndex: 0
  });

  const heightRef = useRef(height);

  Object.assign(stateRef.current, store);

  function onResize(onresize = false) {
    if (!mergedConfig) return;

    const heights = calcHeights(mergedConfig, onresize);

    if (heights !== undefined) {
      Object.assign(stateRef.current, { heights });
      setState((state) => ({ ...state, heights }));
    }
  }

  function calcData() {
    const mergedConfig = { ...defaultConfig, ...config };

    const rows = calcRows(mergedConfig);

    const heights = calcHeights(mergedConfig);

    const data = { mergedConfig, rows };

    heights !== undefined && Object.assign(data, { heights });

    Object.assign(stateRef.current, data, {
      rowsData: rows,
      animationIndex: 0
    });

    setState((state) => ({ ...state, ...data }));
  }

  function calcHeights({ rowNum, data }, onresize = false) {
    const avgHeight = height / rowNum;

    Object.assign(stateRef.current, { avgHeight });

    if (!onresize) {
      return new Array(data.length).fill(avgHeight);
    }
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

    return interceptor(loop).end;
  }, [config, domRef.current]);

  useEffect(() => {
    if (heightRef.current === 0 && height !== 0) {
      onResize();

      heightRef.current = height;
    } else {
      onResize(true);
    }
  }, [width, height, domRef.current]);

  return (
    <div className="gc-scroll-ranking-board" style={style} ref={domRef}>
      {rows.map((item, i) => (
        <div className="row-item" key={item.toString() + item.scroll} style={{ height: `${heights[i]}px` }}>
          <div className="ranking-info">
            <div className="rank">No.{item.ranking}</div>
            <div className="info-name" dangerouslySetInnerHTML={{ __html: item.name }} />
            <div className="ranking-value">{item.value + mergedConfig.unit}</div>
          </div>

          <div className="ranking-column">
            <div className="inside-column" style={{ width: `${item.percent}%` }}>
              <div className="shine" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
});

export default ({ options, schema }) => {
  const { data } = schema;

  const option = useMemo(() => {
    return {
      ...options,
      ...data
    };
  }, [options, data]);

  return <ScrollRankPanel config={option} />;
};
