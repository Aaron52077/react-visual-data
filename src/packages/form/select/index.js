import React, { useMemo } from "react";
import { Select } from "antd";
import fetcher from "~packages/hoc";

const SelectComponent = (props) => {
  const style = props.invalid ? { borderColor: "#f5222d" } : {};
  const { enum: enums, enumNames } = props.schema || {};

  const rootValue = useMemo(() => {
    return props.value ? props.value : undefined;
  }, [props.value]);

  const onChange = (value) => props.onChange(props.name, value || "");

  return (
    <Select
      style={{ width: "100%", ...style }}
      placeholder="请选择"
      {...props.options}
      disabled={props.disabled || props.readonly}
      defaultValue={rootValue}
      onChange={onChange}
    >
      {(enums || []).map((val, index) => {
        let option = enumNames ? enumNames[index] : val;
        const isHtml = typeof option === "string" && option[0] === "<";
        if (isHtml) {
          option = <span dangerouslySetInnerHTML={{ __html: option }} />;
        }
        return (
          <Select.Option value={val} key={index}>
            {option}
          </Select.Option>
        );
      })}
    </Select>
  );
};

export default fetcher(SelectComponent);
