import React, { useState, useEffect } from "react";
import cx from "classnames";
import { WidthProvider, Responsive } from "react-grid-layout";
import { connect } from "react-redux";
import { widgets } from "~materials";
import generator from "../generator";
import { getField } from "~materials";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

const GeneratorField = ({ mode, value }) => {
  const { title, hideTitle, titleAlign, titleColor, background, ...rest } = value.data;
  const className = cx("gc-field-grid animate__animated", {
    [`animate__${rest.animateType}`]: rest.animateType,
    [`animate__${rest.animateSpeed}`]: rest.animateSpeed,
    [`animate__${rest.animateRepeat}`]: rest.animateRepeat,
    [`animate__delay-${rest.animateTime}s`]: rest.animateTime
  });

  const overwriteStyle = {
    background,
    boxShadow: rest.shadowColor
      ? `${rest.shadowColor} ${rest.shadowWidth || 0} ${rest.shadowOffset || 0} ${rest.shadowOffset || 0}`
      : rest.shadowWidth
  };

  const getSubField = (m) => {
    const prop = getField(value.type, mode);
    return generator(prop)(m);
  };

  return (
    <div className={className} style={overwriteStyle}>
      {!hideTitle ? (
        <div
          className="grid-hd"
          style={{
            color: titleColor,
            textAlign: titleAlign
          }}
        >
          {title}
        </div>
      ) : null}
      <div className="grid-bd">
        {getSubField({
          value: value.data,
          type: value.type,
          uniqueId: value.uniqueId,
          options: value.data.config
        })}
      </div>
    </div>
  );
};

const GridRenderer = ({ dataGrid }) => {
  if (dataGrid.length === 0) return null;

  return (
    <ResponsiveGridLayout
      rowHeight={0}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      isResizable={false}
      isDraggable={false}
      containerPadding={[0, 0]}
      useCSSTransforms={!1}
    >
      {dataGrid.map((prop) => (
        <div
          key={prop.uniqueId}
          data-grid={{
            x: prop.data.left,
            y: prop.data.top, // puts it at the bottom
            w: prop.data.width,
            h: prop.data.height
          }}
        >
          {!prop.data.isHidden ? (
            <GeneratorField
              value={prop}
              key={prop.uniqueId}
              mode={typeof widgets[prop.type] === "function" ? "form" : "field"}
            />
          ) : null}
        </div>
      ))}
    </ResponsiveGridLayout>
  );
};

export default connect((state) => ({
  conditions: state.form.conditions
}))(GridRenderer);
