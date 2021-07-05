import React, { useState, useMemo, forwardRef } from "react";
import { useAutoResize } from "~hooks/useAutoResize";
import { uuid } from "~utils";

export default forwardRef(
  ({ children, style, waitTime = 3, backgroundColor = "transparent", reverse = false }, ref) => {
    const { width, height, domRef } = useAutoResize(ref);
    const [{ path, gradient, mask }] = useState(() => {
      const id = uuid();

      return {
        path: `border-box-8-path-${id}`,
        gradient: `border-box-8-gradient-${id}`,
        mask: `border-box-8-mask-${id}`
      };
    });

    const pathD = useMemo(
      () =>
        reverse
          ? `M 2.5, 2.5 L 2.5, ${height - 2.5} L ${width - 2.5}, ${height - 2.5} L ${width - 2.5}, 2.5 L 2.5, 2.5`
          : `M2.5, 2.5 L${width - 2.5}, 2.5 L${width - 2.5}, ${height - 2.5} L2.5, ${height - 2.5} L2.5, 2.5`,
      [width, height, reverse]
    );

    const mergedColor = ["#235fa7", "#4fd2dd"];

    const length = useMemo(() => (width + height - 5) * 2, [width, height]);

    return (
      <div className="gc-containers" style={style} ref={domRef}>
        <svg className="svg-container" width={width} height={height}>
          <defs>
            <path id={path} d={pathD} fill="transparent" />
            <radialGradient id={gradient} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fff" stopOpacity="1" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0" />
            </radialGradient>

            <mask id={mask}>
              <circle cx="0" cy="0" r="150" fill={`url(#${gradient})`}>
                <animateMotion dur={`${waitTime}s`} path={pathD} rotate="auto" repeatCount="indefinite" />
              </circle>
            </mask>
          </defs>

          <polygon fill={backgroundColor} points={`5, 5 ${width - 5}, 5 ${width - 5} ${height - 5} 5, ${height - 5}`} />

          <use stroke={mergedColor[0]} strokeWidth="1" href={`#${path}`} />

          <use stroke={mergedColor[1]} strokeWidth="3" href={`#${path}`} mask={`url(#${mask})`}>
            <animate
              attributeName="stroke-dasharray"
              from={`0, ${length}`}
              to={`${length}, 0`}
              dur={`${waitTime}s`}
              repeatCount="indefinite"
            />
          </use>
        </svg>

        <div className="gc-containers">{children}</div>
      </div>
    );
  }
);
