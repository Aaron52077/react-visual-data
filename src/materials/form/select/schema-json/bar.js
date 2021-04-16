import { BASE_CONF, BASE_CONF_DATA } from "./default.js";

const BAR_CONF = [
  {
    name: "柱状图",
    type: "bar",
    data: {
      title: "柱状图",
      ...BASE_CONF,
      config: {
        unit: "",
        direction: "horizontal",
        stack: false,
        barWidth: 20,
        labelColor: "#cccccc",
        axisLineColor: "#cccccc",
        labelFontSizeX: 12,
        splitLineType: "dashed",
        splitLineShow: true,
        barBorderRadius: 0,
        barTextShow: false,
        barTextFont: 12,
        inverse: false
      },
      dataConfig: {
        ...BASE_CONF_DATA,
        data: {
          categories: ["苹果", "三星", "华为", "oppo", "vivo", "小米"],
          series: [
            {
              name: "旺季",
              data: [12102, 20981, 19080, 17008, 24325, 18215, 18852]
            }
          ]
        }
      }
    }
  },
  {
    name: "多系列柱图",
    type: "bar-crosswise",
    data: {
      title: "多系列柱图",
      ...BASE_CONF,
      config: {
        unit: "",
        direction: "horizontal",
        stack: false,
        barWidth: 20,
        labelColor: "#cccccc",
        axisLineColor: "#cccccc",
        labelFontSizeX: 12,
        splitLineType: "dashed",
        splitLineShow: true,
        barBorderRadius: 0,
        barTextShow: false,
        barTextFont: 12,
        inverse: false
      },
      dataConfig: {
        ...BASE_CONF_DATA,
        data: {
          categories: ["苹果", "三星", "华为", "oppo", "vivo", "小米"],
          series: [
            {
              name: "旺季",
              data: [12102, 20981, 19080, 17008, 24325, 18215, 18852]
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
    name: "横向柱图",
    type: "bar-series",
    data: {
      title: "横向柱图",
      ...BASE_CONF,
      config: {
        unit: "",
        direction: "vertical",
        stack: false,
        barWidth: 20,
        labelColor: "#cccccc",
        axisLineColor: "#cccccc",
        labelFontSizeX: 12,
        splitLineType: "dashed",
        splitLineShow: true,
        barBorderRadius: 0,
        barTextShow: false,
        barTextFont: 12,
        inverse: false
      },
      dataConfig: {
        ...BASE_CONF_DATA,
        data: {
          categories: ["苹果", "三星", "华为", "oppo", "vivo", "小米"],
          series: [
            {
              name: "旺季",
              data: [12102, 20981, 19080, 17008, 24325, 18215, 18852]
            }
          ]
        }
      }
    }
  },
  {
    name: "堆积柱状图",
    type: "bar-heap",
    data: {
      title: "堆积柱状图",
      ...BASE_CONF,
      config: {
        unit: "",
        direction: "horizontal",
        stack: true,
        barWidth: 20,
        labelColor: "#cccccc",
        axisLineColor: "#cccccc",
        labelFontSizeX: 12,
        splitLineType: "dashed",
        splitLineShow: true,
        barBorderRadius: 0,
        barTextShow: false,
        barTextFont: 12,
        inverse: false
      },
      dataConfig: {
        ...BASE_CONF_DATA,
        data: {
          categories: ["苹果", "三星", "华为", "oppo", "vivo", "小米"],
          series: [
            {
              name: "旺季",
              data: [12102, 20981, 19080, 17008, 24325, 18215, 18852]
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
    name: "正负柱图",
    type: "bar-contrast",
    data: {
      title: "正负柱图",
      ...BASE_CONF,
      config: {
        unit: "",
        direction: "horizontal",
        stack: false,
        barWidth: 20,
        labelColor: "#cccccc",
        axisLineColor: "#cccccc",
        labelFontSizeX: 12,
        splitLineType: "dashed",
        splitLineShow: true,
        barBorderRadius: 0,
        barTextFont: 12,
        barTitlePosition: true,
        barTextShow: true
      },
      dataConfig: {
        ...BASE_CONF_DATA,
        data: {
          categories: ["苹果", "三星", "华为", "oppo", "vivo", "小米"],
          series: [
            {
              name: "旺季",
              data: [12102, 20981, 19080, 17008, 24325, 18215, 18852]
            },
            {
              name: "淡季",
              data: [-13658, -14508, -12219, -11565, -9457, -10757, -12022]
            }
          ]
        }
      }
    }
  },
  {
    name: "双向柱图",
    type: "bar-bothway",
    data: {
      title: "双向柱图",
      ...BASE_CONF,
      config: {
        unit: "",
        direction: "vertical",
        inverse: false,
        stack: true,
        barWidth: 20,
        labelColor: "#cccccc",
        axisLineColor: "#cccccc",
        labelFontSizeX: 12,
        splitLineType: "dashed",
        splitLineShow: true,
        barBorderRadius: 0,
        barTextFont: 12,
        barTitlePosition: true,
        barTextShow: true
      },
      dataConfig: {
        ...BASE_CONF_DATA,
        data: {
          categories: ["苹果", "三星", "华为", "oppo", "vivo", "小米"],
          series: [
            {
              name: "旺季",
              data: [12102, 20981, 19080, 17008, 24325, 18215, 18852]
            },
            {
              name: "淡季",
              data: [-13658, -14508, -12219, -11565, -9457, -10757, -12022]
            }
          ]
        }
      }
    }
  },
  {
    name: "山峰柱状图",
    type: "bar-alien",
    data: {
      title: "山峰柱状图",
      ...BASE_CONF,
      config: {
        unit: "",
        direction: "horizontal",
        sortType: "pictorialBar",
        inverse: false,
        stack: false,
        barWidth: 20,
        labelColor: "#cccccc",
        axisLineColor: "#cccccc",
        labelFontSizeX: 12,
        splitLineType: "dashed",
        splitLineShow: true,
        barBorderRadius: 0,
        barTextFont: 12,
        barTitlePosition: false,
        barTextShow: true,
        chartContrast: false,
        legendShow: false,
        axisTickShow: false
      },
      dataConfig: {
        ...BASE_CONF_DATA,
        data: {
          categories: ["苹果", "三星", "华为", "oppo", "vivo", "小米"],
          series: [
            {
              name: "旺季",
              data: [12102, 20981, 19080, 17008, 24325, 18215, 18852]
            }
          ]
        }
      }
    }
  }
];

export default BAR_CONF;
