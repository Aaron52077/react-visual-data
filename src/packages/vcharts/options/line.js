import { DEFAULT_COLORS } from "~packages/constants";
import { tooltipFormatter } from "~packages/vcharts/util";

export default (option, data) => {
  const { categories = [], series = [] } = data;
  const {
    smooth = false,
    symbol = "none",
    stack = false,
    axisLineShowX = false,
    axisLineColorX = "#463e3e",
    axisLabelColorX = "#ffffff",
    axisTickShowX = false,
    axisLineShowY = false,
    axisLabelColorY = "#463e3e",
    splitLineShowY = true,
    splitLineColorY = "#5B5B5B",
    splitLineType = "solid",
    diyAxis = false,
    step = false,
    barWidth = "auto",
    unit = ""
  } = option;

  let yAxisOpt;

  if (diyAxis) {
    yAxisOpt = [
      {
        type: "value",
        min: 0,
        axisLabel: {
          color: axisLabelColorY,
          textStyle: {
            fontSize: 12
          },
          formatter: "{value}"
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: splitLineShowY,
          lineStyle: {
            color: splitLineColorY
          }
        }
      },
      {
        type: "value",
        max: 100,
        min: 0,
        interval: 16.4,
        axisLabel: {
          color: axisLabelColorY,
          textStyle: {
            fontStyle: "normal",
            fontFamily: "微软雅黑",
            fontSize: 12
          },
          formatter: "{value} %"
        },
        axisLine: {
          show: axisLineShowY
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: splitLineShowY,
          lineStyle: {
            color: splitLineColorY,
            type: splitLineType
          }
        }
      }
    ];
  } else {
    yAxisOpt = {
      type: "value",
      min: 0,
      axisTick: {
        show: false
      },
      axisLine: {
        show: axisLineShowY
      },
      splitLine: {
        show: splitLineShowY,
        lineStyle: {
          color: splitLineColorY,
          type: splitLineType
        }
      }
    };
  }

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
      trigger: "axis",
      formatter: function (parma) {
        return tooltipFormatter(parma, unit);
      }
    },
    legend: {
      show: true,
      type: "plain",
      bottom: 0,
      data: series.map((item) => item.name)
    },
    xAxis: {
      type: "category",
      nameLocation: "middle",
      nameGap: 22,
      axisLine: {
        show: axisLineShowX,
        lineStyle: {
          color: axisLineColorX
        }
      },
      axisLabel: {
        color: axisLabelColorX
      },
      axisTick: {
        show: axisTickShowX
      },
      boundaryGap: true,
      data: categories
    },
    yAxis: yAxisOpt,
    series: series.map((item) => {
      return {
        name: item.name,
        type: item.type ? item.type : "line",
        barWidth: barWidth,
        smooth: smooth,
        showSymbol: !1,
        symbol: symbol,
        step: step,
        areaStyle: stack
          ? {
              normal: {}
            }
          : undefined,
        data: item.data
      };
    })
  };
};
