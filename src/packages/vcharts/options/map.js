import echarts from "echarts";
import { DEFAULT_COLORS, GEOCOORDMAP } from "~packages/constants";

function convertData(data, config) {
  return data.reduce((arr, val) => {
    const geoCoord = config[val.name];
    if (geoCoord) {
      arr.push({
        name: val.name,
        value: geoCoord.concat(val.value)
      });
    }
    return arr;
  }, []);
}

export default (option, data) => {
  const { series = [] } = data;
  const { labelTextColor, showAreaName, provinces = "sichuan", borderColor, customColors } = option;

  let mapJson;

  if (provinces === "china") {
    mapJson = require(`echarts/map/json/china.json`);
  } else {
    mapJson = require(`echarts/map/json/province/${provinces}.json`);
  }
  echarts.registerMap(provinces, mapJson);

  const CUSTOM_COLORS =
    customColors && customColors.length > 0 ? customColors.map((item) => item.color) : DEFAULT_COLORS;

  return {
    color: CUSTOM_COLORS,
    visualMap: {
      show: false,
      inRange: {
        color: CUSTOM_COLORS
      }
    },
    geo: {
      map: "china",
      roam: false,
      scaleLimit: {
        min: 1,
        max: 5
      },
      zoom: 1,
      layoutCenter: ["30%", "30%"],
      label: {
        normal: {
          show: showAreaName,
          fontSize: "14",
          color: labelTextColor
        }
      },
      itemStyle: {
        normal: {
          shadowBlur: 1,
          shadowColor: "rgba(18, 32, 70,0.4)",
          borderColor
        },
        emphasis: {
          areaColor: "rgba(23, 240, 204)",
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          borderWidth: 0
        }
      }
    },
    series: [
      {
        type: "scatter",
        geoIndex: 0,
        coordinateSystem: "geo",
        data: convertData(series, GEOCOORDMAP)
      },
      {
        name: "点",
        type: "scatter",
        coordinateSystem: "geo",
        zlevel: 6
      },
      {
        type: "effectScatter",
        coordinateSystem: "geo",
        data: convertData(series, GEOCOORDMAP),
        symbolSize: function (val) {
          return val[2] / 20;
        },
        showEffectOn: "render",
        rippleEffect: {
          brushType: "stroke"
        },
        hoverAnimation: true,
        label: {
          normal: {
            formatter: "{b}",
            position: "left",
            show: false
          }
        },
        itemStyle: {
          normal: {
            color: "yellow",
            shadowBlur: 10,
            shadowColor: "yellow"
          }
        },
        zlevel: 1
      }
    ]
  };
};
