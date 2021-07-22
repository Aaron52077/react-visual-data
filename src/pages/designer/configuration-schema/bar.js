import { BASE_CONF } from "./default.js";

export default [
  {
    materials: "bar",
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
                labelColor: {
                  title: "轴坐标字体颜色",
                  component: "color"
                },
                labelFontSizeX: {
                  title: "轴坐标文字大小",
                  component: "number",
                  min: 12,
                  max: 20
                },
                axisLineColor: {
                  title: "轴坐标颜色",
                  component: "color"
                },
                splitLineType: {
                  title: "坐标轴网格线类型",
                  type: "select",
                  enum: ["solid", "dashed", "dotted"],
                  enumNames: ["实线", "虚线", "点线"]
                },
                barWidth: {
                  title: "柱条的宽度",
                  component: "slider",
                  min: 10,
                  max: 50,
                  options: {
                    hideNumber: true
                  },
                  displayType: "row"
                },
                barBorderRadius: {
                  title: "柱体圆角",
                  component: "slider",
                  displayType: "row",
                  min: 0,
                  max: 20,
                  options: {
                    hideNumber: true,
                    hidden: "{{rootValue.barTextShow === true}}"
                  }
                },
                barTextShow: {
                  title: "柱顶展示数据",
                  type: "boolean",
                  displayType: "row",
                  labelWidth: 100
                },
                barTextFont: {
                  title: "柱顶文字大小",
                  component: "number",
                  min: 12,
                  max: 20
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
            },
            isRefresh: {
              title: "自动刷新时销毁并重绘",
              type: "boolean",
              labelWidth: 150
            },
            refreshTime: {
              title: "打开数据自动刷新",
              description: "自动刷新间隔(秒),数据的自动刷新在非编辑模式下有效,最小刷新时间为1秒",
              type: "number",
              displayType: "column",
              hidden: "{{rootValue.isRefresh === false}}",
              min: 1,
              max: 1800
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
              type: "boolean",
              title: "开启图表联动"
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
      // {
      //   name: "下钻",
      //   key: "drill",
      //   schema: {
      //     type: "object",
      //     properties: {
      //       drillDownOpen: {
      //         title: "开启下钻",
      //         type: "boolean",
      //         component: "switch",
      //         labelWidth: 60
      //       },
      //       drillDown: {
      //         type: "array",
      //         title: "下钻后展示的图表类型",
      //         description:
      //           "在本图表中点击并触发下钻即可编辑下钻图表，传递到下钻图表中的上层图表信息及查询条件可以在下钻图表的控制面板中点击「调试」进行查看。",
      //         component: "dynamicActions",
      //         displayType: "column",
      //         hidden: "{{rootValue.drillDownOpen === false}}"
      //       }
      //     }
      //   }
      // }
    ]
  },
  {
    materials: "bar-crosswise",
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
                labelColor: {
                  title: "轴坐标字体颜色",
                  component: "color"
                },
                labelFontSizeX: {
                  title: "轴坐标文字大小",
                  component: "number",
                  min: 12,
                  max: 20
                },
                axisLineColor: {
                  title: "轴坐标颜色",
                  component: "color"
                },
                splitLineType: {
                  title: "坐标轴网格线类型",
                  type: "select",
                  enum: ["solid", "dashed", "dotted"],
                  enumNames: ["实线", "虚线", "点线"]
                },
                barWidth: {
                  title: "柱条的宽度",
                  component: "slider",
                  min: 10,
                  max: 50,
                  options: {
                    hideNumber: true
                  },
                  displayType: "row"
                },
                barBorderRadius: {
                  title: "柱体圆角",
                  component: "slider",
                  displayType: "row",
                  min: 0,
                  max: 20,
                  options: {
                    hideNumber: true,
                    hidden: "{{rootValue.barTextShow === true}}"
                  }
                },
                barTextShow: {
                  title: "柱顶展示数据",
                  type: "boolean",
                  displayType: "row",
                  labelWidth: 100
                },
                barTextFont: {
                  title: "柱顶文字大小",
                  component: "number",
                  min: 12,
                  max: 20
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
            },
            isRefresh: {
              title: "自动刷新时销毁并重绘",
              type: "boolean",
              labelWidth: 150
            },
            refreshTime: {
              title: "打开数据自动刷新",
              description: "自动刷新间隔(秒),数据的自动刷新在非编辑模式下有效,最小刷新时间为1秒",
              type: "number",
              displayType: "column",
              hidden: "{{rootValue.isRefresh === false}}",
              min: 1,
              max: 1800
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
    materials: "bar-series",
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
                labelColor: {
                  title: "轴坐标字体颜色",
                  component: "color"
                },
                labelFontSizeX: {
                  title: "轴坐标文字大小",
                  component: "number",
                  min: 12,
                  max: 20
                },
                axisLineColor: {
                  title: "轴坐标颜色",
                  component: "color"
                },
                splitLineType: {
                  title: "坐标轴网格线类型",
                  type: "select",
                  enum: ["solid", "dashed", "dotted"],
                  enumNames: ["实线", "虚线", "点线"]
                },
                barWidth: {
                  title: "柱条的宽度",
                  component: "slider",
                  min: 10,
                  max: 50,
                  options: {
                    hideNumber: true
                  },
                  displayType: "row"
                },
                barBorderRadius: {
                  title: "柱体圆角",
                  component: "slider",
                  displayType: "row",
                  min: 0,
                  max: 20,
                  options: {
                    hideNumber: true,
                    hidden: "{{rootValue.barTextShow === true}}"
                  }
                },
                barTextShow: {
                  title: "柱顶展示数据",
                  type: "boolean",
                  displayType: "row",
                  labelWidth: 100
                },
                barTextFont: {
                  title: "柱顶文字大小",
                  component: "number",
                  min: 12,
                  max: 20
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
            },
            isRefresh: {
              title: "自动刷新时销毁并重绘",
              type: "boolean",
              labelWidth: 150
            },
            refreshTime: {
              title: "打开数据自动刷新",
              description: "自动刷新间隔(秒),数据的自动刷新在非编辑模式下有效,最小刷新时间为1秒",
              type: "number",
              displayType: "column",
              hidden: "{{rootValue.isRefresh === false}}",
              min: 1,
              max: 1800
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
    materials: "bar-heap",
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
                labelColor: {
                  title: "轴坐标字体颜色",
                  component: "color"
                },
                labelFontSizeX: {
                  title: "轴坐标文字大小",
                  component: "number",
                  min: 12,
                  max: 20
                },
                axisLineColor: {
                  title: "轴坐标颜色",
                  component: "color"
                },
                splitLineType: {
                  title: "坐标轴网格线类型",
                  type: "select",
                  enum: ["solid", "dashed", "dotted"],
                  enumNames: ["实线", "虚线", "点线"]
                },
                barWidth: {
                  title: "柱条的宽度",
                  component: "slider",
                  min: 10,
                  max: 50,
                  options: {
                    hideNumber: true
                  },
                  displayType: "row"
                },
                barBorderRadius: {
                  title: "柱体圆角",
                  component: "slider",
                  displayType: "row",
                  min: 0,
                  max: 20,
                  options: {
                    hideNumber: true,
                    hidden: "{{rootValue.barTextShow === true}}"
                  }
                },
                barTextShow: {
                  title: "柱顶展示数据",
                  type: "boolean",
                  displayType: "row",
                  labelWidth: 100
                },
                barTextFont: {
                  title: "柱顶文字大小",
                  component: "number",
                  min: 12,
                  max: 20
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
            },
            isRefresh: {
              title: "自动刷新时销毁并重绘",
              type: "boolean",
              labelWidth: 150
            },
            refreshTime: {
              title: "打开数据自动刷新",
              description: "自动刷新间隔(秒),数据的自动刷新在非编辑模式下有效,最小刷新时间为1秒",
              type: "number",
              displayType: "column",
              hidden: "{{rootValue.isRefresh === false}}",
              min: 1,
              max: 1800
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
    materials: "bar-contrast",
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
                labelColor: {
                  title: "轴坐标字体颜色",
                  component: "color"
                },
                labelFontSizeX: {
                  title: "轴坐标文字大小",
                  component: "number",
                  min: 12,
                  max: 20
                },
                axisLineColor: {
                  title: "轴坐标颜色",
                  component: "color"
                },
                splitLineType: {
                  title: "坐标轴网格线类型",
                  type: "select",
                  enum: ["solid", "dashed", "dotted"],
                  enumNames: ["实线", "虚线", "点线"]
                },
                barWidth: {
                  title: "柱条的宽度",
                  component: "slider",
                  min: 10,
                  max: 50,
                  options: {
                    hideNumber: true
                  },
                  displayType: "row"
                },
                barBorderRadius: {
                  title: "柱体圆角",
                  component: "slider",
                  displayType: "row",
                  min: 0,
                  max: 20,
                  options: {
                    hideNumber: true,
                    hidden: "{{rootValue.barTextShow === true}}"
                  }
                },
                barTextShow: {
                  title: "柱顶展示数据",
                  type: "boolean",
                  displayType: "row",
                  labelWidth: 100
                },
                barTextFont: {
                  title: "柱顶文字大小",
                  component: "number",
                  min: 12,
                  max: 20
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
            },
            isRefresh: {
              title: "自动刷新时销毁并重绘",
              type: "boolean",
              labelWidth: 150
            },
            refreshTime: {
              title: "打开数据自动刷新",
              description: "自动刷新间隔(秒),数据的自动刷新在非编辑模式下有效,最小刷新时间为1秒",
              type: "number",
              displayType: "column",
              hidden: "{{rootValue.isRefresh === false}}",
              min: 1,
              max: 1800
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
    materials: "bar-bothway",
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
                labelColor: {
                  title: "轴坐标字体颜色",
                  component: "color"
                },
                labelFontSizeX: {
                  title: "轴坐标文字大小",
                  component: "number",
                  min: 12,
                  max: 20
                },
                axisLineColor: {
                  title: "轴坐标颜色",
                  component: "color"
                },
                splitLineType: {
                  title: "坐标轴网格线类型",
                  type: "select",
                  enum: ["solid", "dashed", "dotted"],
                  enumNames: ["实线", "虚线", "点线"]
                },
                barWidth: {
                  title: "柱条的宽度",
                  component: "slider",
                  min: 10,
                  max: 50,
                  options: {
                    hideNumber: true
                  },
                  displayType: "row"
                },
                barBorderRadius: {
                  title: "柱体圆角",
                  component: "slider",
                  displayType: "row",
                  min: 0,
                  max: 20,
                  options: {
                    hideNumber: true,
                    hidden: "{{rootValue.barTextShow === true}}"
                  }
                },
                barTextShow: {
                  title: "柱顶展示数据",
                  type: "boolean",
                  displayType: "row",
                  labelWidth: 100
                },
                barTextFont: {
                  title: "柱顶文字大小",
                  component: "number",
                  min: 12,
                  max: 20
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
            },
            isRefresh: {
              title: "自动刷新时销毁并重绘",
              type: "boolean",
              labelWidth: 150
            },
            refreshTime: {
              title: "打开数据自动刷新",
              description: "自动刷新间隔(秒),数据的自动刷新在非编辑模式下有效,最小刷新时间为1秒",
              type: "number",
              displayType: "column",
              hidden: "{{rootValue.isRefresh === false}}",
              min: 1,
              max: 1800
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
    materials: "bar-alien",
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
                labelColor: {
                  title: "轴坐标字体颜色",
                  component: "color"
                },
                labelFontSizeX: {
                  title: "轴坐标文字大小",
                  component: "number",
                  min: 12,
                  max: 20
                },
                axisLineColor: {
                  title: "轴坐标颜色",
                  component: "color"
                },
                splitLineType: {
                  title: "坐标轴网格线类型",
                  type: "select",
                  enum: ["solid", "dashed", "dotted"],
                  enumNames: ["实线", "虚线", "点线"]
                },
                barWidth: {
                  title: "柱条的宽度",
                  component: "slider",
                  min: 10,
                  max: 50,
                  options: {
                    hideNumber: true
                  },
                  displayType: "row"
                },
                barBorderRadius: {
                  title: "柱体圆角",
                  component: "slider",
                  displayType: "row",
                  min: 0,
                  max: 20,
                  options: {
                    hideNumber: true,
                    hidden: "{{rootValue.barTextShow === true}}"
                  }
                },
                barTextShow: {
                  title: "柱顶展示数据",
                  type: "boolean",
                  displayType: "row",
                  labelWidth: 100
                },
                barTextFont: {
                  title: "柱顶文字大小",
                  component: "number",
                  min: 12,
                  max: 20
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
            },
            isRefresh: {
              title: "自动刷新时销毁并重绘",
              type: "boolean",
              labelWidth: 150
            },
            refreshTime: {
              title: "打开数据自动刷新",
              description: "自动刷新间隔(秒),数据的自动刷新在非编辑模式下有效,最小刷新时间为1秒",
              type: "number",
              displayType: "column",
              hidden: "{{rootValue.isRefresh === false}}",
              min: 1,
              max: 1800
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
