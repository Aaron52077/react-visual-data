import React, { useRef } from "react";
import { Select } from "antd";
import fetcher from "~materials/hoc";
import schemaJson from "./schema-json";
import { suid, cloneDeep } from "~utils";

const SelectComponent = (props) => {
  const { name, value, onChange } = props;
  const drillDownList = useRef(schemaJson).current;

  // TODO: 下钻参数处理 redux存储
  const onDrillChange = (val) => {
    let result;
    const values = drillDownList.filter((o) => o.type === val).map((v) => ((v["uniqueId"] = suid()), v));
    result = cloneDeep(values);
    onChange(name, result);
  };

  return (
    <Select
      style={{ width: "100%" }}
      allowClear={true}
      placeholder="请选择下钻图表"
      value={value.length > 0 ? value[0].type : undefined}
      onChange={onDrillChange}
    >
      {drillDownList.map((item) => {
        return (
          <Select.Option key={item.type} value={item.type}>
            {item.name}
          </Select.Option>
        );
      })}
    </Select>
  );
};

export default fetcher(SelectComponent);
