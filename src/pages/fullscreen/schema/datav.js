export default [
  {
    materials: "tabs",
    fields: [
      {
        name: "基础",
        key: "base",
        schema: {
          type: "object",
          properties: {
            title: {
              title: "图层名称",
              type: "string",
              options: { allowClear: true, placeholder: "请输入标题" }
            },
            width: { title: "宽度", type: "number", options: { placeholder: "请输入宽度" } },
            height: { title: "高度", type: "number", options: { placeholder: "请输入高度" } },
            left: {
              title: "坐标X",
              type: "number",
              options: { placeholder: "请输入X轴坐标" }
            },
            top: {
              title: "坐标Y",
              type: "number",
              options: { placeholder: "请输入Y轴坐标" }
            },
            background: { title: "背景颜色", component: "color" },
            isLock: {
              title: "锁定图层",
              type: "boolean",
              options: {
                checkedChildren: "开启",
                unCheckedChildren: "关闭"
              }
            },
            isHidden: {
              title: "隐藏图层",
              type: "boolean",
              options: {
                checkedChildren: "开启",
                unCheckedChildren: "关闭"
              }
            }
          }
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
                tabToChart: {
                  title: "配置tab列表",
                  type: "array",
                  component: "tabTable"
                },
                defaultTab: {
                  title: "默认选中的Tab",
                  type: "string",
                  component: "tabSelect"
                },
                openSlide: {
                  title: "开启轮播",
                  type: "boolean",
                  displayType: "row",
                  labelWidth: 100
                },
                slideInterval: {
                  title: "轮播时间间隔（毫秒）",
                  component: "number",
                  min: 0,
                  hidden: "{{rootValue.openSlide === false}}",
                  options: {
                    step: 500
                  }
                },
                btnType: {
                  title: "按钮样式",
                  type: "string",
                  component: "radio",
                  enum: ["groups", "disperse"],
                  enumNames: ["按钮组", "分离的按钮组"]
                },
                btnMargin: {
                  title: "按钮间距离",
                  component: "number",
                  min: 0,
                  hidden: "{{rootValue.btnType == 'groups'}}"
                },
                activeBgColor: {
                  title: "当前选中的按钮背景色",
                  component: "color"
                },
                activeColor: {
                  title: "当前选中的按钮字体颜色",
                  component: "color"
                },
                defaultBgColor: {
                  title: "未选中的按钮背景色",
                  component: "color"
                },
                defaultColor: {
                  title: "未选中的按钮字体颜色",
                  component: "color"
                },
                fontSize: {
                  title: "文字大小",
                  component: "number",
                  min: 12,
                  max: 100
                }
              }
            }
          }
        }
      }
    ]
  },
  {
    materials: "iframe",
    fields: [
      {
        name: "基础",
        key: "base",
        schema: {
          type: "object",
          properties: {
            title: {
              title: "图层名称",
              type: "string",
              options: { allowClear: true, placeholder: "请输入标题" }
            },
            width: { title: "宽度", type: "number", options: { placeholder: "请输入宽度" } },
            height: { title: "高度", type: "number", options: { placeholder: "请输入高度" } },
            left: {
              title: "坐标X",
              type: "number",
              options: { placeholder: "请输入X轴坐标" }
            },
            top: {
              title: "坐标Y",
              type: "number",
              options: { placeholder: "请输入Y轴坐标" }
            },
            background: { title: "背景颜色", component: "color" },
            isLock: {
              title: "锁定图层",
              type: "boolean",
              options: {
                checkedChildren: "开启",
                unCheckedChildren: "关闭"
              }
            },
            isHidden: {
              title: "隐藏图层",
              type: "boolean",
              options: {
                checkedChildren: "开启",
                unCheckedChildren: "关闭"
              }
            }
          }
        }
      },
      {
        name: "地址",
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
      }
    ]
  },
  // {
  //   materials: "custom-iframe",
  //   fields: [
  //     {
  //       name: "基础",
  //       key: "base",
  //       schema: {
  //         type: "object",
  //         properties: {
  //           title: {
  //             title: "图层名称",
  //             type: "string",
  //             options: { allowClear: true, placeholder: "请输入标题" }
  //           },
  //           width: { title: "宽度", type: "number", options: { placeholder: "请输入宽度" } },
  //           height: { title: "高度", type: "number", options: { placeholder: "请输入高度" } },
  //           left: {
  //             title: "坐标X",
  //             type: "number",
  //             options: { placeholder: "请输入X轴坐标" }
  //           },
  //           top: {
  //             title: "坐标Y",
  //             type: "number",
  //             options: { placeholder: "请输入Y轴坐标" }
  //           },
  //           background: { title: "背景颜色", component: "color" },
  //           isLock: {
  //             title: "锁定图层",
  //             type: "boolean",
  //             options: {
  //               checkedChildren: "开启",
  //               unCheckedChildren: "关闭"
  //             }
  //           },
  //           isHidden: {
  //             title: "隐藏图层",
  //             type: "boolean",
  //             options: {
  //               checkedChildren: "开启",
  //               unCheckedChildren: "关闭"
  //             }
  //           }
  //         }
  //       }
  //     },
  //     {
  //       name: "地址",
  //       key: "data",
  //       schema: {
  //         type: "object",
  //         properties: {
  //           dataConfig: {
  //             type: "object",
  //             title: "数据属性相关",
  //             description: "支持多数据源转换映射",
  //             displayType: "column",
  //             component: "dynamicData",
  //             options: {
  //               height: 300
  //             }
  //           }
  //         }
  //       }
  //     }
  //   ]
  // },
  {
    materials: "decoration1",
    fields: [
      {
        name: "基础",
        key: "base",
        schema: {
          type: "object",
          properties: {
            title: {
              title: "图层名称",
              type: "string",
              options: { allowClear: true, placeholder: "请输入标题" }
            },
            width: { title: "宽度", type: "number", options: { placeholder: "请输入宽度" } },
            height: { title: "高度", type: "number", options: { placeholder: "请输入高度" } },
            left: {
              title: "坐标X",
              type: "number",
              options: { placeholder: "请输入X轴坐标" }
            },
            top: {
              title: "坐标Y",
              type: "number",
              options: { placeholder: "请输入Y轴坐标" }
            },
            background: { title: "背景颜色", component: "color" },
            isLock: {
              title: "锁定图层",
              type: "boolean",
              options: {
                checkedChildren: "开启",
                unCheckedChildren: "关闭"
              }
            },
            isHidden: {
              title: "隐藏图层",
              type: "boolean",
              options: {
                checkedChildren: "开启",
                unCheckedChildren: "关闭"
              }
            }
          }
        }
      }
    ]
  },
  {
    materials: "decoration2",
    fields: [
      {
        name: "基础",
        key: "base",
        schema: {
          type: "object",
          properties: {
            title: {
              title: "图层名称",
              type: "string",
              options: { allowClear: true, placeholder: "请输入标题" }
            },
            width: { title: "宽度", type: "number", options: { placeholder: "请输入宽度" } },
            height: { title: "高度", type: "number", options: { placeholder: "请输入高度" } },
            left: {
              title: "坐标X",
              type: "number",
              options: { placeholder: "请输入X轴坐标" }
            },
            top: {
              title: "坐标Y",
              type: "number",
              options: { placeholder: "请输入Y轴坐标" }
            },
            background: { title: "背景颜色", component: "color" },
            isLock: {
              title: "锁定图层",
              type: "boolean",
              options: {
                checkedChildren: "开启",
                unCheckedChildren: "关闭"
              }
            },
            isHidden: {
              title: "隐藏图层",
              type: "boolean",
              options: {
                checkedChildren: "开启",
                unCheckedChildren: "关闭"
              }
            }
          }
        }
      }
    ]
  },
  {
    materials: "decoration3",
    fields: [
      {
        name: "基础",
        key: "base",
        schema: {
          type: "object",
          properties: {
            title: {
              title: "图层名称",
              type: "string",
              options: { allowClear: true, placeholder: "请输入标题" }
            },
            width: { title: "宽度", type: "number", options: { placeholder: "请输入宽度" } },
            height: { title: "高度", type: "number", options: { placeholder: "请输入高度" } },
            left: {
              title: "坐标X",
              type: "number",
              options: { placeholder: "请输入X轴坐标" }
            },
            top: {
              title: "坐标Y",
              type: "number",
              options: { placeholder: "请输入Y轴坐标" }
            },
            background: { title: "背景颜色", component: "color" },
            isLock: {
              title: "锁定图层",
              type: "boolean",
              options: {
                checkedChildren: "开启",
                unCheckedChildren: "关闭"
              }
            },
            isHidden: {
              title: "隐藏图层",
              type: "boolean",
              options: {
                checkedChildren: "开启",
                unCheckedChildren: "关闭"
              }
            }
          }
        }
      }
    ]
  },
  {
    materials: "decoration4",
    fields: [
      {
        name: "基础",
        key: "base",
        schema: {
          type: "object",
          properties: {
            title: {
              title: "图层名称",
              type: "string",
              options: { allowClear: true, placeholder: "请输入标题" }
            },
            width: { title: "宽度", type: "number", options: { placeholder: "请输入宽度" } },
            height: { title: "高度", type: "number", options: { placeholder: "请输入高度" } },
            left: {
              title: "坐标X",
              type: "number",
              options: { placeholder: "请输入X轴坐标" }
            },
            top: {
              title: "坐标Y",
              type: "number",
              options: { placeholder: "请输入Y轴坐标" }
            },
            background: { title: "背景颜色", component: "color" },
            isLock: {
              title: "锁定图层",
              type: "boolean",
              options: {
                checkedChildren: "开启",
                unCheckedChildren: "关闭"
              }
            },
            isHidden: {
              title: "隐藏图层",
              type: "boolean",
              options: {
                checkedChildren: "开启",
                unCheckedChildren: "关闭"
              }
            }
          }
        }
      }
    ]
  },
  {
    materials: "border1",
    fields: [
      {
        name: "基础",
        key: "base",
        schema: {
          type: "object",
          properties: {
            title: {
              title: "图层名称",
              type: "string",
              options: { allowClear: true, placeholder: "请输入标题" }
            },
            width: { title: "宽度", type: "number", options: { placeholder: "请输入宽度" } },
            height: { title: "高度", type: "number", options: { placeholder: "请输入高度" } },
            left: {
              title: "坐标X",
              type: "number",
              options: { placeholder: "请输入X轴坐标" }
            },
            top: {
              title: "坐标Y",
              type: "number",
              options: { placeholder: "请输入Y轴坐标" }
            },
            background: { title: "背景颜色", component: "color" },
            isLock: {
              title: "锁定图层",
              type: "boolean",
              options: {
                checkedChildren: "开启",
                unCheckedChildren: "关闭"
              }
            },
            isHidden: {
              title: "隐藏图层",
              type: "boolean",
              options: {
                checkedChildren: "开启",
                unCheckedChildren: "关闭"
              }
            }
          }
        }
      }
    ]
  },
  {
    materials: "border2",
    fields: [
      {
        name: "基础",
        key: "base",
        schema: {
          type: "object",
          properties: {
            title: {
              title: "图层名称",
              type: "string",
              options: { allowClear: true, placeholder: "请输入标题" }
            },
            width: { title: "宽度", type: "number", options: { placeholder: "请输入宽度" } },
            height: { title: "高度", type: "number", options: { placeholder: "请输入高度" } },
            left: {
              title: "坐标X",
              type: "number",
              options: { placeholder: "请输入X轴坐标" }
            },
            top: {
              title: "坐标Y",
              type: "number",
              options: { placeholder: "请输入Y轴坐标" }
            },
            background: { title: "背景颜色", component: "color" },
            isLock: {
              title: "锁定图层",
              type: "boolean",
              options: {
                checkedChildren: "开启",
                unCheckedChildren: "关闭"
              }
            },
            isHidden: {
              title: "隐藏图层",
              type: "boolean",
              options: {
                checkedChildren: "开启",
                unCheckedChildren: "关闭"
              }
            }
          }
        }
      }
    ]
  },
  {
    materials: "border3",
    fields: [
      {
        name: "基础",
        key: "base",
        schema: {
          type: "object",
          properties: {
            title: {
              title: "图层名称",
              type: "string",
              options: { allowClear: true, placeholder: "请输入标题" }
            },
            width: { title: "宽度", type: "number", options: { placeholder: "请输入宽度" } },
            height: { title: "高度", type: "number", options: { placeholder: "请输入高度" } },
            left: {
              title: "坐标X",
              type: "number",
              options: { placeholder: "请输入X轴坐标" }
            },
            top: {
              title: "坐标Y",
              type: "number",
              options: { placeholder: "请输入Y轴坐标" }
            },
            background: { title: "背景颜色", component: "color" },
            isLock: {
              title: "锁定图层",
              type: "boolean",
              options: {
                checkedChildren: "开启",
                unCheckedChildren: "关闭"
              }
            },
            isHidden: {
              title: "隐藏图层",
              type: "boolean",
              options: {
                checkedChildren: "开启",
                unCheckedChildren: "关闭"
              }
            }
          }
        }
      }
    ]
  },
  {
    materials: "border4",
    fields: [
      {
        name: "基础",
        key: "base",
        schema: {
          type: "object",
          properties: {
            title: {
              title: "图层名称",
              type: "string",
              options: { allowClear: true, placeholder: "请输入标题" }
            },
            width: { title: "宽度", type: "number", options: { placeholder: "请输入宽度" } },
            height: { title: "高度", type: "number", options: { placeholder: "请输入高度" } },
            left: {
              title: "坐标X",
              type: "number",
              options: { placeholder: "请输入X轴坐标" }
            },
            top: {
              title: "坐标Y",
              type: "number",
              options: { placeholder: "请输入Y轴坐标" }
            },
            background: { title: "背景颜色", component: "color" },
            isLock: {
              title: "锁定图层",
              type: "boolean",
              options: {
                checkedChildren: "开启",
                unCheckedChildren: "关闭"
              }
            },
            isHidden: {
              title: "隐藏图层",
              type: "boolean",
              options: {
                checkedChildren: "开启",
                unCheckedChildren: "关闭"
              }
            }
          }
        }
      }
    ]
  },
  {
    materials: "border5",
    fields: [
      {
        name: "基础",
        key: "base",
        schema: {
          type: "object",
          properties: {
            title: {
              title: "图层名称",
              type: "string",
              options: { allowClear: true, placeholder: "请输入标题" }
            },
            width: { title: "宽度", type: "number", options: { placeholder: "请输入宽度" } },
            height: { title: "高度", type: "number", options: { placeholder: "请输入高度" } },
            left: {
              title: "坐标X",
              type: "number",
              options: { placeholder: "请输入X轴坐标" }
            },
            top: {
              title: "坐标Y",
              type: "number",
              options: { placeholder: "请输入Y轴坐标" }
            },
            background: { title: "背景颜色", component: "color" },
            isLock: {
              title: "锁定图层",
              type: "boolean",
              options: {
                checkedChildren: "开启",
                unCheckedChildren: "关闭"
              }
            },
            isHidden: {
              title: "隐藏图层",
              type: "boolean",
              options: {
                checkedChildren: "开启",
                unCheckedChildren: "关闭"
              }
            }
          }
        }
      }
    ]
  },
  {
    materials: "border6",
    fields: [
      {
        name: "基础",
        key: "base",
        schema: {
          type: "object",
          properties: {
            title: {
              title: "图层名称",
              type: "string",
              options: { allowClear: true, placeholder: "请输入标题" }
            },
            width: { title: "宽度", type: "number", options: { placeholder: "请输入宽度" } },
            height: { title: "高度", type: "number", options: { placeholder: "请输入高度" } },
            left: {
              title: "坐标X",
              type: "number",
              options: { placeholder: "请输入X轴坐标" }
            },
            top: {
              title: "坐标Y",
              type: "number",
              options: { placeholder: "请输入Y轴坐标" }
            },
            background: { title: "背景颜色", component: "color" },
            isLock: {
              title: "锁定图层",
              type: "boolean",
              options: {
                checkedChildren: "开启",
                unCheckedChildren: "关闭"
              }
            },
            isHidden: {
              title: "隐藏图层",
              type: "boolean",
              options: {
                checkedChildren: "开启",
                unCheckedChildren: "关闭"
              }
            }
          }
        }
      }
    ]
  },
  {
    materials: "border7",
    fields: [
      {
        name: "基础",
        key: "base",
        schema: {
          type: "object",
          properties: {
            title: {
              title: "图层名称",
              type: "string",
              options: { allowClear: true, placeholder: "请输入标题" }
            },
            width: { title: "宽度", type: "number", options: { placeholder: "请输入宽度" } },
            height: { title: "高度", type: "number", options: { placeholder: "请输入高度" } },
            left: {
              title: "坐标X",
              type: "number",
              options: { placeholder: "请输入X轴坐标" }
            },
            top: {
              title: "坐标Y",
              type: "number",
              options: { placeholder: "请输入Y轴坐标" }
            },
            background: { title: "背景颜色", component: "color" },
            isLock: {
              title: "锁定图层",
              type: "boolean",
              options: {
                checkedChildren: "开启",
                unCheckedChildren: "关闭"
              }
            },
            isHidden: {
              title: "隐藏图层",
              type: "boolean",
              options: {
                checkedChildren: "开启",
                unCheckedChildren: "关闭"
              }
            }
          }
        }
      }
    ]
  },
  {
    materials: "border8",
    fields: [
      {
        name: "基础",
        key: "base",
        schema: {
          type: "object",
          properties: {
            title: {
              title: "图层名称",
              type: "string",
              options: { allowClear: true, placeholder: "请输入标题" }
            },
            width: { title: "宽度", type: "number", options: { placeholder: "请输入宽度" } },
            height: { title: "高度", type: "number", options: { placeholder: "请输入高度" } },
            left: {
              title: "坐标X",
              type: "number",
              options: { placeholder: "请输入X轴坐标" }
            },
            top: {
              title: "坐标Y",
              type: "number",
              options: { placeholder: "请输入Y轴坐标" }
            },
            background: { title: "背景颜色", component: "color" },
            isLock: {
              title: "锁定图层",
              type: "boolean",
              options: {
                checkedChildren: "开启",
                unCheckedChildren: "关闭"
              }
            },
            isHidden: {
              title: "隐藏图层",
              type: "boolean",
              options: {
                checkedChildren: "开启",
                unCheckedChildren: "关闭"
              }
            }
          }
        }
      }
    ]
  },
  {
    materials: "border9",
    fields: [
      {
        name: "基础",
        key: "base",
        schema: {
          type: "object",
          properties: {
            title: {
              title: "图层名称",
              type: "string",
              options: { allowClear: true, placeholder: "请输入标题" }
            },
            width: { title: "宽度", type: "number", options: { placeholder: "请输入宽度" } },
            height: { title: "高度", type: "number", options: { placeholder: "请输入高度" } },
            left: {
              title: "坐标X",
              type: "number",
              options: { placeholder: "请输入X轴坐标" }
            },
            top: {
              title: "坐标Y",
              type: "number",
              options: { placeholder: "请输入Y轴坐标" }
            },
            background: { title: "背景颜色", component: "color" },
            isLock: {
              title: "锁定图层",
              type: "boolean",
              options: {
                checkedChildren: "开启",
                unCheckedChildren: "关闭"
              }
            },
            isHidden: {
              title: "隐藏图层",
              type: "boolean",
              options: {
                checkedChildren: "开启",
                unCheckedChildren: "关闭"
              }
            }
          }
        }
      }
    ]
  }
];
