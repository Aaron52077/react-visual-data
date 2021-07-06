import { DEFAULT_COLORS } from "~packages/constants";

export default (option, data) => {
  const { series } = data;
  const { symbol = "circle", unit = "" } = option;

  return {
    color: DEFAULT_COLORS,
    grid: {
      top: 20,
      left: 15,
      right: 20,
      bottom: 30,
      containLabel: true
    },
    tooltip: {
      position: "top",
      formatter: function (params) {
        return [params.marker + params.seriesName + "：" + (params.value || 0) + unit].join("");
      }
    },
    legend: {
      show: true,
      bottom: 0,
      data: series.map((item) => item.name)
    },
    xAxis: {
      splitLine: {
        lineStyle: {
          type: "dashed"
        }
      }
    },
    yAxis: {
      splitLine: {
        lineStyle: {
          type: "dashed"
        }
      },
      scale: true
    },
    series: series.map((item, index) => {
      return {
        name: item.name,
        type: "scatter",
        symbolSize: function (data) {
          return data / 4e2;
        },
        animationDelay: function (idx) {
          return idx * 5;
        },
        symbol: symbol,
        data: item.data[index].data
      };
    })
  };
};
