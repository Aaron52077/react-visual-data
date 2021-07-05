import React, { useRef, forwardRef, useMemo } from "react";
import PropTypes from "prop-types";

import { useAutoResize } from "~hooks/useAutoResize";
import { uuid } from "~utils";
import { hexToRgb } from "../../utils";

const defaultColor = ["#2783ce", "#2cf7fe"];
const segment = 30;
const sectorAngle = Math.PI / 3;
const ringNum = 3;
const ringWidth = 1;

const BorderBox = forwardRef(({ children, style }, ref) => {
  const gId = useRef(`decoration-${uuid()}`).current;
  const gradientId = useRef(`decoration-gradient-${uuid()}`).current;
  const { width, height, domRef } = useAutoResize(ref);

  const x = width / 2;
  const y = height / 2;

  function getCircleRadianPoint(x, y, radius, radian) {
    return [x + Math.cos(radian) * radius, y + Math.sin(radian) * radius];
  }

  function calcPathD() {
    const startAngle = -Math.PI / 2;
    const angleGap = sectorAngle / segment;
    const r = width / 4;
    let lastEndPoints = getCircleRadianPoint(x, y, r, startAngle);
    return new Array(segment).fill("").map((_, i) => {
      const endPoints = getCircleRadianPoint(x, y, r, startAngle - (i + 1) * angleGap).map((_) => _.toFixed(5));
      const d = `M${lastEndPoints.join(",")} A${r}, ${r} 0 0 0 ${endPoints.join(",")}`;
      lastEndPoints = endPoints;
      return d;
    });
  }

  function calcPathColor() {
    const colorGap = 100 / (segment - 1);
    return new Array(segment).fill(defaultColor[0]).map((_, i) => hexToRgb(defaultColor[0], 100 - i * colorGap));
  }

  function calcCircleR() {
    const radiusGap = Math.abs((width / 2 - ringWidth / 2) / ringNum);
    return new Array(ringNum).fill(0).map((_, i) => radiusGap * (i + 1));
  }

  function calcSplitLinePoints() {
    const angleGap = Math.PI / 6;
    const r = width / 2;
    return new Array(6).fill("").map((_, i) => {
      const startAngle = angleGap * (i + 1);
      const endAngle = startAngle + Math.PI;
      const startPoint = getCircleRadianPoint(x, y, r, startAngle);
      const endPoint = getCircleRadianPoint(x, y, r, endAngle);
      return `${startPoint.join(",")} ${endPoint.join(",")}`;
    });
  }

  function calcArcD() {
    const angleGap = Math.PI / 6;
    const r = width / 2 - 1;
    return new Array(4).fill("").map((_, i) => {
      const startAngle = angleGap * (3 * i + 1);
      const endAngle = startAngle + angleGap;
      const startPoint = getCircleRadianPoint(x, y, r, startAngle);
      const endPoint = getCircleRadianPoint(x, y, r, endAngle);
      return `M${startPoint.join(",")} A${x}, ${y} 0 0 1 ${endPoint.join(",")}`;
    });
  }

  function calcSVGData() {
    return {
      pathD: calcPathD(),
      pathColor: calcPathColor(),
      circleR: calcCircleR(),
      splitLinePoints: calcSplitLinePoints(),
      arcD: calcArcD()
    };
  }

  const { pathD, pathColor, circleR, splitLinePoints, arcD } = useMemo(calcSVGData, [width, height]);

  return (
    <div className="gc-containers" style={style} ref={domRef}>
      <svg width={width} height={height}>
        <defs>
          <g id={gId}>
            {pathD.map((o, i) => (
              <path stroke={pathColor[i]} strokeWidth={x} fill="transparent" key={i} d={o} />
            ))}
          </g>
          <radialGradient id={gradientId} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="transparent" stopOpacity="1"></stop>
            <stop offset="100%" stopColor={hexToRgb(defaultColor[1], 30)} stopOpacity="1"></stop>
          </radialGradient>
        </defs>
        {circleR.map((r, i) => (
          <circle key={i} r={r} cx={x} cy={y} stroke={defaultColor[1]} strokeWidth="0.5" fill="transparent" />
        ))}
        <circle r="1" cx={x} cy={y} stroke="transparent" fill={`url(#${gradientId})`}>
          <animate attributeName="r" values={`1;${x}`} dur="2s" repeatCount="indefinite"></animate>
          <animate attributeName="opacity" values="1;0" dur="2s" repeatCount="indefinite"></animate>
        </circle>
        <circle r="2" cx={x} cy={y} fill={defaultColor[1]}></circle>
        <g>
          {splitLinePoints.map((p, i) => (
            <polyline key={i} points={p} stroke={defaultColor[1]} strokeWidth="0.5" opacity="0.5" />
          ))}
        </g>

        {arcD.map((p, i) => (
          <path key={i} d={p} stroke={defaultColor[1]} strokeWidth="2" fill="transparent" />
        ))}

        <use xlinkHref={`#${gId}`}>
          <animateTransform
            attributeName="transform"
            type="rotate"
            values={`0, ${x} ${y};360, ${x} ${y}`}
            dur="3s"
            repeatCount="indefinite"
          ></animateTransform>
        </use>
      </svg>
      <div className="decoration-content">{children}</div>
    </div>
  );
});

BorderBox.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object
};

export default BorderBox;
