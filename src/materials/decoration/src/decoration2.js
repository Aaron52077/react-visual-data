import React, { useMemo, forwardRef } from "react";
import PropTypes from "prop-types";
import { useAutoResize } from "~common/hooks";

const defaultColor = ["#fff", "#0de7c2"];
const pointSideLength = 2.5;
const halfPointSideLength = pointSideLength / 2;
const svgWH = [200, 50];
const rowNum = 4;
const rowPoints = 20;

function getPoints() {
  const [w, h] = svgWH;

  const horizontalGap = w / (rowPoints + 1);
  const verticalGap = h / (rowNum + 1);

  const points = new Array(rowNum)
    .fill(0)
    .map((foo, i) => new Array(rowPoints).fill(0).map((foo, j) => [horizontalGap * (j + 1), verticalGap * (i + 1)]));

  return points.reduce((all, item) => [...all, ...item], []);
}

const Decoration = forwardRef(({ style }, ref) => {
  const { width, height, domRef } = useAutoResize(ref);

  function calcSVGData() {
    const points = getPoints();

    return {
      points,
      rects: [points[rowPoints * 2 - 1], points[rowPoints * 2 - 3]],
      svgScale: [width / svgWH[0], height / svgWH[1]]
    };
  }

  const { svgScale, points, rects } = useMemo(calcSVGData, [width, height]);

  return (
    <div className="gc-containers" style={style} ref={domRef}>
      <svg
        width={`${svgWH[0]}px`}
        height={`${svgWH[1]}px`}
        style={{ transform: `scale(${svgScale[0]},${svgScale[1]})` }}
      >
        {points.reduce((prev, point, i) => {
          return Math.random() > 0.6
            ? [
                ...prev,
                <rect
                  key={i}
                  fill={defaultColor[0]}
                  x={point[0] - halfPointSideLength}
                  y={point[1] - halfPointSideLength}
                  width={pointSideLength}
                  height={pointSideLength}
                >
                  {Math.random() > 0.6 && (
                    <animate
                      attributeName="fill"
                      values={`${defaultColor[0]};transparent`}
                      dur="1s"
                      begin={Math.random() * 2}
                      repeatCount="indefinite"
                    />
                  )}
                </rect>
              ]
            : prev;
        }, [])}
        {!!rects[0] && (
          <rect
            fill={defaultColor[1]}
            x={rects[0][0] - pointSideLength}
            y={rects[0][1] - pointSideLength}
            width={pointSideLength * 2}
            height={pointSideLength * 2}
          >
            <animate attributeName="width" values={`0;${pointSideLength * 2}`} dur="2s" repeatCount="indefinite" />
            <animate attributeName="height" values={`0;${pointSideLength * 2}`} dur="2s" repeatCount="indefinite" />
            <animate
              attributeName="x"
              values={`${rects[0][0]};${rects[0][0] - pointSideLength}`}
              dur="2s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="y"
              values={`${rects[0][1]};${rects[0][1] - pointSideLength}`}
              dur="2s"
              repeatCount="indefinite"
            />
          </rect>
        )}
        {!!rects[1] && (
          <rect
            fill={defaultColor[1]}
            x={rects[1][0] - 40}
            y={rects[1][1] - pointSideLength}
            width="40"
            height={pointSideLength * 2}
          >
            <animate attributeName="width" values="0;40;0" dur="2s" repeatCount="indefinite" />
            <animate
              attributeName="x"
              values={`${rects[1][0]};${rects[1][0] - 40};${rects[1][0]}`}
              dur="2s"
              repeatCount="indefinite"
            />
          </rect>
        )}
      </svg>
    </div>
  );
});

Decoration.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  color: PropTypes.array
};

export default Decoration;
