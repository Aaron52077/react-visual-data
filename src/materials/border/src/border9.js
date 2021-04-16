import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { useAutoResize } from "~common/hooks";

const BorderBox = forwardRef(({ children, style, backgroundColor = "transparent" }, ref) => {
  const { width, height, domRef } = useAutoResize(ref);

  const mergedColor = ["#6586ec", "#2cf7fe"];

  return (
    <div className="gc-containers " style={style} ref={domRef}>
      <svg className="svg-container" width={width} height={height}>
        <path
          fill={backgroundColor}
          stroke={mergedColor[0]}
          d={`
            M 5 20 L 5 10 L 12 3  L 60 3 L 68 10
            L ${width - 20} 10 L ${width - 5} 25
            L ${width - 5} ${height - 5} L 20 ${height - 5}
            L 5 ${height - 20} L 5 20
          `}
        />

        <path
          fill="transparent"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="10, 5"
          stroke={mergedColor[0]}
          d="M 16 9 L 61 9"
        />

        <path fill="transparent" stroke={mergedColor[1]} d="M 5 20 L 5 10 L 12 3  L 60 3 L 68 10" />

        <path
          fill="transparent"
          stroke={mergedColor[1]}
          d={`M ${width - 5} ${height - 30} L ${width - 5} ${height - 5} L ${width - 30} ${height - 5}`}
        />
      </svg>
      <div className="gc-containers">{children}</div>
    </div>
  );
});

BorderBox.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
  backgroundColor: PropTypes.string
};

export default BorderBox;
