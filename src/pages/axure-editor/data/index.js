import BAR_CONF from "./bar";
import LINE_CONF from "./line";
import PIE_CONF from "./pie";
import MAP_CONF from "./map";
import DATAV_CONF from "./datav";
import OTHER_CONF from "./other";

// if you should all configs.
const condition = [BAR_CONF, LINE_CONF, PIE_CONF, MAP_CONF, OTHER_CONF, DATAV_CONF].flat(1);

export default {
  bar: BAR_CONF,
  line: LINE_CONF,
  pie: PIE_CONF,
  map: MAP_CONF,
  datav: DATAV_CONF,
  other: OTHER_CONF,
  collection: condition
};
