import { cloneDeep } from "~utils";
import { DEFAULT_COLORS } from "~packages/constants";

const defaultData = {
  x: [
    "1/27",
    "1/28",
    "1/29",
    "1/30",
    "1/31",
    "2/1",
    "2/2",
    "2/3",
    "2/4",
    "2/5",
    "2/6",
    "2/7",
    "2/8",
    "2/9",
    "2/10",
    "2/11",
    "2/12",
    "2/13",
    "2/14",
    "2/15",
    "2/16",
    "2/17"
  ],
  y: ["从化区", "南沙区", "黄浦区", "花都区", "荔湾区", "增城区", "越秀区", "番禺区", "天河区", "海珠区", "白云区"],
  z: [
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], //从化区
    [0, 1, 3, 3, 4, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8], //南沙区
    [5, 6, 9, 9, 9, 11, 11, 11, 13, 13, 14, 14, 14, 16, 16, 16, 16, 16, 18, 18, 18, 18], //黄浦区
    [1, 2, 2, 5, 5, 9, 11, 12, 12, 12, 14, 15, 15, 15, 15, 15, 16, 16, 17, 19, 19, 19], //花都区
    [1, 1, 1, 1, 2, 5, 6, 6, 8, 12, 15, 16, 16, 17, 17, 17, 17, 17, 17, 17, 17, 17], //荔湾区
    [0, 0, 1, 1, 5, 7, 9, 11, 12, 13, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17], //增城区
    [5, 5, 6, 11, 16, 17, 17, 26, 27, 29, 33, 34, 34, 34, 35, 35, 35, 35, 35, 35, 35, 35], //越秀区
    [5, 5, 7, 11, 14, 16, 18, 20, 25, 25, 31, 33, 34, 34, 34, 36, 38, 38, 40, 40, 40, 40], //番禺区
    [13, 17, 22, 22, 26, 33, 34, 36, 36, 37, 39, 40, 40, 42, 42, 42, 43, 43, 44, 44, 44, 44], //天河区
    [8, 10, 11, 15, 20, 24, 26, 32, 37, 44, 47, 54, 57, 60, 61, 63, 63, 64, 64, 65, 66, 66], //海珠区
    [13, 16, 17, 27, 35, 45, 49, 53, 58, 61, 65, 66, 68, 69, 71, 73, 73, 73, 74, 74, 74, 74] //白云区
  ]
};

