// fork: https://github.com/tomkp/react-split-pane
import React from "react";
import cx from "classnames";
import "./style.less";

class Resizer extends React.Component {
  render() {
    const { className, onClick, onDoubleClick, onMouseDown, onTouchEnd, onTouchStart, mode, hover, style } = this.props;

    const classes = cx("resizer", {
      [`${mode}`]: mode,
      [`${className}`]: className
    });

    return (
      <div
        role="presentation"
        className={classes}
        style={style}
        onMouseDown={(event) => onMouseDown(event)}
        onTouchStart={(event) => {
          event.preventDefault();
          onTouchStart(event);
        }}
        onTouchEnd={(event) => {
          event.preventDefault();
          onTouchEnd(event);
        }}
        onClick={(event) => {
          if (onClick) {
            event.preventDefault();
            onClick(event);
          }
        }}
        onDoubleClick={(event) => {
          if (onDoubleClick) {
            event.preventDefault();
            onDoubleClick(event);
          }
        }}
      >
        {hover && (
          <div className="drag-drawer-move-trigger">
            <div className="drag-drawer-move-point">
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Resizer;
