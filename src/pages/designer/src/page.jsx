import React from "react";
import { SchemaRender } from "~renderer";
import { useDesigner } from "~hooks/useDesigner";
import { DIMENSION } from "../constants";
import { pageSchema } from "../schema";

const PageSetting = () => {
  const { state, setState } = useDesigner();

  const onValueChange = (value) => {
    const { pageSize } = value.page;
    let realValue = { ...value.page };

    if (DIMENSION[pageSize]) {
      realValue = { ...realValue, ...DIMENSION[pageSize] };
    } else {
      realValue = { ...realValue, ...realValue.customPageSize };
    }
    setState({ page: realValue });
  };

  return <SchemaRender schema={pageSchema} formData={{ page: state.page }} onChange={onValueChange} />;
};

export default PageSetting;
