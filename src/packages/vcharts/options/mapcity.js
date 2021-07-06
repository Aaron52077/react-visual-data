import echarts from "echarts";
import { DEFAULT_COLORS } from "~packages/constants";

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
  const { labelTextColor, showAreaName, scaleMap, provinces, areaColor, borderColor, itemColor } = option;

  let mapJson = require(`echarts/map/json/province/${provinces}.json`);

  echarts.registerMap(provinces, mapJson);

  let geoCoordMap = {};

  mapJson.features.forEach((item) => {
    geoCoordMap[item.properties.name] = item.properties.cp;
  });

  return {
    tooltip: {
      trigger: "item"
    },
    legend: {
      orient: "vertical",
      top: "top",
      left: "right",
      data: ["credit_pm2.5"],
      textStyle: {
        color: "#fff"
      }
    },
    visualMap: {
      show: false,
      x: "left",
      y: "center",
      seriesIndex: [1],
      min: 70,
      max: 90,
      text: ["高", "低"],
      textStyle: {
        color: "#fff"
      },
      inRange: {
        color: DEFAULT_COLORS
      }
    },
    geo: {
      map: provinces,
      roam: scaleMap,
      itemStyle: {
        color: "#fff",
        normal: {
          label: {
            show: true,
            textStyle: {
              color: "#ff0"
            }
          },
          borderWidth: 1,
          borderColor: "rgba(37,124,169)",
          shadowColor: "#e8e8e8",
          shadowOffsetY: 15,
          shadowOffsetX: 8
        }
      }
    },
    series: [
      {
        type: "effectScatter",
        left: "150",
        coordinateSystem: "geo",
        data: convertData(series, geoCoordMap),
        symbolSize: function (val) {
          return val[2] / 5;
        },
        showEffectOn: "render",
        rippleEffect: {
          brushType: "stroke"
        },
        hoverAnimation: true,
        label: {
          normal: {
            formatter: "{b}",
            position: "bottom",
            color: labelTextColor,
            show: showAreaName
          }
        },
        itemStyle: {
          normal: {
            color: itemColor,
            shadowBlur: 0,
            shadowColor: "#05C3F9"
          }
        },
        zlevel: 1
      },
      {
        type: "map",
        mapType: provinces,
        roam: false,
        itemStyle: {
          normal: {
            label: {
              show: true,
              textStyle: {
                color: "transparent"
              }
            },
            borderWidth: 1,
            borderColor: borderColor,
            areaColor: areaColor
          },
          emphasis: {
            label: {
              show: false,
              textStyle: {
                color: "transparent"
              }
            },
            borderColor: "#28729f",
            areaColor: "#9ea9f7"
          }
        },
        data: series
      }
    ]
  };
};
