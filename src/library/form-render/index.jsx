import React, { forwardRef } from "react";
import FieldFactory from "./factory";
import { mapping as defaultMapping, widgets as defaultWidgets } from "~materials";
import "./atom.less";

const Factorys = forwardRef(({ mapping = {}, widgets = {}, ...rest }, ref) => {
  return (
    <FieldFactory
      forwardedRef={ref}
      mapping={{
        ...defaultMapping,
        ...mapping
      }}
      widgets={{
        ...defaultWidgets,
        ...widgets
      }}
      {...rest}
    />
  );
});

export default Factorys;
