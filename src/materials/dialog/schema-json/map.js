import { BASE_CONF } from "./default.js";
import { PROVONCESCITYNAME, PROVONCESCITY } from "~materials/constants";

export default [
  {
    materials: "china-map",
    fields: [
      {
        name: "基础",
        key: "base",
        schema: {
          type: "object",
          properties: BASE_CONF
        }
      },
      {
        name: "高级",
        key: "setting",
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
                showAreaName: {
                  title: "是否显示区域名称",
                  type: "boolean",
                  component: "switch"
                },
                scaleMap: {
                  title: "开启地图缩放",
                  type: "boolean",
                  component: "switch"
                },
                borderColor: {
                  title: "分割线颜色",
                  type: "string",
                  component: "color"
                },
                labelTextColor: {
                  title: "label文字颜色",
                  type: "string",
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
              component: "dataSource",
              options: {
                height: 300
              }
            }
          }
        }
      },
      {
        name: "下钻",
        key: "drill",
        schema: {
          type: "object",
          properties: {
            drillDownOpen: {
              title: "开启下钻",
              type: "boolean",
              component: "switch"
            },
            drillDown: {
              title: "下钻后展示的图表类型",
              description:
                "在本图表中点击并触发下钻即可编辑下钻图表，传递到下钻图表中的上层图表信息及查询条件可以在下钻图表的控制面板中点击「调试」进行查看。",
              type: "array",
              component: "drillDownSelect",
              type: "array",
              displayType: "column",
              hidden: "{{rootValue.drillDownOpen == false}}"
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
          properties: BASE_CONF
        }
      },
      {
        name: "高级",
        key: "setting",
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
                  component: "select",
                  enum: PROVONCESCITY,
                  enumNames: PROVONCESCITYNAME,
                  options: {
                    placeholder: "根据首字母可检索",
                    showSearch: true
                  }
                },
                showAreaName: {
                  title: "是否显示区域名称",
                  type: "boolean",
                  component: "switch"
                },
                scaleMap: {
                  title: "开启地图缩放",
                  type: "boolean",
                  component: "switch"
                },
                borderColor: {
                  title: "分割线颜色",
                  type: "string",
                  component: "color"
                },
                labelTextColor: {
                  title: "label文字颜色",
                  type: "string",
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
              component: "dataSource",
              options: {
                height: 300
              }
            }
          }
        }
      },
      {
        name: "下钻",
        key: "drill",
        schema: {
          type: "object",
          properties: {
            drillDownOpen: {
              title: "开启下钻",
              type: "boolean",
              component: "switch"
            },
            drillDown: {
              title: "下钻后展示的图表类型",
              description:
                "在本图表中点击并触发下钻即可编辑下钻图表，传递到下钻图表中的上层图表信息及查询条件可以在下钻图表的控制面板中点击「调试」进行查看。",
              type: "array",
              component: "drillDownSelect",
              type: "array",
              displayType: "column",
              hidden: "{{rootValue.drillDownOpen == false}}"
            }
          }
        }
      }
    ]
  }
];
