import React, { useMemo } from "react";
import { Select } from "antd";
import fetcher from "~materials/hoc";
import { useTools } from "~common/hooks";

const SelectComponent = ({ name, value, onChange }) => {
  const { state } = useTools();

  const options = useMemo(() => {
    return state.components.filter((v) => v.uniqueId !== state.selected && v.data.dependence);
  }, [state.selected]);

  // TODO: 联动参数处理
  const onDependenceChange = (value) => {
    onChange(name, value);
  };

  return (
    <Select
      style={{ width: "100%" }}
      mode="multiple"
      allowClear={true}
      placeholder="请选择联动图表"
      value={value}
      onChange={onDependenceChange}
    >
      {options.length > 0 &&
        options.map((item, index) => {
          return (
            <Select.Option key={index} value={item.uniqueId}>
              {item.name}
            </Select.Option>
          );
        })}
    </Select>
  );
};

export default fetcher(SelectComponent);
