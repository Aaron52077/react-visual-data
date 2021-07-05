import { BASE_CONF, BASE_DATA_CONF } from "./default.js";

export default [
  {
    name: "折线图",
    icon: "line",
    type: "line",
    data: {
      title: "折线图",
      ...BASE_CONF,
      config: {
        unit: "",
        stack: false,
        smooth: false,
        symbol: "circle",
        axisLineColorX: "#463e3e",
        splitLineColorY: "#5B5B5B",
        axisLabelColorY: "#463e3e",
        axisLineShowX: true,
        splitLineType: "dashed"
      },
      dataConfig: {
        ...BASE_DATA_CONF,
        data: {
          categories: ["苹果", "三星", "华为", "oppo", "vivo", "小米"],
          series: [
            {
              name: "旺季",
              data: [12112, 20981, 19080, 17008, 24325, 18215, 18852]
            }
          ]
        }
      }
    }
  },
  {
    name: "阶梯线图",
    icon: "step-line",
    type: "step-line",
    data: {
      title: "折线图",
      ...BASE_CONF,
      config: {
        unit: "",
        smooth: false,
        symbol: "circle",
        axisLineColorX: "#463e3e",
        splitLineColorY: "#5B5B5B",
        axisLabelColorY: "#463e3e",
        axisLineShowX: true,
        splitLineType: "dashed",
        smooth: false,
        step: true
      },
      dataConfig: {
        ...BASE_DATA_CONF,
        data: {
          categories: ["苹果", "三星", "华为", "oppo", "vivo", "小米"],
          series: [
            {
              name: "旺季",
              data: [12112, 20981, 19080, 17008, 24325, 18215, 18852]
            },
            {
              name: "淡季",
              data: [13658, 14508, 12219, 11565, 9457, 10757, 12022]
            },
            {
              name: "测试",
              data: [1358, 1508, 1219, 1565, 457, 757, 1222]
            }
          ]
        }
      }
    }
  },
  {
    name: "双Y轴折线",
    icon: "line-middle",
    type: "line-middle",
    data: {
      title: "双Y轴折线",
      ...BASE_CONF,
      config: {
        unit: "",
        smooth: false,
        symbol: "circle",
        axisLineColorX: "#463e3e",
        splitLineColorY: "#5B5B5B",
        axisLabelColorY: "#ffffff",
        axisLineShowX: true,
        splitLineType: "dashed",
        smooth: false,
        symbol: "circle",
        diyAxis: true,
        stack: true
      },
      dataConfig: {
        ...BASE_DATA_CONF,
        data: {
          categories: ["苹果", "三星", "华为", "oppo", "vivo", "小米"],
          series: [
            {
              name: "旺季",
              data: [12112, 20981, 19080, 17008, 24325, 18215, 18852]
            },
            {
              name: "淡季",
              data: [13658, 14508, 12219, 11565, 9457, 10757, 12022]
            }
          ]
        }
      }
    }
  },
  {
    name: "线柱混搭",
    icon: "line-bar",
    type: "line-bar",
    data: {
      title: "线柱混搭",
      ...BASE_CONF,
      config: {
        unit: "",
        stack: false,
        smooth: false,
        symbol: "circle",
        axisLineColorX: "#463e3e",
        splitLineColorY: "#5B5B5B",
        axisLabelColorY: "#463e3e",
        axisLineShowX: true,
        splitLineType: "dashed",
        barWidth: 20
      },
      dataConfig: {
        ...BASE_DATA_CONF,
        data: {
          categories: ["苹果", "三星", "华为", "oppo", "vivo", "小米"],
          series: [
            {
              name: "旺季",
              type: "line",
              data: [12112, 20981, 19080, 17008, 24325, 18215, 18852]
            },
            {
              name: "淡季",
              type: "bar",
              data: [13658, 14508, 12219, 11565, 9457, 10757, 12022]
            }
          ]
        }
      }
    }
  },
  {
    name: "3D折线图",
    icon: "line",
    type: "line3D",
    data: {
      title: "3D折线图",
      ...BASE_CONF,
      width: 1000,
      height: 800
    }
  }
];