export default function getOptions(option, data) {
  // const { x = [], y = [], z = [] } = data;
  let seriesData = [];

  for (let i = 0; i < defaultData.y.length; i++) {
    seriesData[i] = []; // seriesData 里面存放的是二维数组
  }

  //将处理完之后的数据存放到 seriesData 里面
  for (let t = 0; t < defaultData.y.length; t++) {
    const y = defaultData.y[t];

    for (let k = 0; k < defaultData.z[0].length; k++) {
      for (let p = 0; p < defaultData.x.length; p++) {
        const x = defaultData.x[p];
        const z = defaultData.z[t][p];
        seriesData[t].push([x, y, z]);
      }
      break;
    }
  }

  return {
    color: DEFAULT_COLORS,
    xAxis3D: {
      type: "category",
      name: "",
      data: defaultData.x,
      axisLabel: {
        show: true,
        interval: 0 //使x轴都显示
      }
    },
    yAxis3D: {
      type: "category",
      name: "",
      data: defaultData.y,
      axisLabel: {
        show: true,
        interval: 0 //使y轴都显示
      }
    },
    zAxis3D: {
      type: "value",
      name: ""
    },
    legend: {
      icon: "roundRect",
      show: true,
      type: "plain",
      bottom: 15
    },
    tooltip: {
      show: true
    },
    grid3D: {
      show: true,
      boxWidth: 250,
      boxHeight: 100,
      boxDepth: 200,
      axisLine: {
        show: true,
        interval: 0,
        lineStyle: {
          color: "#fff"
        }
      },
      viewControl: {
        autoRotate: true,
        distance: 400
      },
      top: 20
    },
    series: [
      {
        type: "scatter3D",
        silent: true,
        name: "从化区",
        itemStyle: {
          color: "rgb(165,  0, 38)"
        },
        label: {
          //当type为scatter3D时有label出现
          show: true,
          position: "bottom",
          distance: 0,
          textStyle: {
            color: "#ffffff",
            fontSize: 12,
            borderWidth: 0,
            borderColor: "#c6c6c6",
            backgroundColor: "transparent"
          }
        },
        data: seriesData[0] //每个区的数据一一对应
      },
      {
        type: "scatter3D",
        silent: true,
        name: "南沙区",
        itemStyle: {
          color: "rgb(215, 48, 39)"
        },
        label: {
          show: true,
          position: "bottom",
          distance: 0,
          textStyle: {
            color: "#ffffff",
            fontSize: 12,
            borderWidth: 0,
            borderColor: "#c6c6c6",
            backgroundColor: "transparent"
          }
        },
        data: seriesData[1]
      },
      {
        type: "scatter3D",
        silent: true,
        name: "黄浦区",
        itemStyle: {
          color: "rgb(244,109, 67)"
        },
        label: {
          show: true,
          position: "bottom",
          distance: 0,
          textStyle: {
            color: "#ffffff",
            fontSize: 12,
            borderWidth: 0,
            borderColor: "#c6c6c6",
            backgroundColor: "transparent"
          }
        },
        data: seriesData[2]
      },
      {
        type: "scatter3D",
        silent: true,
        name: "花都区",
        itemStyle: {
          color: "rgb(253,174, 97)"
        },
        label: {
          show: true,
          position: "bottom",
          distance: 0,
          textStyle: {
            color: "#ffffff",
            fontSize: 12,
            borderWidth: 0,
            borderColor: "#c6c6c6",
            backgroundColor: "transparent"
          }
        },
        data: seriesData[3]
      },
      {
        type: "scatter3D",
        silent: true,
        name: "荔湾区",
        itemStyle: {
          color: "rgb(254,224,144)"
        },
        label: {
          show: true,
          position: "bottom",
          distance: 0,
          textStyle: {
            color: "#ffffff",
            fontSize: 12,
            borderWidth: 0,
            borderColor: "#c6c6c6",
            backgroundColor: "transparent"
          }
        },
        data: seriesData[4]
      },
      {
        type: "scatter3D",
        silent: true,
        name: "增城区",
        itemStyle: {
          color: "rgb(255,255,191)"
        },
        label: {
          show: true,
          position: "top",
          distance: 0,
          textStyle: {
            color: "#ffffff",
            fontSize: 12,
            borderWidth: 0,
            borderColor: "#c6c6c6",
            backgroundColor: "transparent"
          }
        },
        data: seriesData[5]
      },
      {
        type: "scatter3D",
        silent: true,
        name: "越秀区",
        itemStyle: {
          color: "rgb(224,243,248)"
        },
        label: {
          show: true,
          position: "bottom",
          distance: 0,
          textStyle: {
            color: "#ffffff",
            fontSize: 12,
            borderWidth: 0,
            borderColor: "#c6c6c6",
            backgroundColor: "transparent"
          }
        },
        data: seriesData[6]
      },
      {
        type: "scatter3D",
        silent: true,
        name: "番禺区",
        itemStyle: {
          color: "rgb(171,217,233)"
        },
        label: {
          show: true,
          position: "top",
          distance: 0,
          textStyle: {
            color: "#ffffff",
            fontSize: 12,
            borderWidth: 0,
            borderColor: "#c6c6c6",
            backgroundColor: "transparent"
          }
        },
        data: seriesData[7]
      },
      {
        type: "scatter3D",
        silent: true,
        name: "天河区",
        itemStyle: {
          color: "rgb(116,173,209)"
        },
        label: {
          show: true,
          position: "top",
          distance: 0,
          textStyle: {
            color: "#ffffff",
            fontSize: 12,
            borderWidth: 0,
            borderColor: "#c6c6c6",
            backgroundColor: "transparent"
          }
        },
        data: seriesData[8]
      },
      {
        type: "scatter3D",
        silent: true,
        name: "海珠区",
        itemStyle: {
          color: "rgb( 69,117,180)"
        },
        label: {
          show: true,
          position: "top",
          distance: 0,
          textStyle: {
            color: "#ffffff",
            fontSize: 12,
            borderWidth: 0,
            borderColor: "#c6c6c6",
            backgroundColor: "transparent"
          }
        },
        data: seriesData[9]
      },
      {
        type: "scatter3D",
        silent: true,
        name: "白云区",
        itemStyle: {
          color: "rgb( 49, 54,149)" //点的颜色
        },
        label: {
          show: true,
          position: "top",
          distance: 0,
          textStyle: {
            color: "#ffffff",
            fontSize: 12,
            borderWidth: 0,
            borderColor: "#c6c6c6",
            backgroundColor: "transparent"
          }
        },
        data: seriesData[10]
      },
      {
        type: "line3D",
        silent: true,
        name: "从化区",
        lineStyle: {
          width: 8, //线的宽度
          color: "rgb(165,  0, 38)" //线的颜色
        },
        data: seriesData[0] //线数据和点数据所需要的格式一样
      },
      {
        type: "line3D",
        silent: true,
        name: "南沙区",
        lineStyle: {
          color: "rgb(215, 48, 39)", //线的颜色
          width: 8 //线的宽度
        },
        data: seriesData[1]
      },
      {
        type: "line3D",
        silent: true,
        name: "黄浦区",
        lineStyle: {
          color: "rgb(244,109, 67)",
          width: 10
        },
        data: seriesData[2]
      },
      {
        type: "line3D",
        silent: true,
        name: "花都区",
        lineStyle: {
          color: "rgb(253,174, 97)",
          width: 8
        },
        data: seriesData[3]
      },
      {
        type: "line3D",
        silent: true,
        name: "荔湾区",
        lineStyle: {
          color: "rgb(254,224,144)",
          width: 8
        },
        data: seriesData[4]
      },
      {
        type: "line3D",
        silent: true,
        name: "增城区",
        lineStyle: {
          color: "rgb(255,255,191)",
          width: 8
        },
        data: seriesData[5]
      },
      {
        type: "line3D",
        silent: true,
        name: "越秀区",
        lineStyle: {
          color: "rgb(224,243,248)",
          width: 8
        },
        data: seriesData[6]
      },
      {
        type: "line3D",
        silent: true,
        name: "番禺区",
        lineStyle: {
          color: "rgb(171,217,233)",
          width: 8
        },
        data: seriesData[7]
      },
      {
        type: "line3D",
        silent: true,
        name: "天河区",
        lineStyle: {
          color: "rgb(116,173,209)",
          width: 8
        },
        data: seriesData[8]
      },
      {
        type: "line3D",
        silent: true,
        name: "海珠区",
        lineStyle: {
          color: "rgb( 69,117,180)",
          width: 8
        },
        data: seriesData[9]
      },
      {
        type: "line3D",
        silent: true,
        name: "白云区",
        lineStyle: {
          color: "rgb( 49, 54,149)",
          width: 8
        },
        data: seriesData[10]
      }
    ]
  };
}
