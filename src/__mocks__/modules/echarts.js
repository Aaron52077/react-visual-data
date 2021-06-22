import { resultSuccess } from "../_util";

export default [
  {
    url: "/echart/bar",
    timeout: 200,
    method: "get",
    response: () => {
      return resultSuccess({
        categories: ["苹果", "三星", "华为", "oppo", "vivo", "小米"],
        series: [
          {
            name: "旺季",
            "data|7": ["@integer(10000, 25000)"]
          }
        ],
        unit: "台"
      });
    }
  }
];
