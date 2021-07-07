import { resultSuccess } from "../_util";

export default [
  {
    url: "/datav/screen",
    timeout: 200,
    method: "post",
    response: () => {
      return resultSuccess({
        page: {
          name: "",
          remark: "",
          pageSize: "large",
          zoom: "scaleX",
          backgroundMode: "define",
          backgroundColor: "rgba(29, 33, 39, 1)",
          backgroundImage: "",
          backgroundDefine: "background-2.png",
          backgroundBlur: 0,
          backgroundOpacity: 10,
          width: 1920,
          height: 1080
        },
        components: [
          {
            name: "边框3",
            type: "border3",
            data: {
              title: "边框3",
              width: 400,
              height: 250,
              left: 54,
              top: 43,
              background: "",
              isLock: false,
              isHidden: false
            },
            uniqueId: "0f32bc37-fb34-4bc8-bd71-6b9abb1dc658"
          },
          {
            name: "边框2",

            type: "border2",
            data: {
              title: "边框2",
              width: 400,
              height: 250,
              left: 959,
              top: 39,
              background: "",
              isLock: false,
              isHidden: false
            },
            uniqueId: "572f3310-9031-4b3a-88fe-45a6840c84c5"
          },
          {
            name: "边框5",

            type: "border5",
            data: {
              title: "边框5",
              width: 400,
              height: 250,
              left: 964,
              top: 329,
              background: "",
              isLock: false,
              isHidden: false
            },
            uniqueId: "7250e9b3-81d1-4155-97d9-fb901e351d36"
          },
          {
            name: "边框6",

            type: "border6",
            data: {
              title: "边框6",
              width: 400,
              height: 250,
              left: 57,
              top: 640,
              background: "",
              isLock: false,
              isHidden: false
            },
            uniqueId: "14f74cef-0dcc-4cc2-bdb4-7f67f1ccbbcf"
          },
          {
            name: "边框7",

            type: "border7",
            data: {
              title: "边框7",
              width: 400,
              height: 250,
              left: 520,
              top: 631,
              background: "",
              isLock: false,
              isHidden: false
            },
            uniqueId: "91837a8e-9001-441f-acd7-577f1322e230"
          },
          {
            name: "边框8",

            type: "border8",
            data: {
              title: "边框8",
              width: 400,
              height: 250,
              left: 59,
              top: 331,
              background: "",
              isLock: false,
              isHidden: false
            },
            uniqueId: "5f7cee0c-df97-4215-9496-4e8f9b49f7c6"
          },
          {
            name: "边框9",

            type: "border9",
            data: {
              title: "边框9",
              width: 400,
              height: 250,
              left: 970,
              top: 632,
              background: "",
              isLock: false,
              isHidden: false
            },
            uniqueId: "e6628a5e-1553-4612-90ae-7b6ffddeac14"
          },
          {
            name: "装饰1",
            icon: "bubble",
            type: "decoration1",
            data: {
              title: "装饰1",
              width: 174,
              height: 160,
              left: 1505,
              top: 56,
              background: "",
              isLock: false,
              isHidden: false
            },
            uniqueId: "48ff63a6-fe40-469f-913d-39b2ba97f226"
          },
          {
            name: "装饰2",
            icon: "bubble",
            type: "decoration2",
            data: {
              title: "装饰2",
              width: 230,
              height: 60,
              left: 1485,
              top: 271,
              background: "",
              isLock: false,
              isHidden: false
            },
            uniqueId: "31329ec5-2cf3-4446-bfc6-90ee246fb247"
          },
          {
            name: "装饰3",
            icon: "bubble",
            type: "decoration3",
            data: {
              title: "装饰3",
              width: 284,
              height: 50,
              left: 1462,
              top: 411,
              background: "",
              isLock: false,
              isHidden: false
            },
            uniqueId: "2c748a8f-1ebd-480a-9d4a-6136b219c398"
          },
          {
            name: "装饰4",
            icon: "bubble",
            type: "decoration4",
            data: {
              title: "装饰4",
              width: 507,
              height: 520,
              left: 1369,
              top: 521,
              background: "",
              isLock: false,
              isHidden: false
            },
            uniqueId: "8caf81be-581f-49d2-9c19-857004fdf6fe"
          },
          {
            name: "边框1",

            type: "border1",
            data: {
              title: "边框1",
              width: 400,
              height: 250,
              left: 505,
              top: 39,
              background: "",
              isLock: false,
              isHidden: false
            },
            uniqueId: "2343850e-450b-4b54-a23c-77de7754cc9f"
          },
          {
            name: "边框4",

            type: "border4",
            data: {
              title: "边框4",
              width: 400,
              height: 250,
              left: 522,
              top: 334,
              background: "",
              isLock: false,
              isHidden: false
            },
            uniqueId: "5cfe6d40-9194-40a6-b047-ad04b39ab8a6"
          }
        ]
      });
    }
  },
  {
    url: "/datav/grid",
    timeout: 200,
    method: "post",
    response: () => {
      return resultSuccess({
        page: {
          name: "",
          remark: "",
          backgroundMode: "define",
          backgroundColor: "rgba(29, 33, 39, 1)",
          backgroundImage: "",
          backgroundDefine: "background-2.png",
          backgroundBlur: 0,
          backgroundOpacity: 10
        },
        conditions: [
          {
            name: "日期",
            icon: "border-box",
            type: "date",
            data: {
              title: "日期",
              key: "date",
              width: 12,
              height: 30,
              defaultVal: "",
              left: 0,
              order: 1,
              required: false,
              top: 0,
              halfWidth: false,
              format: "dateTime",
              config: {}
            },
            uniqueId: "lwck1v1hru"
          }
        ],
        components: [
          {
            name: "过滤条件",
            icon: "border-box",
            type: "container",
            data: {
              title: "过滤条件",
              halfWidth: false,
              width: 12,
              height: 30,
              left: 0,
              top: 0,
              titleAlign: "left",
              titleColor: "rgba(188, 201, 212, 1)",
              hideTitle: false,
              labelColor: "",
              background: ""
            },
            uniqueId: "__form__"
          },
          {
            name: "多系列柱图",
            icon: "bar-crosswise",
            type: "bar-crosswise",
            data: {
              title: "多系列柱图",
              width: 3,
              height: 25,
              left: 0,
              top: 0,
              titleAlign: "left",
              titleColor: "rgba(188, 201, 212, 1)",
              hideTitle: true,
              link: "",
              background: "",
              isLock: false,
              isHidden: false,
              remark: "",
              isCustomStyle: false,
              borderRadius: "",
              borderColor: "",
              borderWidth: "",
              borderStyle: "solid",
              shadowOffset: 0,
              shadowColor: "",
              shadowWidth: 0,
              animateType: "",
              animateTime: "",
              animateSpeed: "",
              animateRepeat: "",
              isRefresh: true,
              refreshTime: 1800,
              drillDownOpen: false,
              drillDown: [],
              dependenceOpen: false,
              dependences: [],
              config: {
                unit: "",
                direction: "horizontal",
                stack: false,
                barWidth: 15,
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
                dataType: "json",
                dataSqlId: "",
                dataModals: {},
                dataApiId: "",
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
            },
            uniqueId: "3217fea5"
          },
          {
            name: "柱状图",
            icon: "bar",
            type: "bar",
            data: {
              title: "柱状图",
              width: 3,
              height: 25,
              left: 6,
              top: 0,
              titleAlign: "left",
              titleColor: "rgba(188, 201, 212, 1)",
              hideTitle: true,
              link: "",
              background: "",
              isLock: false,
              isHidden: false,
              remark: "",
              isCustomStyle: false,
              borderRadius: "",
              borderColor: "",
              borderWidth: "",
              borderStyle: "solid",
              shadowOffset: 0,
              shadowColor: "",
              shadowWidth: 0,
              animateType: "",
              animateTime: "",
              animateSpeed: "",
              animateRepeat: "",
              isRefresh: true,
              refreshTime: 1800,
              drillDownOpen: false,
              drillDown: [],
              dependenceOpen: false,
              dependences: [],
              config: {
                unit: "",
                direction: "horizontal",
                stack: false,
                barWidth: 15,
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
                dataType: "json",
                dataSqlId: "",
                dataModals: {},
                dataApiId: "",
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
            },
            uniqueId: "2c39cd94"
          }
        ]
      });
    }
  },
  {
    url: "/datav/api",
    timeout: 200,
    method: "get",
    response: () => {
      return resultSuccess({
        "data|2-4": [
          {
            id: "@zip()",
            name: "测试@increment()",
            data: {
              "series|1-3": [{ "data|6": ["@integer(1000, 2500)"], name: "@cname()" }],
              "categories|6": ["@city()"]
            }
          }
        ]
      });
    }
  }
];
