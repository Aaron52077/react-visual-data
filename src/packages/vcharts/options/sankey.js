import { DEFAULT_COLORS } from "~packages/constants";

export default (option, data) => {
  const { series } = data;
  const { sortType, textColor = "#19d4ae", textSize = 14, curveness, unit = "" } = option;

  return {
    color: DEFAULT_COLORS,
    tooltip: {
      trigger: "item",
      formatter: function (params) {
        if (params.data.name) {
          return [params.marker + "节点：" + params.data.name + "(" + (params.data.value || 0) + unit + ")"].join("");
        } else {
          return [params.data.source + " vs " + params.data.target + "(" + (params.data.value || 0) + unit + ")"].join(
            ""
          );
        }
      }
    },
    series: [
      {
        type: "sankey",
        bottom: "10%",
        data: series.data,
        links: series.links,
        orient: sortType,
        label: {
          color: textColor,
          fontSize: textSize
        },
        lineStyle: {
          color: "source",
          curveness: curveness * 0.1
        }
      }
    ]
  };
};
