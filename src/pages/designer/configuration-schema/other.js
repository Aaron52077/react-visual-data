import { BASE_CONF } from "./default.js";

export default [
  {
    materials: "wordCloud",
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
            unit: {
              title: "单位",
              type: "string",
              options: {
                allowClear: true
              }
            },
            shape: {
              title: "图表形状",
              type: "string",
              enum: ["circle", "cardioid", "diamond", "triangle-forward", "triangle", "star"],
              enumNames: ["圆形", "心形", "菱形", "正三角", "倒三角", "五角星"]
            },
            minFontSize: {
              title: "最小字体",
              type: "number",
              component: "number",
              min: 12,
              max: 80
            },
            maxFontSize: {
              title: "最大字体",
              type: "number",
              component: "number",
              min: 12,
              max: 80
            },
            gridSize: {
              title: "字符间距",
              type: "number",
              component: "slider",
              min: 1,
              max: 25,
              options: {
                hideNumber: true
              }
            },
            rotationStep: {
              title: "允许文字旋转",
              type: "boolean"
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
