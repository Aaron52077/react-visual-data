import { DEFAULT_COLORS } from "~packages/constants";

export default (option, data) => {
  const { series } = data;
  const {
    sortType = "pie",
    isRoseType = false,
    legendDirection = "horizontal",
    innerFontColor = "#FFFFFF",
    outerFontColor = "#bcc9d4",
    innerFontSize = 10,
    outerFontSize = 10,
    showLegend = true,
    showLabel = true,
    isCirclePie = false,
    labelLineWidth = 1,
    labelLineLength = 20,
    labelLineLength2 = 30,
    swiperTimer = 3,
    unit = ""
  } = option;

  let options, callback, recordTimeInterval;
  // 默认配置项
  if (sortType === "pie") {
    options = {
      color: DEFAULT_COLORS,
      grid: {
        left: 15,
        right: 20,
        bottom: 30,
        containLabel: true
      },
      tooltip: {
        trigger: "item",
        formatter: function (params) {
          return [params.marker + params.name + "：" + (params.value || 0) + unit].join("");
        }
      },
      legend: {
        show: showLegend,
        type: "scroll",
        top: 0,
        orient: legendDirection,
        textStyle: {
          fontSize: 12
        },
        data: series.map((item) => item.name)
      },
      series: [
        {
          type: "pie",
          radius: isCirclePie ? ["40%", "55%"] : ["0%", "55%"],
          roseType: isRoseType === true ? "radius" : undefined,
          center: ["50%", "50%"],
          clockwise: true,
          avoidLabelOverlap: true,
          hoverOffset: 15,
          itemStyle: {
            normal: {}
          },
          label: {
            show: showLabel,
            position: "outside",
            formatter: "{a|{b}：{d}%}\n{hr|}",
            rich: {
              hr: {
                borderRadius: 3,
                width: 3,
                height: 3,
                padding: [3, 3, 0, -12]
              },
              a: {
                padding: [-30, 15, -20, 15]
              }
            }
          },
          labelLine: {
            normal: {
              show: showLabel,
              length: labelLineLength,
              length2: labelLineLength2,
              lineStyle: {
                width: labelLineWidth
              }
            }
          },
          data: series.map((item) => {
            return {
              name: item.name,
              value: item.data
            };
          })
        }
      ]
    };
  }

  if (sortType === "nestPie") {
    let legend1 = series.inner.map((v) => v.name);
    let legend2 = series.outer.map((v) => v.name);

    options = {
      color: DEFAULT_COLORS,
      grid: {
        left: 15,
        right: 20,
        bottom: 30,
        containLabel: true
      },
      tooltip: {
        trigger: "item",
        formatter: function (params) {
          return [params.marker + params.name + "：" + (params.value || 0) + unit].join("");
        }
      },
      legend: {
        show: showLegend,
        type: "scroll",
        top: 0,
        orient: legendDirection,
        textStyle: {
          fontSize: 12
        },
        data: [...legend1, ...legend2]
      },
      series: [
        {
          type: "pie",
          radius: [0, "35%"],
          itemStyle: {
            normal: {
              borderColor: "#fff",
              borderWidth: 2,
              innerFontColor
            }
          },
          label: {
            normal: {
              show: showLabel,
              color: innerFontColor,
              position: "inner",
              fontSize: innerFontSize
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: series.inner
        },
        {
          name: "",
          type: "pie",
          radius: ["45%", "55%"],
          data: series.outer,
          labelLine: {
            normal: {
              show: showLabel,
              length: labelLineLength,
              length2: labelLineLength2,
              lineStyle: {
                width: labelLineWidth
              }
            }
          },
          label: {
            normal: {
              show: showLabel,
              formatter: (params) => {
                return (
                  "{icon|●}{name|" +
                  params.name +
                  "}{percent|" +
                  params.percent.toFixed(1) +
                  "%}{value|" +
                  params.value +
                  "}"
                );
              },
              padding: [0, -130, 25, -130],
              rich: {
                color: outerFontColor,
                icon: {
                  fontSize: outerFontSize
                },
                name: {
                  fontSize: outerFontSize,
                  padding: [0, 5, 0, 5],
                  color: outerFontColor
                },
                percent: {
                  color: outerFontColor,
                  padding: [0, 5, 0, 0]
                },
                value: {
                  fontSize: outerFontSize,
                  fontWeight: "bold",
                  color: outerFontColor
                }
              }
            }
          }
        }
      ]
    };
  }

  if (sortType === "swiperPie") {
    options = {
      color: DEFAULT_COLORS,
      grid: {
        left: 15,
        right: 20,
        bottom: 30,
        containLabel: true
      },
      tooltip: {
        trigger: "item",
        formatter: function (params) {
          return [params.marker + (params.value || 0) + unit].join("");
        }
      },
      legend: {
        show: showLegend,
        type: "scroll",
        top: 0,
        orient: legendDirection,
        textStyle: {
          fontSize: 12
        }
      },
      dataset: {
        source: series
      },
      series: [
        {
          type: "pie",
          radius: ["55%", "75%"],
          center: ["50%", "50%"],
          seriesLayoutBy: "row",
          label: {
            show: showLabel,
            formatter: "{d}%"
          },
          labelLine: {
            normal: {
              show: showLabel,
              length: labelLineLength,
              length2: labelLineLength2,
              lineStyle: {
                width: labelLineWidth
              }
            }
          }
        },
        {
          type: "pie",
          avoidLabelOverlap: false,
          label: {
            show: false,
            formatter: "{b} \n {d}",
            position: "center",
            rich: {
              d: {
                fontSize: 14,
                fontColor: "#fffffff",
                fontWeight: "normal"
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 24,
              fontWeight: "bold"
            }
          },
          seriesLayoutBy: "row",
          radius: isCirclePie ? ["55%", "75%"] : ["0%", "50%"],
          center: ["50%", "50%"]
        }
      ]
    };

    let timer = 0;
    let dot = options.dataset.source[1];

    callback = (echart) => {
      clearInterval(recordTimeInterval);
      recordTimeInterval = setInterval(() => {
        echart.dispatchAction({
          type: "downplay",
          seriesIndex: 1,
          dataIndex: timer % dot.length
        });

        timer++;

        echart.dispatchAction({
          type: "highlight",
          seriesIndex: 1,
          dataIndex: timer % dot.length
        });
      }, swiperTimer * 1000);
    };
  }

  return {
    options,
    callback
  };
};
