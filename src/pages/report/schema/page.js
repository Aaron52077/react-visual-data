export default {
  type: "object",
  properties: {
    page: {
      type: "object",
      title: "控制面板",
      description: "报表页面整体配置(报表的删除、目录结构调整等，请在管理中心的『报表管理』中进行！)",
      displayType: "column",
      properties: {
        name: {
          title: "报表名称",
          type: "string",
          displayType: "row",
          options: { allowClear: true, placeholder: "请输入名称" }
        },
        remark: {
          title: "报表简介",
          type: "string",
          format: "textarea",
          displayType: "row",
          options: { placeholder: "请输入简介" }
        },
        backgroundMode: {
          title: "背景设置",
          component: "radio",
          displayType: "row",
          enum: ["define", "custom", "none"],
          enumNames: ["内置背景", "自定义背景", "只使用背景色"]
        },
        backgroundColor: {
          title: "背景颜色(背景图片透明时可见)",
          component: "color",
          hidden: "{{rootValue.backgroundMode !== 'none'}}"
        },
        backgroundImage: {
          title: "背景图",
          type: "upload",
          format: "string",
          action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
          hidden: "{{rootValue.backgroundMode !== 'custom'}}",
          options: {
            listType: "picture-card",
            accept: ".bmp,.jpg,.png,.gif,.svg,.webp"
          }
        },
        backgroundDefine: {
          title: "内置图片",
          displayType: "row",
          component: "background",
          hidden: "{{rootValue.backgroundMode !== 'define'}}"
        },
        backgroundBlur: {
          title: "背景图片模糊度",
          component: "slider",
          min: 0,
          max: 20,
          options: {
            hideNumber: true
          }
        },
        backgroundOpacity: {
          title: "背景图片透明度",
          component: "slider",
          min: 0,
          max: 10,
          options: {
            hideNumber: true
          }
        }
      }
    }
  }
};
