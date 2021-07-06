import React, { useState } from "react";
import { Vcharts } from "~components";
import "echarts-gl";
import getOption from "../options/line3D";

const GeneratorLine3D = ({ uniqueId, value, options, onChange }) => {
  //   if (isEmpty(value?.dataConfig?.data)) return null;
  const [stauts, setStauts] = useState(false);

  return <Vcharts refresh={false} options={getOption()} theme="dark" />;
};

export default GeneratorLine3D;
