import React, { useMemo, useCallback } from "react";
import { Checkbox } from "antd";

export default function VCheckboxes(prop) {
  const { enum: enums, enumNames } = prop.schema || {};

  const rootValue = useMemo(() => {
    return prop.value && Array.isArray(prop.value) ? prop.value : [];
  }, [prop.value]);

  const onChange = useCallback((values) => prop.onChange(prop.name, values), []);

  return (
    <Checkbox.Group disabled={prop.disabled} value={rootValue} onChange={onChange}>
      {enums.map((val, index) => (
        <Checkbox value={val} key={index}>
          <span
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: enumNames ? enumNames[index] : val
            }}
          />
        </Checkbox>
      ))}
    </Checkbox.Group>
  );
}
