/**
 * 默认配置常量
 */
const DEFAULT_COLORS = [
  "#19d4ae",
  "#5ab1ef",
  "#fa6e86",
  "#ffb980",
  "#0067a6",
  "#c4b4e4",
  "#d87a80",
  "#9cbbff",
  "#d9d0c7",
  "#87a997",
  "#d49ea2",
  "#5b4947",
  "#7ba3a8"
];

const CONTRAST_COLOR = "#eee";

const axisCommon = () => {
  return {
    axisLine: {
      lineStyle: {
        color: CONTRAST_COLOR
      }
    },
    axisTick: {
      lineStyle: {
        color: CONTRAST_COLOR
      }
    },
    axisLabel: {
      textStyle: {
        color: CONTRAST_COLOR
      }
    },
    splitLine: {
      lineStyle: {
        type: "dashed",
        color: "#aaa"
      }
    },
    splitArea: {
      areaStyle: {
        color: CONTRAST_COLOR
      }
    }
  };
};

const DarkTheme = {
  color: DEFAULT_COLORS,
  backgroundColor: "transparent",
  tooltip: {
    axisPointer: {
      lineStyle: {
        color: CONTRAST_COLOR
      },
      crossStyle: {
        color: CONTRAST_COLOR
      },
      label: {
        color: "#000"
      }
    }
  },
  legend: {
    textStyle: {
      color: CONTRAST_COLOR
    }
  },
  title: {
    textStyle: {
      color: CONTRAST_COLOR
    }
  },
  toolbox: {
    iconStyle: {
      normal: {
        borderColor: CONTRAST_COLOR
      }
    }
  },
  dataZoom: {
    dataBackgroundColor: "#eee", // Data background color
    fillerColor: "rgba(200,200,200,0.2)", // Fill the color
    handleColor: "#dd6b66" // Handle color
  },
  timeline: {
    itemStyle: {
      color: DEFAULT_COLORS[1]
    },
    lineStyle: {
      color: CONTRAST_COLOR
    },
    controlStyle: {
      color: CONTRAST_COLOR,
      borderColor: CONTRAST_COLOR
    },
    label: {
      color: CONTRAST_COLOR
    }
  },
  timeAxis: axisCommon(),
  logAxis: axisCommon(),
  valueAxis: axisCommon(),
  categoryAxis: axisCommon(),
  line: {
    symbol: "circle"
  },
  graph: {
    color: DEFAULT_COLORS
  },
  gauge: {
    axisLine: {
      lineStyle: {
        color: [
          [0.2, "#dd6b66"],
          [0.8, "#759aa0"],
          [1, "#ea7e53"]
        ],
        width: 8
      }
    }
  },
  candlestick: {
    itemStyle: {
      color: "#FD1050",
      color0: "#0CF49B",
      borderColor: "#FD1050",
      borderColor0: "#0CF49B"
    }
  }
};

DarkTheme.categoryAxis.splitLine.show = false;

export { DarkTheme };
