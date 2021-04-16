import BAR_SCHEMA from "./bar";
import LINE_SCHEMA from "./line";
import MAP_SCHEMA from "./map";
import OTHER_SCHEMA from "./other";

// if you should all configs.
const subToSchema = [BAR_SCHEMA, LINE_SCHEMA, MAP_SCHEMA, OTHER_SCHEMA].flat(1);
export default subToSchema;
