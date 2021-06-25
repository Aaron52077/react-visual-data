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
                stack: {
                  title: "开启堆叠面积",
                  type: "boolean"
                },
                smooth: {
                  title: "开启平滑曲线",
                  type: "boolean"
                },
                axisLineColorX: {
                  title: "X轴文字颜色",
                  component: "color"
                },
                axisLabelColorY: {
                  title: "Y轴文字颜色",
                  component: "color"
                },
                splitLineColorY: {
                  title: "Y轴分割线颜色",
                  component: "color"
                },
                splitLineType: {
                  title: "坐标轴网格线类型",
                  type: "select",
                  enum: ["solid", "dashed", "dotted"],
                  enumNames: ["实线", "虚线", "点线"]
                },
                symbol: {
                  title: "标记类型",
                  type: "select",
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
                stack: {
                  title: "开启堆叠面积",
                  type: "boolean"
                },
                smooth: {
                  title: "开启平滑曲线",
                  type: "boolean"
                },
                axisLineColorX: {
                  title: "X轴文字颜色",
                  component: "color"
                },
                axisLabelColorY: {
                  title: "Y轴文字颜色",
                  component: "color"
                },
                splitLineColorY: {
                  title: "Y轴分割线颜色",
                  component: "color"
                },
                splitLineType: {
                  title: "坐标轴网格线类型",
                  type: "select",
                  enum: ["solid", "dashed", "dotted"],
                  enumNames: ["实线", "虚线", "点线"]
                },
                symbol: {
                  title: "标记类型",
                  type: "select",
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
                stack: {
                  title: "开启堆叠面积",
                  type: "boolean"
                },
                smooth: {
                  title: "开启平滑曲线",
                  type: "boolean"
                },
                axisLineColorX: {
                  title: "X轴文字颜色",
                  component: "color"
                },
                axisLabelColorY: {
                  title: "Y轴文字颜色",
                  component: "color"
                },
                splitLineColorY: {
                  title: "Y轴分割线颜色",
                  component: "color"
                },
                splitLineType: {
                  title: "坐标轴网格线类型",
                  type: "select",
                  enum: ["solid", "dashed", "dotted"],
                  enumNames: ["实线", "虚线", "点线"]
                },
                symbol: {
                  title: "标记类型",
                  type: "select",
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
                stack: {
                  title: "开启堆叠面积",
                  type: "boolean"
                },
                smooth: {
                  title: "开启平滑曲线",
                  type: "boolean"
                },
                axisLineColorX: {
                  title: "X轴文字颜色",
                  component: "color"
                },
                axisLabelColorY: {
                  title: "Y轴文字颜色",
                  component: "color"
                },
                splitLineColorY: {
                  title: "Y轴分割线颜色",
                  component: "color"
                },
                splitLineType: {
                  title: "坐标轴网格线类型",
                  type: "select",
                  enum: ["solid", "dashed", "dotted"],
                  enumNames: ["实线", "虚线", "点线"]
                },
                symbol: {
                  title: "标记类型",
                  type: "select",
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
    materials: "line3D",
    fields: [
      {
        name: "基础",
        key: "base",
        schema: {
          type: "object",
          properties: BASE_CONF
        }
      }
    ]
  }
];
