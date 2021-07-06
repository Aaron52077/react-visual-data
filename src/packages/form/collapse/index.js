import React, { useEffect } from "react";
import { Collapse } from "antd";

const { Panel } = Collapse;

export default ({ name, value, schema, onChange }) => {
  const callback = (key) => {
    onChange(name, key.length > 0 ? true : false);
  };

  useEffect(() => {
    onChange(name, value || false);
  }, [value]);

  return (
    <div className="gc-collapse">
      <Collapse defaultActiveKey={value ? ["def"] : []} ghost onChange={callback}>
        <Panel header={schema.name || "配置"} key="def"></Panel>
      </Collapse>
    </div>
  );
};
