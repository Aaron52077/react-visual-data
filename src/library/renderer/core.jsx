/**
 * 基于rnd的核心拖拽方案
 */
import React, { useMemo, useState, useEffect, useCallback } from 'react';
import cx from 'classnames';
import { Rnd } from 'react-rnd';
import { connect } from 'react-redux';
import { getField } from '~materials';
import { useStore, useTools } from '~common/hooks';
import { throttle } from '~utils';
import { round, converLayout } from '~utils/helper';
import generator from './generator';

// TODO：ui和组件拔插模式
const ScreenRenderer = ({ value, onValueChange, selected, dispatch }) => {
  const { width, height, background, left, top, isHidden, isLock, ...rest } = value.data;
  const [locations, setLocations] = useState({ left: left, top: top });
  const [show, setShow] = useState(true);
  const { setState } = useTools();
  const { view } = useStore();

  const classNames = cx('gc-field animate__animated', {
    [`animate__${rest.animateType}`]: rest.animateType,
    [`animate__${rest.animateSpeed}`]: rest.animateSpeed,
    [`animate__${rest.animateRepeat}`]: rest.animateRepeat,
    [`animate__delay-${rest.animateTime}s`]: rest.animateTime,
    'is-hidden': !show
  });

  const isSelect = useMemo(() => {
    return selected === value.uniqueId;
  }, [selected]);

  const isEditing = useMemo(() => {
    return isLock || isHidden;
  }, [isLock, isHidden]);

  useEffect(() => {
    setShow(!isHidden);
  }, [isHidden]);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isSelect) return;

    setState({ tabsKey: 'base' });
    // TODO: 获取当前用户点击的key
    dispatch({ type: 'component/selected', data: value.uniqueId });
  };

  const overwriteStyle = {
    borderStyle: rest.borderStyle || 'solid',
    borderColor: isSelect ? '#2681ff' : 'transparent',
    background,
    borderRadius: rest.borderRadius,
    borderWidth: rest.borderWidth || 2,
    boxShadow: rest.shadowColor
      ? `${rest.shadowColor} ${rest.shadowWidth || 0} ${rest.shadowOffset || 0} ${
          rest.shadowOffset || 0
        }`
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
      className={classNames}
      size={{ width: converLayout(width), height: converLayout(height) }}
      position={{ x: left, y: top }}
      id={value.uniqueId}
      bounds="body"
      dragAxis="both"
      style={overwriteStyle}
      disableDragging={isEditing}
      enableResizing={!isEditing}
      scale={view.scale}
      onDragStart={onStopPropagation}
      onDrag={onDragHandle}
      onDragStop={onDragStopHandle}
      onResize={onResizeHandle}
      onResizeStop={onStopPropagation}
      onClick={handleClick}
    >
      <div className={cx('grid-line', { 'is-active': isSelect })}>
        <div className="grid-line-top"></div>
        <div className="grid-line-left"></div>
        <div className="grid-line-label">
          {locations.left}, {locations.top}
        </div>
      </div>
      {getSubField(fieldProps)}
    </Rnd>
  );
};

export default connect((state) => ({
  selected: state.component.selected
}))(ScreenRenderer);
