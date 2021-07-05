export default [
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
