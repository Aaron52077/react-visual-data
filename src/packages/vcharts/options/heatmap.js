import { DEFAULT_COLORS } from "~packages/constants";

/**
 * 将数字取整为10的倍数
 * @param {Number} num 需要取整的值
 * @param {Boolean} ceil 是否向上取整
 * @param {Number} prec 需要用0占位的数量
 */
function formatInt(num, prec = 1, ceil = true) {
  const len = String(num).length;
  if (len <= prec) {
    return num;
  }

  const mult = Math.pow(10, prec);
  return ceil ? Math.ceil(num / mult) * mult : Math.floor(num / mult) * mult;
}

export default (option, data) => {
  const { series } = data;
  let seriesData = [],
    max,
    min;
  if (series.data) {
    let maxData = [];
    series.data.forEach((e, index) => {
      maxData = maxData.concat(series.data[index][2]);
    });
    let newData = Array.from(new Set(maxData));
    max = Math.max(...newData);
    min = Math.min(...newData);
    max = formatInt(max);
    seriesData = series.data.map(function (item) {
      return [item[1], item[0], item[2] || "-"];
    });
  }
  return {
    tooltip: {
      trigger: "item"
    },
    grid: {
      top: 20,
      left: 15,
      right: 20,
      bottom: 30,
      containLabel: true
    },
    animation: false,
    xAxis: {
      type: "category",
      data: series.hours,
      splitArea: {
        show: true
      }
    },
    yAxis: {
      type: "category",
      data: series.days,
      splitArea: {
        show: true
      }
    },
    visualMap: {
      min: min ? min : 0,
      max: max ? max : 10,
      type: "piecewise",
      orient: "horizontal",
      inRange: {
        color: DEFAULT_COLORS
      },
      left: "center",
      bottom: 0
    },
    series: [
      {
        type: "heatmap",
        data: seriesData,
        label: {
          show: true
        }
      }
    ]
  };
};
