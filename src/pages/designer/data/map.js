import { BASE_CONF, BASE_DATA_CONF } from "./default.js";

export default [
  {
    name: "中国地图",
    icon: "china-map",
    type: "china-map",
    data: {
      title: "中国地图",
      ...BASE_CONF,
      config: {
        unit: "",
        provinces: "china",
        showAreaName: true,
        scaleMap: true,
        labelTextColor: "#666",
        areaColor: "#323c48",
        borderColor: "#999",
        customColors: []
      },
      dataConfig: {
        ...BASE_DATA_CONF,
        data: {
          series: [
            {
              name: "南海诸岛",
              value: 0
            },
            {
              name: "北京",
              value: 20
            },
            {
              name: "天津",
              value: 30
            },
            {
              name: "上海",
              value: 229
            },
            {
              name: "重庆",
              value: 59
            },
            {
              name: "河北",
              value: 190
            },
            {
              name: "河南",
              value: 300
            },
            {
              name: "云南",
              value: 20
            },
            {
              name: "辽宁",
              value: 40
            },
            {
              name: "黑龙江",
              value: 37
            },
            {
              name: "湖南",
              value: 180
            },
            {
              name: "安徽",
              value: 0
            },
            {
              name: "山东",
              value: 67
            },
            {
              name: "新疆",
              value: 10
            },
            {
              name: "江苏",
              value: 0
            },
            {
              name: "浙江",
              value: 0
            },
            {
              name: "江西",
              value: 0
            },
            {
              name: "湖北",
              value: 0
            },
            {
              name: "广西",
              value: 0
            },
            {
              name: "甘肃",
              value: 0
            },
            {
              name: "山西",
              value: 0
            },
            {
              name: "内蒙古",
              value: 89
            },
            {
              name: "陕西",
              value: 0
            },
            {
              name: "吉林",
              value: 0
            },
            {
              name: "福建",
              value: 66
            },
            {
              name: "贵州",
              value: 0
            },
            {
              name: "广东",
              value: 330
            },
            {
              name: "青海",
              value: 0
            },
            {
              name: "西藏",
              value: 74
            },
            {
              name: "四川",
              value: 601
            },
            {
              name: "宁夏",
              value: 0
            },
            {
              name: "海南",
              value: 45
            },
            {
              name: "台湾",
              value: 23
            },
            {
              name: "香港",
              value: 0
            },
            {
              name: "澳门",
              value: 0
            }
          ]
        }
      }
    }
  },
  {
    name: "区域地图",
    icon: "map-province",
    type: "map-city",
    data: {
      title: "区域地图",
      ...BASE_CONF,
      config: {
        unit: "",
        provinces: "sichuan",
        showAreaName: true,
        scaleMap: true,
        labelTextColor: "#000000",
        areaColor: "#5ab1ef",
        borderColor: "#ffffff"
      },
      dataConfig: {
        ...BASE_DATA_CONF,
        data: {
          series: [
            {
              name: "成都市",
              value: 300
            },
            {
              name: "自贡市",
              value: 10
            },
            {
              name: "攀枝花市",
              value: 10
            },
            {
              name: "泸州市",
              value: 30
            },
            {
              name: "绵阳市",
              value: 10
            },
            {
              name: "雅安市",
              value: 2
            },
            {
              name: "巴中市",
              value: 100
            },
            {
              name: "广安市",
              value: 60
            }
          ]
        }
      }
    }
  }
];
