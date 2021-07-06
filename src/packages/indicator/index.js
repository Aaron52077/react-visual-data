import React, { useMemo } from "react";
import { Statistic, Row, Col } from "antd";

/**
 * 标题自定义
 * @param {name} 标题
 * @param {style} 样式
 */
const TitleName = ({ name, style }) => {
  const { fontSize = 16, fontFamily = "Microsoft Yahei", color = "" } = style;

  return (
    <span
      style={{
        fontSize,
        fontFamily,
        color
      }}
    >
      {name}
    </span>
  );
};

const VIndicator = ({ options, schema }) => {
  const {
    columns = 0,
    cardPadding = 10,
    cardRadius = 10,
    subFontSize = 14,
    prefix = "",
    suffix = "",
    fontFamily = "Microsoft Yahei",
    fontSize = 16,
    color = "",
    subColor = "",
    precision = 0,
    cardBackground
  } = options;
  const { data } = schema;

  let option = useMemo(() => {
    return {
      prefix,
      suffix,
      precision,
      valueStyle: { fontFamily, fontSize, color }
    };
  }, [options]);

  const colCount = columns > 0 && columns <= data.data.length ? columns : data.data.length;

  return (
    <Row gutter={[cardPadding, cardPadding]}>
      {data.data.map((m, i) => {
        return (
          <Col key={i.toString()} span={24 / colCount}>
            <div
              style={{
                padding: "0 5px",
                borderRadius: cardRadius,
                background: cardBackground
              }}
            >
              <Statistic
                title={
                  <TitleName
                    name={m.name}
                    style={{
                      fontSize: subFontSize,
                      color: subColor
                    }}
                  />
                }
                value={m.value}
                {...option}
              />
            </div>
          </Col>
        );
      })}
    </Row>
  );
};

export default VIndicator;
