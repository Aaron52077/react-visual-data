import React, { useState, useEffect } from "react";
import { InputNumber } from "antd";
import fetcher from "~packages/hoc";

const DimensionSize = (props) => {
  const { width, height } = window.screen;
  const [size, setSize] = useState({ width, height });

  useEffect(() => {
    setSize(props.value);
  }, []);

  const onWidthChange = (e) => {
    props.onChange(
      props.name,
      Object.assign(size, {
        width: parseFloat(e.target.value)
      })
    );
  };

  const onHeightChange = (e) => {
    props.onChange(
      props.name,
      Object.assign(size, {
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
        value={size.width}
        onBlur={onWidthChange}
      />
      <div className="gc-flex-middle">x</div>
      <InputNumber
        className="gc-flex-size"
        placeholder="请输入数字"
        disabled={props.disabled || props.readOnly}
        defaultValue={height}
        min={0}
        value={size.height}
        onBlur={onHeightChange}
      />
    </div>
  );
};

export default fetcher(DimensionSize);
