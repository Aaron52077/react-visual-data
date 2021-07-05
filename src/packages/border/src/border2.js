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
          ${width - 15}, 22 170, 22 150, 7 40, 7 28, 21 32, 24
          16, 42 16, ${height - 32} 41, ${height - 7} ${width - 15}, ${height - 7}
        `}
        />
        <polyline
          className="dv-bb4-line-1"
          stroke="red"
          points={`145, ${height - 5} 40, ${height - 5} 10, ${height - 35}
          10, 40 40, 5 150, 5 170, 20 ${width - 15}, 20`}
        />
        <polyline
          className="dv-bb4-line-2"
          stroke="'rgba(0,0,255,0.8)"
          points={`245, ${height - 1} 36, ${height - 1} 14, ${height - 23}
          14, ${height - 100}`}
        />
        <polyline className="dv-bb4-line-3" stroke="red" points={`7, ${height - 40} 7, ${height - 75}`} />
        <polyline className="dv-bb4-line-4" stroke="red" points={`28, 24 13, 41 13, 64`} />
        <polyline className="dv-bb4-line-5" stroke="red" points={`5, 45 5, 140`} />
        <polyline className="dv-bb4-line-6" stroke="'rgba(0,0,255,0.8)" points={`14, 75 14, 180`} />
        <polyline className="dv-bb4-line-7" stroke="'rgba(0,0,255,0.8)" points={`55, 11 147, 11 167, 26 250, 26`} />
        <polyline className="dv-bb4-line-8" stroke="'rgba(0,0,255,0.8)" points={`158, 5 173, 16`} />
        <polyline className="dv-bb4-line-9" stroke="red" points={`200, 17 ${width - 10}, 17`} />
        <polyline className="dv-bb4-line-10" stroke="'rgba(0,0,255,0.8)" points={`385, 17 ${width - 10}, 17`} />
      </svg>

      <div className="gc-containers">{children}</div>
    </div>
  );
});
