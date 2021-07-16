import { BASE_CONF, BASE_DATA_CONF } from "./default.js";

export default [
  {
    name: "饼图",
    icon: "pie",
    type: "pie",
    data: {
      title: "饼图",
      ...BASE_CONF,
      config: {
        unit: "",
        legendFontSize: 12,
        showLabel: false,
        showLegend: true
      },
      dataConfig: {
        ...BASE_DATA_CONF,
        data: {
          series: [
            {
              name: "苹果",
              data: 22338
            },
            {
              name: "三星",
              data: 10477
            },
            {
              name: "华为",
              data: 13862
            },
            {
              name: "oppo",
              data: 7170
            },
            {
              name: "vivo",
              data: 18325
            },
            {
              name: "小米",
              data: 10558
            }
          ]
        }
      }
    }
  },
  {
    name: "环形饼图",
    icon: "pie-nested",
    type: "pie-nested",
    data: {
      title: "环形饼图",
      ...BASE_CONF,
      config: {
        unit: "",
        isCirclePie: true,
        showLegend: false
      },
      dataConfig: {
        ...BASE_DATA_CONF,
        data: {
          series: [
            {
              name: "苹果",
              data: 22338
            },
            {
              name: "三星",
              data: 10477
            },
            {
              name: "华为",
              data: 13862
            },
            {
              name: "oppo",
              data: 7170
            },
            {
              name: "vivo",
              data: 18325
            },
            {
              name: "小米",
              data: 10558
            }
          ]
        }
      }
    }
  },
  {
    name: "玫瑰饼图",
    icon: "pie-rose",
    type: "pie-rose",
    data: {
      title: "玫瑰饼图",
      ...BASE_CONF,
      config: {
        unit: "",
        isCirclePie: false,
        isRoseType: true
      },
      dataConfig: {
        ...BASE_DATA_CONF,
        data: {
          series: [
            {
              name: "苹果",
              data: 22338
            },
            {
              name: "三星",
              data: 10477
            },
            {
              name: "华为",
              data: 13862
            },
            {
              name: "oppo",
              data: 7170
            },
            {
              name: "vivo",
              data: 18325
            },
            {
              name: "小米",
              data: 10558
            }
          ]
        }
      }
    }
  },
  {
    name: "嵌套饼图",
    icon: "pie-nested",
    type: "pie-double",
    data: {
      title: "嵌套饼图",
      ...BASE_CONF,
      config: {
        unit: "",
        sortType: "nestPie",
        isCirclePie: false,
        showLegend: true,
        labelLineLength: 20,
        labelLineLength2: 140
      },
      dataConfig: {
        ...BASE_DATA_CONF,
        data: {
          series: {
            inner: [
              {
                value: 700,
                unit: "个",
                name: "行业大类1"
              },
              {
                value: 679,
                unit: "个",
                name: "行业大类2"
              },
              {
                value: 1548,
                unit: "个",
                name: "行业大类3"
              }
            ],
            outer: [
              {
                value: 310,
                unit: "个",
                name: "邮件营销"
              },
              {
                value: 234,
                unit: "个",
                name: "联盟广告"
              },
              {
                value: 335,
                unit: "个",
                name: "视频广告"
              },
              {
                value: 548,
                unit: "个",
                name: "百度"
              },
              {
                value: 351,
                unit: "个",
                name: "谷歌"
              },
              {
                value: 247,
                unit: "个",
                name: "必应"
              }
            ]
          }
        }
      }
    }
  },
  {
    name: "轮播饼图",
    icon: "pie-play",
    type: "pie-play",
    data: {
      title: "轮播饼图",
      ...BASE_CONF,
      config: {
        unit: "",
        sortType: "swiperPie",
        isCirclePie: true,
        showLegend: true,
        showLabel: false,
        swiperTimer: 3
      },
      dataConfig: {
        ...BASE_DATA_CONF,
        data: {
          series: [
            ["正常请求次数", "满请求次数", "错误请求次数"],
            [200, 400, 700]
          ]
        }
      }
    }
  }
];
