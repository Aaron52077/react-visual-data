import BAR_SCHEMA from "./bar";
import LINE_SCHEMA from "./line";
import PIE_SCHEMA from "./pie";
import MAP_SCHEMA from "./map";
import DATAV_SCHEMA from "./datav";
import OTHER_SCHEMA from "./other";

// if you should all configs.
export const subToSchema = [BAR_SCHEMA, LINE_SCHEMA, PIE_SCHEMA, MAP_SCHEMA, OTHER_SCHEMA, DATAV_SCHEMA].flat(1);
