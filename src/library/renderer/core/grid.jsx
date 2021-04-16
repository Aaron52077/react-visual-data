/**
 * 基于react-grid-layout的核心拖拽方案
 */
import React, { useState, useEffect, memo, useMemo, useCallback } from "react";
import cx from "classnames";
import { WidthProvider, Responsive } from "react-grid-layout";
import { connect } from "react-redux";
import { getField } from "~materials";
import { useTools } from "~common/hooks";
import { mergeFieldConfig, setLevelPath } from "../utils";
import { throttle } from "~utils";
import generator from "../generator";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

// TODO：ui和组件拔插模式
function GeneratorField({ value = {}, onValueChange = () => {}, activeKey, dispatch }) {
  const { title, hideTitle, titleAlign, titleColor, background, ...rest } = value.data;

  const classNames = cx("gc-field-grid animate__animated", {
    [`animate__${rest.animateType}`]: rest.animateType,
    [`animate__${rest.animateSpeed}`]: rest.animateSpeed,
    [`animate__${rest.animateRepeat}`]: rest.animateRepeat,
    [`animate__delay-${rest.animateTime}s`]: rest.animateTime
  });

  const isSelect = useMemo(() => {
    return activeKey === value.uniqueId;
  }, [activeKey]);

  const handleClick = (e) => {
    e.stopPropagation();
    if (isSelect) return;

    dispatch({ type: "component/fieldType", data: "component" });
    // TODO: 获取当前用户点击的key
    dispatch({ type: "component/activeKey", data: value.uniqueId });
  };

  const overwriteStyle = {
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: isSelect ? "#2681ff" : "transparent",
    background,
    boxShadow: rest.shadowColor
      ? `${rest.shadowColor} ${rest.shadowWidth || 0} ${rest.shadowOffset || 0} ${rest.shadowOffset || 0}`
      : rest.shadowWidth
  };

  const getSubField = useCallback(
    (m) => {
      const prop = getField(value.type);
      return generator(prop)(m);
    },
    [value.type]
  );

  const fieldProps = useMemo(
    () => ({
      value: value.data,
      type: value.type,
      uniqueId: value.uniqueId,
      options: value.data.config || {},
      onChange: (val, level = 1) => {
        onValueChange && onValueChange(value.uniqueId, val, level);
      }
    }),
    [isSelect, value.data, onValueChange]
  );

  return (
    <div className={classNames} style={overwriteStyle} onClick={handleClick}>
      {!hideTitle ? (
        <div
          className="grid-hd"
          style={{
            color: titleColor,
            textAlign: titleAlign
          }}
        >
          {title}
        </div>
      ) : null}
      <div className="grid-bd">{getSubField(fieldProps)}</div>
    </div>
  );
}

function GridRenderer({ dataGrid, activeKey, conditions, dispatch }) {
  const { setState } = useTools();
  const [layouts, setLayouts] = useState({});
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    // setFlag(true);
    const generateLayouts = dataGrid.map((item) => ({
      i: item.uniqueId,
      x: item.data.left,
      y: item.data.top || Infinity, // puts it at the bottom
      w: item.data.width || 4,
      h: item.data.height || 25
    }));
    setLayouts({ lg: generateLayouts, sm: generateLayouts });
  }, [dataGrid]);

  const onDragHandle = (layout, oldItem, newItem, placeholder, e) => {
    // TODO: fix拖拽和点击事件冲突
    if (layout.some((o) => o.i === oldItem.i)) return;
    e.preventDefault();
    e.stopPropagation();
  };

  function onLayoutChange(layout) {
    if (!flag) {
      return;
    }
    let results;
    for (const o of layout) {
      results = mergeFieldConfig(
        dataGrid,
        { parentId: o.i },
        {
          width: o.w,
          height: o.h,
          left: o.x,
          top: o.y
        }
      );
    }
    // TODO: 处理过滤条件数据
    throttle(setState({ components: results }), 500);
  }

  const onValueChange = (uniqueId, value, level = 0) => {
    setLevelPath(dataGrid, null);
    let results = mergeFieldConfig(dataGrid, { parentId: uniqueId, level: level }, value);
    setState({ components: results });
  };

  if (dataGrid.length === 0) return null;

  return (
    <ResponsiveGridLayout
      width={1200}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 12, md: 12, sm: 12, xs: 4, xxs: 2 }}
      rowHeight={0}
      isResizable={true}
      isDraggable={true}
      layouts={layouts}
      containerPadding={[0, 0]}
      useCSSTransforms={false}
      onDragStart={onDragHandle}
      onLayoutChange={onLayoutChange}
    >
      {dataGrid.map((item) => (
        <div key={item.uniqueId}>
          {!item.data.isHidden ? (
            <GeneratorField
              value={item}
              key={item.uniqueId}
              activeKey={activeKey}
              dispatch={dispatch}
              onValueChange={onValueChange}
            />
          ) : null}
        </div>
      ))}
    </ResponsiveGridLayout>
  );
}

export default connect((state) => ({
  activeKey: state.component.activeKey,
  conditions: state.form.conditions
}))(memo(GridRenderer));
