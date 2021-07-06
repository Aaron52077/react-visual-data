import { DEFAULT_COLORS } from "~packages/constants";

export default (option, data) => {
  const { indicators, series } = data;
  const { stack = false, legendShow = false } = option;

  return {
    color: DEFAULT_COLORS,
    tooltip: {
      trigger: "item"
    },
    legend: {
      show: legendShow,
      type: "scroll",
      bottom: 15,
      data: series.map((item) => item.name)
    },
    radar: {
      radius: "60%",
      indicator: indicators
    },
    series: [
      {
        type: "radar",
        areaStyle: stack
          ? {
              normal: {
                shadowBlur: 13,
                shadowColor: "rgba(0,0,0,.2)",
                shadowOffsetX: 0,
                shadowOffsetY: 10,
                opacity: 1
              }
            }
          : undefined,
        data: series
      }
    ]
  };
};
