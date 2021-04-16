import { BASE_CONF } from "./default.js";

export default [
  {
    materials: "line",
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
                stack: {
                  title: "开启堆叠面积",
                  type: "boolean",
                  component: "switch"
                },
                smooth: {
                  title: "开启平滑曲线",
                  type: "boolean",
                  component: "switch"
                },
                axisLineColorX: {
                  title: "X轴文字颜色",
                  type: "string",
                  component: "color"
                },
                axisLabelColorY: {
                  title: "Y轴文字颜色",
                  type: "string",
                  component: "color"
                },
                splitLineColorY: {
                  title: "Y轴分割线颜色",
                  type: "string",
                  component: "color"
                },
                splitLineType: {
                  title: "坐标轴网格线类型",
                  type: "string",
                  enum: ["solid", "dashed", "dotted"],
                  enumNames: ["实线", "虚线", "点线"]
                },
                symbol: {
                  title: "标记类型",
                  type: "string",
                  enum: ["circle", "rect", "roundRect", "triangle", "diamond", "pin", "arrow"]
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
    materials: "step-line",
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
                stack: {
                  title: "开启堆叠面积",
                  type: "boolean",
                  component: "switch"
                },
                smooth: {
                  title: "开启平滑曲线",
                  type: "boolean",
                  component: "switch"
                },
                axisLineColorX: {
                  title: "X轴文字颜色",
                  type: "string",
                  component: "color"
                },
                axisLabelColorY: {
                  title: "Y轴文字颜色",
                  type: "string",
                  component: "color"
                },
                splitLineColorY: {
                  title: "Y轴分割线颜色",
                  type: "string",
                  component: "color"
                },
                splitLineType: {
                  title: "坐标轴网格线类型",
                  type: "string",
                  enum: ["solid", "dashed", "dotted"],
                  enumNames: ["实线", "虚线", "点线"]
                },
                symbol: {
                  title: "标记类型",
                  type: "string",
                  enum: ["circle", "rect", "roundRect", "triangle", "diamond", "pin", "arrow"]
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
    materials: "line-middle",
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
                stack: {
                  title: "开启堆叠面积",
                  type: "boolean",
                  component: "switch"
                },
                smooth: {
                  title: "开启平滑曲线",
                  type: "boolean",
                  component: "switch"
                },
                axisLineColorX: {
                  title: "X轴文字颜色",
                  type: "string",
                  component: "color"
                },
                axisLabelColorY: {
                  title: "Y轴文字颜色",
                  type: "string",
                  component: "color"
                },
                splitLineColorY: {
                  title: "Y轴分割线颜色",
                  type: "string",
                  component: "color"
                },
                splitLineType: {
                  title: "坐标轴网格线类型",
                  type: "string",
                  enum: ["solid", "dashed", "dotted"],
                  enumNames: ["实线", "虚线", "点线"]
                },
                symbol: {
                  title: "标记类型",
                  type: "string",
                  enum: ["circle", "rect", "roundRect", "triangle", "diamond", "pin", "arrow"]
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
    materials: "line-bar",
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
                stack: {
                  title: "开启堆叠面积",
                  type: "boolean",
                  component: "switch"
                },
                smooth: {
                  title: "开启平滑曲线",
                  type: "boolean",
                  component: "switch"
                },
                axisLineColorX: {
                  title: "X轴文字颜色",
                  type: "string",
                  component: "color"
                },
                axisLabelColorY: {
                  title: "Y轴文字颜色",
                  type: "string",
                  component: "color"
                },
                splitLineColorY: {
                  title: "Y轴分割线颜色",
                  type: "string",
                  component: "color"
                },
                splitLineType: {
                  title: "坐标轴网格线类型",
                  type: "string",
                  enum: ["solid", "dashed", "dotted"],
                  enumNames: ["实线", "虚线", "点线"]
                },
                symbol: {
                  title: "标记类型",
                  type: "string",
                  enum: ["circle", "rect", "roundRect", "triangle", "diamond", "pin", "arrow"]
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
