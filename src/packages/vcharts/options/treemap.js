import { DEFAULT_COLORS } from "~packages/constants";

export default (option, data) => {
  const { series } = data;
  const {
    borderWidth = 1,
    borderColor = "#fff",
    hoverTextColor = "rgba(92,121,255,0.8)",
    hoverBackColor = "rgba(255,255,255,0.8)",
    textColor = "#fff",
    textSize = 14,
    unit = ""
  } = option;

  return {
    color: DEFAULT_COLORS,
    grid: {
      top: 30,
      left: 15,
      right: 20,
      bottom: 30,
      containLabel: true
    },
    tooltip: {
      formatter: function (params) {
        return [params.marker + params.data.name + "：" + (params.data.value || 0) + unit].join("");
      }
    },
    series: [
      {
        type: "treemap",
        left: "center",
        width: "90%",
        height: "90%",
        breadcrumb: {
          show: false
        },
        itemStyle: {
          normal: {
            label: {
              show: true,
              formatter: "{b}"
            },
            borderWidth: borderWidth,
            borderColor: borderColor,
            strokeWidth: 2,
            strokeColor: "rgba(57, 111, 255)"
          },
          emphasis: {
            label: {
              show: true,
              color: hoverTextColor
            },
            color: hoverBackColor
          }
        },
        label: {
          normal: {
            color: textColor,
            fontSize: textSize
          }
        },
        data: series
      }
    ]
  };
};
