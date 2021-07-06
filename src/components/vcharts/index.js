import echarts from "echarts";
import VEchartsCore from "./core";
import "~packages/vcharts/theme";

// export the Component the echarts Object.
export default class VEcharts extends VEchartsCore {
  constructor(props) {
    super(props);
    this.echartsLib = echarts;
  }
}
