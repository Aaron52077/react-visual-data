import React, { forwardRef } from "react";
import classnames from "classnames";
import { useAutoResize } from "~hooks/useAutoResize";

export default forwardRef(({ children, reverse = false, style, backgroundColor = "transparent" }, ref) => {
  const { width, height, domRef } = useAutoResize(ref);
  const classNames = classnames("svg-container", {
    "svg-reverse": reverse
  });

  return (
    <div className="gc-containers" style={style} ref={domRef}>
      <svg className={classNames} width={width} height={height}>
        <polygon
          fill={backgroundColor}
          points={`
          10, 22 ${width - 22}, 22 ${width - 22}, ${height - 86} ${width - 84}, ${height - 24} 10, ${height - 24}
        `}
        />
        <polyline
          className="dv-bb5-line-1"
          stroke="#1370fb"
          points={`8, 5 ${width - 5}, 5 ${width - 5}, ${height - 100}
          ${width - 100}, ${height - 5} 8, ${height - 5} 8, 5`}
        />
        <polyline
          className="dv-bb5-line-2"
          stroke="#1370fb"
          points={`3, 5 ${width - 20}, 5 ${width - 20}, ${height - 60}
          ${width - 74}, ${height - 5} 3, ${height - 5} 3, 5`}
        />
        <polyline className="dv-bb5-line-3" stroke="#1370fb" points={`50, 13 ${width - 35}, 13`} />
        <polyline className="dv-bb5-line-4" stroke="#1370fb" points={`15, 20 ${width - 35}, 20`} />
        <polyline
          className="dv-bb5-line-5"
          stroke="#1370fb"
          points={`15, ${height - 20} ${width - 110}, ${height - 20}`}
        />
        <polyline
          className="dv-bb5-line-6"
          stroke="#1370fb"
          points={`15, ${height - 13} ${width - 110}, ${height - 13}`}
        />
      </svg>

      <div className="gc-containers">{children}</div>
    </div>
  );
});
