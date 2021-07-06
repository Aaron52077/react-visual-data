import barOpt from "./bar";
import lineOpt from "./line";
import pieOpt from "./pie";
import mapOpt from "./map";
import mapcityOpt from "./mapcity";

/**
 * 组件类型和配置项类型统一管理
 */
export default {
  bar: barOpt,
  "bar-crosswise": barOpt,
  "bar-series": barOpt,
  "bar-heap": barOpt,
  "bar-contrast": barOpt,
  "bar-bothway": barOpt,
  "bar-alien": barOpt,
  line: lineOpt,
  "step-line": lineOpt,
  "line-middle": lineOpt,
  "line-bar": lineOpt,
  pie: pieOpt,
  "pie-nested": pieOpt,
  "pie-rose": pieOpt,
  "pie-double": pieOpt,
  "pie-play": pieOpt,
  "china-map": mapOpt,
  "map-city": mapcityOpt
};
