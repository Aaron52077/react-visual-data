import React from "react";
import { createFromIconfontCN } from "@ant-design/icons";

const Iconfont = (props) => {
  const { antd = false, type, ...rest } = props;
  const IconFonts = createFromIconfontCN({
    scriptUrl: ["//at.alicdn.com/t/font_908589_jybcb6d47pq.js"]
  });
  if (antd) {
    const Icons = require("@ant-design/icons")[type];
    return <Icons type={type} {...rest} />;
  } else {
    return <IconFonts type={type} {...rest} />;
  }
};

export default Iconfont;
