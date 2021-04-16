import React, { useMemo } from "react";

import { Statistic } from "antd";
import { IconFont } from "~components";

/**
 * 方向
 * @param {*} horizontal 水平
 * @param {*} vertical 垂直
 */
const direction = {
  horizontal: "row",
  vertical: "column"
};

/**
 * 趋势
 * @param {*} up 上升
 * @param {*} down 下降
 */
const trend = {
  up: "#3f8600",
  down: "#cf1322"
};

/**
 * 前缀模版组件
 * @param {*} style 样式
 * @param {*} text 文本内容
 * @param {*} arrow 是否显示正负极
 * @param {*} value 数值
 */
const PrefixTpl = ({ style, text, arrow, tendency }) => {
  const { fontSize = 16, fontFamily = "Microsoft Yahei", color = "", marginRight = 0 } = style;

  const PrefixIconConf = () => {
    return (
      <IconFont
        type={tendency === "down" ? "MinusOutlined" : "PlusOutlined"}
        antd={true}
        style={{ color: color, marginLeft: 5 }}
      />
    );
  };

  return (
    <span
      style={{
        fontSize,
        fontFamily,
        color,
        marginRight
      }}
    >
      {text}
      {arrow ? <PrefixIconConf /> : null}
    </span>
  );
};

/**
 * 后缀
 */
const SuffixTpl = ({ style, text, tendency }) => {
  const { fontSize = 16, fontFamily = "Microsoft Yahei", color = "", marginLeft = 0 } = style;

  const SuffixIconConf = () => {
    return (
      <IconFont
        type={tendency === "down" ? "ArrowDownOutlined" : "ArrowUpOutlined"}
        antd={true}
        style={{ color: color, marginLeft: 5 }}
      />
    );
  };

  return (
    <span
      style={{
        fontSize,
        fontFamily,
        color,
        marginLeft
      }}
    >
      {text}
      <SuffixIconConf />
    </span>
  );
};

const VDigitalFlop = ({ options, schema }) => {
  const {
    distributed = "horizontal",
    horizontalAlign,
    fontWeight,
    fontFamily = "Microsoft Yahei",
    fontSize = 16,
    numberColor = "",
    precision = 0,
    divide = true,
    forceShowPlus = true,
    prefix = "",
    prefixFontSize,
    prefixFontFamily,
    prefixMargin,
    prefixColor,
    suffix = "",
    suffixFontSize,
    suffixFontFamily,
    suffixMargin,
    suffixColor,
    tendency = "up"
  } = options;
  const { data } = schema;

  let option = useMemo(() => {
    return {
      precision,
      groupSeparator: divide ? "," : "",
      valueStyle: {
        display: "flex",
        alignItems: "center",
        flexDirection: direction[distributed],
        fontFamily,
        fontSize,
        color: numberColor || trend[tendency],
        fontWeight
      },
      value: data.value
    };
  }, [options]);

  return (
    <div
      className="gc-flex"
      style={{
        justifyContent: horizontalAlign
      }}
    >
      <Statistic
        {...option}
        prefix={
          <PrefixTpl
            style={{
              fontSize: prefixFontSize,
              fontFamily: prefixFontFamily,
              marginRight: prefixMargin,
              color: prefixColor
            }}
            text={prefix}
            arrow={forceShowPlus}
            tendency={tendency}
          />
        }
        suffix={
          <SuffixTpl
            style={{
              fontSize: suffixFontSize,
              fontFamily: suffixFontFamily,
              marginLeft: suffixMargin,
              color: suffixColor
            }}
            text={suffix}
            tendency={tendency}
          />
        }
      />
    </div>
  );
};

export default VDigitalFlop;
