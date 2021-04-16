import React, { useCallback } from "react";
import { Checkbox } from "antd";

export default function VCheckbox(prop) {
  const onChange = useCallback((e) => prop.onChange(prop.name, e.target.checked), []);
  return <Checkbox {...prop.options} checked={prop.value} disabled={prop.disabled} onChange={onChange} />;
}
