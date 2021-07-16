import { BASE_CONF_SCHEMA } from "./default.js";
import { PROVONCESCITYNAME, PROVONCESCITY } from "~packages/constants";

export default [
  {
    materials: "china-map",
    fields: [
      {
        name: "基础",
        key: "base",
        schema: {
          type: "object",
          properties: BASE_CONF_SCHEMA
        }
      },
      {
        name: "高级",
        key: "options",
        schema: {
          type: "object",
          displayType: "row",
          properties: {
            config: {
              type: "object",
              title: "高级属性",
              description: "图表组件属性说明",
              displayType: "row",
              properties: {
                unit: {
                  title: "单位",
                  type: "string",
                  options: {
                    allowClear: true,
                    placeholder: "请输入单位"
                  }
                },
                showAreaName: {
                  title: "是否显示区域名称",
                  type: "boolean"
                },
                scaleMap: {
                  title: "开启地图缩放",
                  type: "boolean"
                },
                borderColor: {
                  title: "分割线颜色",
                  component: "color"
                },
                labelTextColor: {
                  title: "label文字颜色",
                  component: "color"
                },
                customColors: {
                  title: "自定义颜色",
                  component: "colorGroup",
                  options: {
                    label: "可增加多个配色项，依次映射数值从小到大的颜色"
                  }
                }
              }
            }
          }
        }
      },
      {
        name: "数据",
        key: "data",
        schema: {
          type: "object",
          properties: {
            dataConfig: {
              type: "object",
              title: "数据属性相关",
              description: "支持多数据源转换映射",
              displayType: "column",
              component: "dynamicData",
              options: {
                height: 300
              }
            }
          }
        }
      },
      {
        name: "联动",
        key: "dependence",
        schema: {
          type: "object",
          properties: {
            dependenceOpen: {
              title: "开启图表联动",
              type: "boolean"
            },
            dependence: {
              title: "请选择与本图表联动的下级图表",
              type: "array",
              component: "dependenceSelect",
              description:
                "在本图表中点击数据项可触发下级图表联动的更新数据。触发联动后，在下级图表的控制面板中点击「调试」可以查看传递到下级图表的本图表点击数据项的信息。",
              displayType: "column",
              hidden: "{{rootValue.dependenceOpen === false}}"
            }
          }
        }
      }
    ]
  },
  {
    materials: "map-city",
    fields: [
      {
        name: "基础",
        key: "base",
        schema: {
          type: "object",
          properties: BASE_CONF_SCHEMA
        }
      },
      {
        name: "高级",
        key: "options",
        schema: {
          type: "object",
          properties: {
            config: {
              type: "object",
              title: "高级属性",
              description: "图表组件属性说明",
              displayType: "column",
              properties: {
                unit: {
                  title: "单位",
                  type: "string",
                  options: {
                    allowClear: true,
                    placeholder: "请输入单位"
                  }
                },
                provinces: {
                  title: "省份",
                  type: "string",
                  type: "select",
                  enum: PROVONCESCITY,
                  enumNames: PROVONCESCITYNAME,
                  options: {
                    placeholder: "根据首字母可检索",
                    showSearch: true
                  }
                },
                showAreaName: {
                  title: "是否显示区域名称",
                  type: "boolean"
                },
                scaleMap: {
                  title: "开启地图缩放",
                  type: "boolean"
                },
                borderColor: {
                  title: "分割线颜色",
                  component: "color"
                },
                labelTextColor: {
                  title: "label文字颜色",
                  component: "color"
                }
              }
            }
          }
        }
      },
      {
        name: "数据",
        key: "data",
        schema: {
          type: "object",
          properties: {
            dataConfig: {
              type: "object",
              title: "数据属性相关",
              description: "支持多数据源转换映射",
              displayType: "column",
              component: "dynamicData",
              options: {
                height: 300
              }
            }
          }
        }
      },
      {
        name: "联动",
        key: "dependence",
        schema: {
          type: "object",
          properties: {
            dependenceOpen: {
              title: "开启图表联动",
              type: "boolean"
            },
            dependence: {
              title: "请选择与本图表联动的下级图表",
              type: "array",
              component: "dependenceSelect",
              description:
                "在本图表中点击数据项可触发下级图表联动的更新数据。触发联动后，在下级图表的控制面板中点击「调试」可以查看传递到下级图表的本图表点击数据项的信息。",
              displayType: "column",
              hidden: "{{rootValue.dependenceOpen === false}}"
            }
          }
        }
      }
    ]
  }
];
