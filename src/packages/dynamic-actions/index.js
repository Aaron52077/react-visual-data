import React, { useMemo, useRef } from "react";
import { Select } from "antd";
import { guid, cloneDeep } from "~utils";
import { componentMarket } from "./configuration-value";

function DynamicActions({ name, value, onChange }) {
  const drillDownList = useRef(componentMarket).current;

  const valueData = useMemo(() => {
    return value.length > 0 ? value[0].type : undefined;
  }, [value]);

  const onSelectChange = (val) => {
    const isRootValue = drillDownList.find((o) => o.type === val);
    if (val && isRootValue) {
      const rootValue = cloneDeep(isRootValue);
      rootValue.uniqueId = guid();
      onChange(name, [rootValue]);
    } else {
      onChange(name, []);
    }
  };

  return (
    <Select
      style={{ width: "100%" }}
      allowClear={true}
      placeholder="请选择下钻图表"
      value={valueData}
      onChange={onSelectChange}
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
}

export default DynamicActions;
