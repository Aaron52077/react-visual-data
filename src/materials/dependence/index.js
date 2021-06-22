import React, { useMemo } from "react";
import { connect } from "react-redux";
import { Select } from "antd";
import fetcher from "~materials/hoc";
import { useTools } from "~common/hooks";

function SelectComponent({ name, value, onChange, selected }) {
  const { state } = useTools();
  const options = useMemo(() => {
    return state.components.filter((v) => v.uniqueId !== selected && v.data.dependence);
  }, [selected]);

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
}

export default connect((state) => ({
  selected: state.component.selected
}))(fetcher(SelectComponent));
