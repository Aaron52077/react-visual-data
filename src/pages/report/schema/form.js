import { FORM_FIELD_CONF } from "./default.js";

export default [
  {
    materials: "date",
    fields: [
      {
        name: "基础",
        key: "base",
        schema: {
          type: "object",
          properties: {
            ...FORM_FIELD_CONF,
            defaultVal: {
              title: "默认值",
              component: "radio",
              displayType: "column",
              enum: ["", "yesterday", "beforeYesterday", "today", "custom"],
              enumNames: ["无", "昨天", "前天", "今天", "自定义"],
              default: ""
            },
            range: {
              title: "日期可选范围",
              component: "radio",
              displayType: "column",
              enum: ["", "halfMonth", "month", "threeMonth", "custom"],
              enumNames: ["无限制", "近半月", "近一月", "近三月", "自定义"],
              default: ""
            }
          }
        }
      },
      {
        name: "高级",
        key: "options",
        schema: {
          type: "object",
          properties: {}
        }
      }
    ]
  }
];
