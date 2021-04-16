/**
 * 基于rnd的核心拖拽方案
 */
import React, { useMemo, useState, useEffect, useCallback } from "react";
import cx from "classnames";
import { Rnd } from "react-rnd";
import { connect } from "react-redux";
import { getField } from "~materials";
import { useStore, useTools } from "~common/hooks";
import { throttle } from "~utils";
import { round, converLayout } from "~utils/helper";
import generator from "../generator";

// TODO：ui和组件拔插模式
const ScreenRenderer = ({ value, onValueChange, tabDependencies, tabComponent, activeKey, dispatch }) => {
  const { width, height, background, left, top, isHidden, isLock, ...rest } = value.data;
  const [locations, setLocations] = useState({ left: left, top: top });
  const [show, setShow] = useState(true);
  const { state, setState } = useTools();
  const { view } = useStore();

  const classNames = cx("gc-field animate__animated", {
    [`animate__${rest.animateType}`]: rest.animateType,
    [`animate__${rest.animateSpeed}`]: rest.animateSpeed,
    [`animate__${rest.animateRepeat}`]: rest.animateRepeat,
    [`animate__delay-${rest.animateTime}s`]: rest.animateTime
  });

  const isSelect = useMemo(() => {
    return activeKey === value.uniqueId;
  }, [activeKey]);

  const isEditing = useMemo(() => {
    return isLock || isHidden;
  }, [isLock, isHidden]);

  // TODO: tabs控件控制器
  useEffect(() => {
    if (tabComponent.length === 0) return;

    const _tabComponents = state.components.filter((item) => tabComponent.some((el) => el.to.includes(item.uniqueId)));
    let _components = _tabComponents.find((item) => item.uniqueId === value.uniqueId);
    if (typeof _components === "undefined") {
      return;
    }

    if (_components && tabDependencies.length && value.type !== "tabs") {
      const ret = tabDependencies.some((el) => el.mapping.includes(value.uniqueId));
      setShow(ret);
    }
  }, [tabDependencies]);

  useEffect(() => {
    setShow(!isHidden);
  }, [isHidden]);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isSelect) return;

    setState({ tabsKey: "base" });
    // TODO: 获取当前用户点击的key
    dispatch({ type: "component/activeKey", data: value.uniqueId });
  };

  // const handleMouseOver = useCallback(
  //   (e) => {
  //     e.preventDefault();
  //     e.stopPropagation();

  //     if (activeKey === value.uniqueId) return;
  //     // TODO: 获取当前用户点击的key
  //     throttle(dispatch({ type: "component/activeKey", data: value.uniqueId }), 800);
  //   },
  //   [activeKey]
  // );

  // const handleMouseOut = useCallback(
  //   (e) => {
  //     e.preventDefault();
  //     e.stopPropagation();

  //     if (activeKey === value.uniqueId) return;
  //     // TODO: 获取当前用户点击的key
  //     throttle(dispatch({ type: "component/activeKey", data: "-" }), 800);
  //   },
  //   [activeKey]
  // );

  const overwriteStyle = {
    width: converLayout(width),
    height: converLayout(height),
    borderStyle: rest.borderStyle || "solid",
    borderColor: isSelect ? "#2681ff" : "transparent",
    background,
    borderRadius: rest.borderRadius,
    borderWidth: rest.borderWidth || 2,
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

  const onDragHandle = (e, d) => {
    e.preventDefault();
    e.stopPropagation();
    // TODO： 调优节流
    throttle(
      setLocations({
        left: round(d.lastX),
        top: round(d.lastY)
      })
    );
  };

  const onDragStopHandle = (e, d) => {
    e.preventDefault();
    e.stopPropagation();

    onValueChange(
      value.uniqueId,
      Object.assign(value.data, {
        left: round(d.lastX),
        top: round(d.lastY)
      })
    );
  };

  const onResizeHandle = (e, direction, ref, delta, position) => {
    e.preventDefault();
    e.stopPropagation();
    // TODO： 调优节流
    throttle(
      onValueChange(
        value.uniqueId,
        Object.assign(value.data, {
          left: round(position.x),
          top: round(position.y),
          width: ref.offsetWidth,
          height: ref.offsetHeight
        })
      )
    );
  };

  // 阻止事件默认事件、冒泡
  const onStopPropagation = (e) => {
    e.preventDefault();
    e.stopPropagation();
    return;
  };

  const fieldProps = useMemo(
    () => ({
      value: value.data,
      uniqueId: value.uniqueId,
      type: value.type,
      options: value.data.config || {},
      onChange: (val, level = 1) => {
        onValueChange && onValueChange(value.uniqueId, val, level);
      }
    }),
    [isSelect, onValueChange]
  );

  return (
    <Rnd
      size={{ width: width, height: height }}
      position={{ x: left, y: top }}
      id={value.uniqueId}
      bounds="body"
      dragAxis="both"
      disableDragging={isEditing}
      enableResizing={!isEditing}
      scale={view.scale}
      onDragStart={onStopPropagation}
      onDrag={onDragHandle}
      onDragStop={onDragStopHandle}
      onResize={onResizeHandle}
      onResizeStop={onStopPropagation}
    >
      <div className={cx("grid-line", { "is-active": isSelect })}>
        <div className="grid-line-top"></div>
        <div className="grid-line-left"></div>
        <div className="grid-line-label">
          {locations.left}, {locations.top}
        </div>
      </div>
      <div
        className={classNames}
        style={overwriteStyle}
        onClick={handleClick}
        // onMouseEnter={(e) => {
        //   handleMouseOver(e);
        // }}
        // onMouseLeave={(e) => {
        //   handleMouseOut(e);
        // }}
      >
        {show ? getSubField(fieldProps) : null}
        {isSelect ? (
          <div className="widget-circle">
            <div className="widget-circle__top">
              <div className="top-left"></div>
              <div className="top-center"></div>
              <div className="top-right"></div>
            </div>
            <div className="widget-circle__bottom">
              <div className="bottom-left"></div>
              <div className="bottom-center"></div>
              <div className="bottom-right"></div>
            </div>
            <div className="widget-circle__left">
              <div className="left-center"></div>
            </div>
            <div className="widget-circle__right">
              <div className="right-center"></div>
            </div>
          </div>
        ) : null}
      </div>
    </Rnd>
  );
};

export default connect((state) => ({
  activeKey: state.component.activeKey,
  tabDependencies: state.tab.dependencies,
  tabComponent: state.tab.component
}))(ScreenRenderer);
