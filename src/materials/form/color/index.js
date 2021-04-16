/* eslint-disable */
import React, { useMemo, useState } from "react";
import ColorPicker from "rc-color-picker";
import { Input } from "antd";
import "rc-color-picker/assets/index.css";
import { hexToRgb, rgbToHex, isRgba } from "~utils";

export default function VColor(props) {
  const [color, setColor] = useState("");
  const [alpha, setAlpha] = useState(100);
  const { format } = props.schema;

  const onPickerChange = (e) => {
    if (props.disabled || props.readonly) return;
    const rgbaValue = hexToRgb(e.color, e.alpha);
    props.onChange(props.name, rgbaValue);
  };

  const onInputChange = (e) => {
    const value = e.target.value ?? "";
    setAlpha(100);
    props.onChange(props.name, value);
  };

  const onBlurChange = (e) => {
    const realValue = e.target.value ?? "";
    if (isRgba(realValue) || /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(realValue)) {
      props.onChange(props.name, realValue);
    } else {
      setAlpha(100);
      props.onChange(props.name, "");
    }
  };

  const pickerColor = useMemo(() => {
    if (!props.value || props.value === "transparent") {
      setAlpha(100);
      return "";
    }
    if (isRgba(props.value)) {
      const { opacity, color } = rgbToHex(props.value);
      setColor(color);
      setAlpha(opacity);
    }
    return props.value;
  }, [props.value]);

  return (
    <Input
      placeholder="请选择颜色"
      disabled={props.disabled || props.readOnly}
      value={pickerColor}
      allowClear
      onChange={onInputChange}
      onBlur={onBlurChange}
      addonAfter={
        // eslint-disable-next-line
        <ColorPicker
          type={format}
          animation="slide-up"
          className="gc-color-picker"
          alpha={alpha}
          defaultColor="#ffffff"
          color={color}
          onClose={onPickerChange}
        />
      }
    />
  );
}
