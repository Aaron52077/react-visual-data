import React, { PureComponent } from "react";

class Panel extends PureComponent {
  render() {
    const { children, className, mode, style: styleProps, size, eleRef } = this.props;

    let style = {
      flex: 1,
      position: "relative",
      outline: "none"
    };

    if (size !== undefined) {
      if (mode === "vertical") {
        style.width = size;
      } else {
        style.height = size;
        style.display = "flex";
      }
      style.flex = "none";
    }

    style = Object.assign({}, style, styleProps || {});

    return (
      <div ref={eleRef} className={className} style={style}>
        {children}
      </div>
    );
  }
}

export default Panel;
