import React, { useMemo } from "react";
import { Select } from "antd";
import fetcher from "~packages/hoc";

const MultiSelectComponent = (props) => {
  const style = props.invalid ? { borderColor: "#f5222d" } : {};
  const { enum: enums, enumNames } = props.schema || {};

  const rootValue = useMemo(() => {
    return props.value && Array.isArray(props.value) ? props.value : [];
  }, [props.value]);

  const onChange = (value) => props.onChange(props.name, value);

  return (
    <Select
      {...props.options}
      style={{ width: "100%", ...style }}
      mode="multiple"
      disabled={props.disabled || props.readOnly}
      defaultValue={rootValue}
      onChange={onChange}
    >
      {(enums || []).map((val, index) => (
        <Select.Option value={val} key={index}>
          <span
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: enumNames ? enumNames[index] : val
            }}
          />
        </Select.Option>
      ))}
    </Select>
  );
};

export default fetcher(MultiSelectComponent);
