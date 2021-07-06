import React, { useMemo } from "react";
import { InputNumber } from "antd";
import fetcher from "~packages/hoc";
import { isEmpty } from "~utils/helper";

const NumberComponent = (props) => {
  const style = props.invalid ? { borderColor: "#f5222d" } : {};
  const { max, min, step } = props.schema;
  let obj = {
    placeholder: "请输入数字"
  };
  if (max || max === 0) {
    obj = { max };
  }

  if (min || min === 0) {
    obj = { ...obj, min };
  }

  if (step) {
    obj = { ...obj, step };
  }

  const rootValue = useMemo(() => {
    return !isEmpty(props.value) ? props.value : min || 0;
  }, [props.value]);

  const onChange = (value) => {
    props.onChange(props.name, value);
  };

  return (
    <InputNumber
      {...obj}
      style={{ width: "100%", ...style }}
      disabled={props.disabled || props.readonly}
      {...props.options}
      value={rootValue}
      onChange={onChange}
    />
  );
};

export default fetcher(NumberComponent);
