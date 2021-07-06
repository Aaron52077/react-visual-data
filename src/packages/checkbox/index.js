import React from "react";
import { Checkbox } from "antd";

export default (prop) => {
  const onChange = (e) => prop.onChange(prop.name, e.target.checked);

  return <Checkbox {...prop.options} checked={prop.value} disabled={prop.disabled} onChange={onChange} />;
};
