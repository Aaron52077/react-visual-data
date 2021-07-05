import React, { forwardRef } from "react";
import { useAutoResize } from "~hooks/useAutoResize";

export default forwardRef(({ children, style, backgroundColor = "transparent" }, ref) => {
  const { width, height, domRef } = useAutoResize(ref);

  return (
    <div className="gc-containers" style={{ ...style, boxShadow: "inset 0 0 25px 3px #1d48c4" }} ref={domRef}>
      <svg className="gc-position" width={width} height={height}>
        <polygon
          fill={backgroundColor}
          points={`
          4, 0 ${width - 4}, 0 ${width}, 4 ${width}, ${height - 4} ${width - 4}, ${height}
          4, ${height} 0, ${height - 4} 0, 4
        `}
        />
      </svg>

      {["left-top", "right-top", "left-bottom", "right-bottom"].map((name) => (
        <svg width="150px" height="150px" key={name} className={`${name} gc-position`}>
          <polygon fill="#d3e1f8" points="40, 0 5, 0 0, 5 0, 16 3, 19 3, 7 7, 3 35, 3" />
        </svg>
      ))}
      <div className="gc-containers">{children}</div>
    </div>
  );
});
