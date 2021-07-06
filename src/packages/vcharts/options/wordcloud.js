export default function getOptions(option, data) {
  const { series = [] } = data;
  const { minFontSize, maxFontSize, rotationStep, gridSize, shape, unit = "" } = option;

  return {
    tooltip: {
      formatter: function (params) {
        return [params.marker + params.data.name + "：" + (params.data.value || 0) + unit].join("");
      }
    },
    series: [
      {
        type: "wordCloud",
        gridSize: gridSize,
        shape: shape,
        sizeRange: [minFontSize, maxFontSize],
        rotationRange: [-45, 90],
        rotationStep: rotationStep ? 45 : 180,
        textRotation: [0, 45, 90, -45],
        left: "center",
        top: "center",
        right: null,
        bottom: null,
        width: "90%",
        height: "80%",
        drawOutOfBound: false,
        textStyle: {
          normal: {
            color: function () {
              return (
                "rgb(" +
                [
                  Math.round(Math.random() * 200 + 55),
                  Math.round(Math.random() * 200 + 55),
                  Math.round(Math.random() * 200 + 55)
                ].join(",") +
                ")"
              );
            }
          },
          emphasis: {
            shadowBlur: 10,
            shadowColor: "#2ac"
          }
        },
        data: series
      }
    ]
  };
}
