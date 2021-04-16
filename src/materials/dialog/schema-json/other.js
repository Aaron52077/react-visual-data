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
        key: "setting",
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
              type: "boolean",
              component: "switch"
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
