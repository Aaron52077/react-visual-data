import { BASE_CONF, BASE_DATA_CONF } from "./default.js";

export default [
  {
    name: "词云图",
    icon: "word-cloud",
    type: "wordCloud",
    data: {
      title: "词云图",
      ...BASE_CONF,
      config: {
        unit: "",
        backgroundColor: "#E3F7FF",
        fontPadding: 8,
        fontRotate: true,
        minFontSize: 12,
        maxFontSize: 35,
        shape: "circle",
        gridSize: 5,
        rotationStep: true
      },
      dataConfig: {
        ...BASE_DATA_CONF,
        data: {
          series: [
            { name: "龙头镇", value: "111" },
            { name: "大埔镇", value: "222" },
            { name: "太平镇", value: "458" },
            { name: "沙埔镇", value: "445" },
            { name: "东泉镇", value: "456" },
            { name: "凤山镇", value: "647" },
            { name: "六塘镇", value: "189" },
            { name: "冲脉镇", value: "864" },
            { name: "寨隆镇", value: "652" }
          ]
        }
      }
    }
  }
];
