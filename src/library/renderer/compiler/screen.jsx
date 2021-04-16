import React, { useState, useEffect } from "react";
import cx from "classnames";
import { connect } from "react-redux";
import generator from "../generator";
import { getField } from "~materials";

const GeneratorField = ({ value, fields, tabDependencies, tabComponent }) => {
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

  // TODO: tab控件控制器
  useEffect(() => {
    if (tabComponent.length === 0) return;

    let _tabComponentComponents = fields.filter((item) => tabComponent.some((el) => el.to.includes(item.uniqueId)));
    let _components = _tabComponentComponents.find((item) => item.uniqueId === value.uniqueId);
    if (typeof _components === undefined) {
      return;
    }

    if (_components && tabDependencies.length && value.type !== "tabs") {
      const ret = tabDependencies.some((el) => el.mapping.includes(value.uniqueId));
      setShow(ret);
    }
  }, [tabDependencies]);

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

const Fields = connect((state) => ({
  tabDependencies: state.tab.dependencies,
  tabComponent: state.tab.component
}))(GeneratorField);

const GeneratorWidget = ({ widgets = [] }) => {
  if (widgets.length === 0) return null;

  return widgets.map((prop) => <Fields fields={widgets} value={prop} key={prop.uniqueId} />);
};

export default GeneratorWidget;
