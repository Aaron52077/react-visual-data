import React, { useState, useEffect } from "react";
import cx from "classnames";
import generator from "./generator";
import { getField } from "~packages";

const GeneratorField = ({ value }) => {
  const [show, setShow] = useState(true);
  const { width, height, background, left, top, isHidden, ...rest } = value.data;
  const className = cx("animate__animated", {
    [`animate__${rest.animateType}`]: rest.animateType,
    [`animate__${rest.animateSpeed}`]: rest.animateSpeed,
    [`animate__${rest.animateRepeat}`]: rest.animateRepeat,
    [`animate__delay-${rest.animateTime}s`]: rest.animateTime
  });

  const overwriteStyle = {
    position: "absolute",
    left: left,
    top: top,
    padding: "5px 12px",
    width: width,
    height: height,
    borderColor: "transparent",
    borderWidth: 2,
    borderStyle: "solid",
    background,
    boxShadow: rest.shadowColor
      ? `${rest.shadowColor} ${rest.shadowWidth || 0} ${rest.shadowOffset || 0} ${rest.shadowOffset || 0}`
      : rest.shadowWidth
  };

  useEffect(() => {
    setShow(!isHidden);
  }, [isHidden]);

  const getSubField = (m) => {
    const prop = getField(value.type);
    return generator(prop)(m);
  };

  return (
    <div style={overwriteStyle} className={className}>
      {show
        ? getSubField({
            isDevelop: false,
            type: value.type,
            value: value.data,
            uniqueId: value.uniqueId,
            options: value.data.config
          })
        : null}
    </div>
  );
};

const GeneratorWidget = ({ widgets = [] }) => {
  if (widgets.length === 0) return null;

  return widgets.map((item) => <GeneratorField value={item} key={item.uniqueId} />);
};

export default GeneratorWidget;
