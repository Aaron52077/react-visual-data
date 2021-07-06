import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { IFrameSimple } from "~components";

const IframeTpl = ({ value, mode, location }) => {
  const { data } = value.dataConfig;
  if (!data) return "请输入iframe的地址";

  if (mode === "development") {
    return (
      <div className="gc-iframe__container">
        <IFrameSimple src={data?.src} />
        {!location.pathname.includes("/preview/") ? <div className="gc-iframe__mask"></div> : null}
      </div>
    );
  }

  return <IFrameSimple src={data?.src} mode={mode} />;
};

export default connect((state) => ({
  mode: state.component.mode
}))(withRouter(IframeTpl));
