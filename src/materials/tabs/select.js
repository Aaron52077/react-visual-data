import React, { useState, useEffect } from "react";
import { Select } from "antd";

const VTabToSelect = ({ name, value, onChange, formData }) => {
  const [data, setData] = useState([]);
  let { tabToChart } = formData.config;

  useEffect(() => {
    setData(tabToChart);
  }, [tabToChart]);

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
      {data.map((item) => {
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
