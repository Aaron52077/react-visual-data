import React, { useMemo, useEffect } from "react";
import { InputNumber } from "antd";
import fetcher from "~materials/hoc";

const DimensionSize = (props) => {
  const { width, height } = window.screen;

  const rootValue = useMemo(() => {
    return props.value
      ? props.value
      : {
          width,
          height
        };
  }, [props.value]);

  useEffect(() => {
    props.onChange(props.name, rootValue);
  }, []);

  const onWidthChange = (e) => {
    props.onChange(
      props.name,
      Object.assign(rootValue, {
        width: parseFloat(e.target.value)
      })
    );
  };

  const onHeightChange = (e) => {
    props.onChange(
      props.name,
      Object.assign(rootValue, {
        height: parseFloat(e.target.value)
      })
    );
  };

  return (
    <div className="gc-flex">
      <InputNumber
        className="gc-flex-size"
        placeholder="请输入数字"
        disabled={props.disabled || props.readOnly}
        defaultValue={width}
        min={0}
        max={width}
        value={rootValue.width}
        onBlur={onWidthChange}
      />
      <div className="gc-flex-middle">x</div>
      <InputNumber
        className="gc-flex-size"
        placeholder="请输入数字"
        disabled={props.disabled || props.readOnly}
        defaultValue={height}
        min={0}
        max={height}
        value={rootValue.height}
        onBlur={onHeightChange}
      />
    </div>
  );
};

export default fetcher(DimensionSize);
