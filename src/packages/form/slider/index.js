import React, { useMemo } from "react";
import { InputNumber, Slider } from "antd";
import { isEmpty } from "~utils/helper";

const SliderWithNumber = (props) => {
  const style = props.invalid ? { borderColor: "#f5222d" } : {};
  const { max, min, step, disabled = false } = props.schema;

  let setting = {};
  if (max || max === 0) {
    setting = { max };
  }

  if (min || min === 0) {
    setting = { ...setting, min };
  }

  if (step) {
    setting = { ...setting, step };
  }

  let hideNumber = false;
  if (props.options && props.options.hideNumber) {
    hideNumber = true;
  }

  const rootValue = useMemo(() => {
    return !isEmpty(props.value) ? props.value : min || 0;
  }, [props.value]);

  const styles = useMemo(() => {
    return props.invalid ? { borderColor: "#f5222d" } : {};
  }, [props.invalid]);

  const onChange = (value) => {
    props.onChange(props.name, value);
  };

  return (
    <div className="gc-slider">
      <Slider
        style={{ flexGrow: 1, marginRight: hideNumber ? 0 : 12 }}
        {...setting}
        onChange={onChange}
        value={rootValue}
        disabled={props.disabled || props.readonly}
      />
      {hideNumber ? null : (
        <InputNumber
          {...props.options}
          {...setting}
          style={{ width: 90, ...styles }}
          value={props.value}
          disabled={disabled}
          onChange={onChange}
        />
      )}
    </div>
  );
};

export default SliderWithNumber;
