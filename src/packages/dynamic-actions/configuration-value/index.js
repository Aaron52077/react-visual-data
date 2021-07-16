import BAR_CONF from "./bar";
import LINE_CONF from "./line";
import PIE_CONF from "./pie";
import MAP_CONF from "./map";
import DATAV_CONF from "./datav";

// if you should all configs.
export const componentMarket = [BAR_CONF, LINE_CONF, PIE_CONF, MAP_CONF, DATAV_CONF].flat(1);

export default {
  bar: BAR_CONF,
  line: LINE_CONF,
  pie: PIE_CONF,
  map: MAP_CONF,
  datav: DATAV_CONF
};
