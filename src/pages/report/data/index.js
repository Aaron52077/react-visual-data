import FORM_CONF from "./form";
import BAR_CONF from "./bar";
import LINE_CONF from "./line";
import PIE_CONF from "./pie";
import MAP_CONF from "./map";
import BORDER_CONF from "./border";
import { FORM_CONTAINER_CONF } from "./default";

export default {
  query: FORM_CONF,
  bar: BAR_CONF,
  line: LINE_CONF,
  pie: PIE_CONF,
  map: MAP_CONF,
  border: BORDER_CONF,
  // if you should all configs.
  total: [FORM_CONTAINER_CONF, FORM_CONF, BAR_CONF, LINE_CONF, PIE_CONF, BORDER_CONF].flat(1)
};
