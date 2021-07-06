import React, { forwardRef } from "react";
import FieldFactory from "./factory";
import { mapping as defaultMapping, widgets as defaultWidgets } from "~packages";
import "./atom.less";

const SchemaRender = forwardRef(({ mapping = {}, widgets = {}, ...rest }, ref) => {
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

export default SchemaRender;
