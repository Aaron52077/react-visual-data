import echarts from "echarts";

export default (option, data) => {
  const { series } = data;
  const {
    titleColor = "#ffffff",
    detailColor = "#ffffff",
    axisLabelColor = "#ffffff",
    axisLabelShow = true,
    titleFontSize = 12,
    axisLabelFont = 12,
    indexFontSize = 12
  } = option;

  const colorStyles = [
    [
      1,
      new echarts.graphic.LinearGradient(0, 0, 1, 0, [
        {
          offset: 0,
          color: "#5CF9FE"
        },
        {
          offset: 0.17,
          color: "#468EFD"
        },
        {
          offset: 0.9,
          color: "#468EFD"
        },
        {
          offset: 1,
          color: "#5CF9FE"
        }
      ])
    ]
  ];

  return {
    color: DEFAULT_COLORS,
    tooltip: {
      formatter: "{a} <br/>{b} : {c}%"
    },
    series: [
      {
        type: "gauge",
        radius: "100%",
        min: series.min || 0,
        max: series.max || 100,
        title: {
          color: titleColor,
          fontSize: titleFontSize,
          fontStyle: "italic"
        },
        axisLabel: {
          show: axisLabelShow,
          color: axisLabelColor,
          fontSize: axisLabelFont
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: colorStyles,
            width: 25,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            opacity: 1
          }
        },
        detail: {
          fontSize: indexFontSize,
          color: detailColor,
          formatter: "{value}"
        },
        data: [{ ...series }]
      }
    ]
  };
};
