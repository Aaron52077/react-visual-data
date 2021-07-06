import React from "react";
import { Select } from "antd";

const VTabToSelect = ({ name, value, onChange, formData }) => {
  let { tabToChart } = formData.config;

  const onTabChange = (val) => {
    onChange(name, val);
  };

  return (
    <Select
      className="gc-flex-item"
      showSearch={true}
      allowClear={true}
      placeholder="请选择"
      optionFilterProp="children"
      value={value}
      onChange={onTabChange}
      filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
    >
      {tabToChart.map((item) => {
        return (
          <Select.Option value={item.id} key={item.id}>
            {item.name || "未命名"}
          </Select.Option>
        );
      })}
    </Select>
  );
};

export default VTabToSelect;
