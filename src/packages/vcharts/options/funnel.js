import { DEFAULT_COLORS } from "~packages/constants";

export default (option, data) => {
  const { series = [] } = data;
  const { sortType = "descending", funnelWidth = "100%", unit = "" } = option;

  return {
    color: DEFAULT_COLORS,
    tooltip: {
      trigger: "item",
      formatter: function (params) {
        return [params.marker + params.name + " " + (params.value || 0) + unit + "(" + params.percent + "%" + ")"].join(
          ""
        );
      }
    },
    series: [
      {
        type: "funnel",
        x: 0,
        y: 60,
        y2: 60,
        top: 15,
        bottom: 20,
        width: "100%",
        min: 0,
        max: 100,
        minSize: "0%",
        maxSize: funnelWidth,
        sort: sortType,
        gap: 0,
        data: series,
        roseType: true,
        label: {
          normal: {
            formatter: function (params) {
              return params.name + ": " + params.value;
            },
            position: "center"
          }
        }
      }
    ]
  };
};
