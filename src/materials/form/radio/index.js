import React from "react";
import { Radio } from "antd";

const radioHoc = (props, onChange, RadioComponent) => {
  const { enum: enums, enumNames } = props.schema || {};

  return (
    <Radio.Group {...props.options} disabled={props.disabled || props.readonly} value={props.value} onChange={onChange}>
      {(enums || [true, false]).map((val, index) => (
        <RadioComponent value={val} key={index}>
          <span
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: enumNames ? enumNames[index] : val
            }}
          />
        </RadioComponent>
      ))}
    </Radio.Group>
  );
};

const VRadio = (p) => {
  const { optionType = "default" } = p.options;
  const onChange = (e) => p.onChange(p.name, e.target.value);
  const RadioComponent = optionType === "button" ? Radio.Button : Radio;
  return radioHoc(p, onChange, RadioComponent);
};

export default VRadio;
