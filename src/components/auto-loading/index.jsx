import React from "react";
import { Spin } from "antd";
import "./style.less";

function AutoLoading(props) {
  return (
    <div className="loading-container">
      <Spin size="large" {...props} />
    </div>
  );
}

export default AutoLoading;
