import { cloneDeep } from "~utils";
import { DEFAULT_COLORS } from "~packages/constants";
import { tooltipFormatter } from "~packages/vcharts/util";

function calcPosition(data, inverse, position) {
  let positionLabel = "";
  return data.reduce((arr, val) => {
    if (inverse && !position) {
      positionLabel = val <= 0 ? "top" : "bottom";
    } else if (!inverse && !position) {
      positionLabel = val >= 0 ? "top" : "bottom";
    } else if (inverse && position) {
      positionLabel = val >= 0 ? "right" : "left";
    } else if (!inverse && position) {
      positionLabel = val <= 0 ? "left" : "right";
    }
    arr.push({
      value: val,
      label: {
        position: positionLabel
      }
    });
    return arr;
  }, []);
}

function reverseData(data, falg) {
  return data.reduce((arr, val, index) => {
    if (falg && index === 0) {
      arr.push(val * -1);
    }
    return arr;
  }, []);
}

export default (option, data) => {
  const { categories = [], series = [] } = data;
  const {
    sortType = "bar",
    direction = "horizontal",
    inverse = false,
    showX = true,
    showY = true,
    labelFontSizeX = 12,
    labelColor = "#ffffff",
    chartContrast = false,
    axisLineColor = "#CCC",
    splitLineColor = "#5B5B5B",
    splitLineShow = false,
    splitLineType = "solid",
    legendShow = true,
    stack = false,
    barWidth = "auto",
    barBorderRadius = 0,
    barTitlePosition = false,
    barTextShow = false,
    barTextFont = 12,
    axisTickShow = false,
    unit = ""
  } = option;

  let xAxisOpt, yAxisOpt, defaultX, defaultY;

  defaultX = {
    type: "category",
    inverse: inverse,
    axisLabel: {
      show: showX,
      fontSize: labelFontSizeX,
      color: labelColor,
      formatter: function (parma) {
        if (chartContrast && parma < 0) {
          return parma * -1;
        }
        return parma;
      }
    },
    splitLine: {
      show: splitLineShow,
      lineStyle: {
        color: splitLineColor,
        type: splitLineType
      }
    },
    axisLine: {
      show: showX,
      lineStyle: {
        color: axisLineColor
      }
    },
    axisTick: {
      show: showX
    },
    data: categories
  };

  defaultY = {
    type: "value",
    inverse: inverse,
    axisLabel: {
      show: showY,
      fontSize: labelFontSizeX,
      color: labelColor || "#fff",
      formatter: function (parma) {
        if (chartContrast && parma < 0) {
          return parma * -1;
        }
        return parma;
      }
    },
    splitLine: {
      show: splitLineShow,
      lineStyle: {
        color: splitLineColor,
        type: splitLineType
      }
    },
    axisLine: {
      show: showY,
      lineStyle: {
        color: axisLineColor
      }
    },
    axisTick: {
      show: axisTickShow ? axisTickShow : showY
    }
  };

  if (direction === "vertical") {
    xAxisOpt = cloneDeep(defaultY);
    yAxisOpt = cloneDeep(defaultX);
  } else {
    xAxisOpt = cloneDeep(defaultX);
    yAxisOpt = cloneDeep(defaultY);
  }
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
      trigger: "axis",
      axisPointer: {
        type: "line",
        lineStyle: {
          color: "#57617B"
        }
      },
      formatter: function (parma) {
        if (chartContrast) {
          parma[0].value = parma[0].value * -1;
        }
        return tooltipFormatter(parma, unit);
      }
    },
    legend: {
      show: legendShow,
      bottom: 0,
      data: series.map((item) => item.name)
    },
    xAxis: xAxisOpt,
    yAxis: yAxisOpt,
    series: series.map((item, index) => {
      let results = chartContrast && index === 0 ? reverseData(item.data, chartContrast) : item.data;
      return {
        name: item.name,
        type: sortType ? sortType : "bar",
        stack: stack ? "something" : "",
        barCategoryGap: sortType === "pictorialBar" ? "-80%" : null,
        symbol: sortType === "pictorialBar" ? "path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z" : null,
        barWidth: barWidth,
        itemStyle: {
          barBorderRadius: barBorderRadius
        },
        label: {
          show: barTextShow,
          fontSize: barTextFont
        },
        data: calcPosition(results, inverse, barTitlePosition)
      };
    })
  };
};
