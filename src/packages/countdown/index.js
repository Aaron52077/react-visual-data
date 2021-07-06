import React, { useMemo } from "react";
import { Statistic } from "antd";

const { Countdown } = Statistic;
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Moment is also OK

export default ({ options, schema }) => {
  const {
    prefix = "",
    suffix = "",
    name = "",
    fontFamily = "Microsoft Yahei",
    fontSize = 16,
    color = "",
    precision = 0,
    format = "HH:mm:ss"
  } = options;
  const { data } = schema;

  let option = useMemo(() => {
    return {
      title: name,
      prefix,
      suffix,
      precision,
      format,
      valueStyle: { fontFamily, fontSize, color },
      value: data.value || deadline
    };
  }, [options]);

  return <Countdown {...option} />;
};
