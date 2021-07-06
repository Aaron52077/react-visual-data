import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Vcharts } from "~components";
import getOption from "../options/pie";
import { isEmpty } from "~utils/helper";

const GeneratorPie = ({ value, options }) => {
  if (isEmpty(value.dataConfig.data)) return null;
  const { dataConfig, isRefresh } = value;

  let currentOption = getOption(options, dataConfig.data);

  return (
    <Vcharts
      refresh={isRefresh}
      options={currentOption.options}
      onChartReady={(echart) => {
        currentOption.callback && currentOption.callback(echart);
      }}
      theme="dark"
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default connect((state) => ({
  mode: state.component.mode,
  dependencies: state.component.dependencies
}))(GeneratorPie);
