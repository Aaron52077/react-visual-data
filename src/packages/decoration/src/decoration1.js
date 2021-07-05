import React, { useMemo, useRef, forwardRef } from "react";
import PropTypes from "prop-types";
import { useAutoResize } from "~hooks/useAutoResize";
import { uuid } from "~utils";

const svgWH = [100, 100];

const Decoration = forwardRef(({ children, style, waitTime = 3 }, ref) => {
  const { width, height, domRef } = useAutoResize(ref);

  const polygonIdRef = useRef(`decoration-polygon-${uuid()}`);

  const mergedColor = ["rgba(3, 166, 224, 0.8)", "rgba(3, 166, 224, 0.5)"];

  const svgScale = useMemo(() => {
    const [w, h] = svgWH;

    return [width / w, height / h];
  }, [width, height]);

  return (
    <div className="gc-containers gc-decoration" style={style} ref={domRef}>
      <svg
        width={`${svgWH[0]}px`}
        height={`${svgWH[1]}px`}
        style={{ transform: `scale(${svgScale[0]},${svgScale[1]})` }}
      >
        <defs>
          <polygon id={polygonIdRef.current} points="15, 46.5, 21, 47.5, 21, 52.5, 15, 53.5" />
        </defs>

        <circle
          cx="50"
          cy="50"
          r="45"
          fill="transparent"
          stroke={mergedColor[1]}
          strokeWidth="10"
          strokeDasharray="80, 100, 30, 100"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 50 50;360 50 50"
            dur={`${waitTime}s`}
            repeatCount="indefinite"
          />
        </circle>

        <circle
          cx="50"
          cy="50"
          r="45"
          fill="transparent"
          stroke={mergedColor[0]}
          strokeWidth="6"
          strokeDasharray="50, 66, 100, 66"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 50 50;-360 50 50"
            dur={`${waitTime}s`}
            repeatCount="indefinite"
          />
        </circle>

        <circle
          cx="50"
          cy="50"
          r="38"
          fill="transparent"
          stroke="rgba(3, 166, 224, 0.3)"
          strokeWidth="1"
          strokeDasharray="5, 1"
        />
        {new Array(20).fill(0).map((foo, i) => (
          <use
            key={i}
            href={`#${polygonIdRef.current}`}
            stroke={mergedColor[1]}
            fill={Math.random() > 0.4 ? "transparent" : mergedColor[0]}
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 50 50;360 50 50"
              dur={`${waitTime}s`}
              begin={`${(i * waitTime) / 20}s`}
              repeatCount="indefinite"
            />
          </use>
        ))}
        <circle
          cx="50"
          cy="50"
          r="26"
          fill="transparent"
          stroke="rgba(3, 166, 224, 0.3)"
          strokeWidth="1"
          strokeDasharray="5, 1"
        />
      </svg>
      {children}
    </div>
  );
});

Decoration.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
  waitTime: PropTypes.number
};

export default Decoration;
