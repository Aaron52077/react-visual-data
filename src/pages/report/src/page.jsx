import React from "react";
import { SchemaRender } from "~renderer";
import { useTools } from "~common/hooks";

import { pageSchema } from "../schema";

const PageSetting = () => {
  const { state, setState } = useTools();

  const onValueChange = (value) => {
    setState({
      page: value.page
    });
  };

  return (
    <div
      style={{
        paddingRight: 10
      }}
    >
      <SchemaRender
        schema={pageSchema}
        formData={{
          page: state.page
        }}
        onChange={onValueChange}
      />
    </div>
  );
};

export default PageSetting;
