import React, { useMemo, forwardRef } from "react";
import PropTypes from "prop-types";
import { useAutoResize } from "~common/hooks";

const border = ["left-top", "right-top", "left-bottom", "right-bottom"];

const BorderBox = forwardRef(({ children, style, backgroundColor = "transparent" }, ref) => {
  const { width, height, domRef } = useAutoResize(ref);

  const mergedColor = ["#1d48c4", "#d3e1f8"];

  const styles = useMemo(
    () => ({
      boxShadow: `inset 0 0 25px 3px ${mergedColor[0]}`,
      ...style
    }),
    [style]
  );

  return (
    <div className="gc-containers" style={styles} ref={domRef}>
      <svg className="gc-position" width={width} height={height}>
        <polygon
          fill={backgroundColor}
          points={`
          4, 0 ${width - 4}, 0 ${width}, 4 ${width}, ${height - 4} ${width - 4}, ${height}
          4, ${height} 0, ${height - 4} 0, 4
        `}
        />
      </svg>

      {border.map((borderName) => (
        <svg width="150px" height="150px" key={borderName} className={`${borderName} gc-position`}>
          <polygon fill={mergedColor[1]} points="40, 0 5, 0 0, 5 0, 16 3, 19 3, 7 7, 3 35, 3" />
        </svg>
      ))}
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
