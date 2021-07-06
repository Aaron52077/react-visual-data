import { DEFAULT_COLORS } from "~packages/constants";

export default function getOptions(option, data) {
  const { series } = data;
  const {
    numberFill = 4,
    waveAnimation,
    backgroundColor,
    shape,
    borderHied,
    borderPadding,
    borderColor,
    borderWidth,
    colorRipple,
    sumfontSize,
    unit = ""
  } = option;

  let seriesData = [];

  for (let i = 0; i < numberFill; i++) {
    if (1 - 0.15 * i > 0) {
      let o = i === 0 ? 1 : 1 - 0.15 * i;
      seriesData.push(series * o);
    }
  }

  return {
    series: [
      {
        type: "liquidFill",
        radius: "85%",
        center: ["50%", "50%"],
        waveAnimation: waveAnimation,
        backgroundStyle: {
          color: backgroundColor
        },
        data: seriesData,
        shape: shape,
        outline: {
          show: borderHied,
          borderDistance: borderPadding,
          itemStyle: {
            borderColor: borderColor,
            borderWidth: borderWidth,
            shadowBlur: "none"
          }
        },
        color: colorRipple ? [colorRipple] : DEFAULT_COLORS,
        label: {
          normal: {
            textStyle: {
              fontSize: sumfontSize
            }
          }
        }
      }
    ]
  };
}
