import echarts from "echarts";
import VEchartsCore from "./core";
import { DarkTheme } from "./theme";

// register theme object
echarts.registerTheme("dark", DarkTheme);

// export the Component the echarts Object.
export default class VEcharts extends VEchartsCore {
  constructor(props) {
    super(props);
    this.echartsLib = echarts;
  }
}
