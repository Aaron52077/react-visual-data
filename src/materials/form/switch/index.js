import React from "react";
import { Switch } from "antd";

const VSwitch = (p) => {
  return (
    <Switch
      {...p.options}
      disabled={p.disabled || p.readonly}
      checked={p.value}
      onChange={(checked) => p.onChange(p.name, checked)}
    />
  );
};

export default VSwitch;
