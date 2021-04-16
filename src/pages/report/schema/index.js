import BAR_SCHEMA from "./bar";
import LINE_SCHEMA from "./line";
import PIE_SCHEMA from "./pie";
import DATAV_SCHEMA from "./datav";
import FORM_SCHEMA from "./form";
import { FORM_CONTAINER_SCHEMA } from "./default";

// if you should all configs.
export const allToSchema = {
  component: [BAR_SCHEMA, LINE_SCHEMA, PIE_SCHEMA, DATAV_SCHEMA, FORM_CONTAINER_SCHEMA].flat(1),
  form: FORM_SCHEMA
};

export { default as pageSchema } from "./page";
