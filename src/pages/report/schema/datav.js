import { BASE_CONF } from "./default.js";

export default [
  {
    materials: "decoration",
    fields: [
      {
        name: "基础",
        key: "base",
        schema: {
          type: "object",
          properties: { ...BASE_CONF }
        }
      }
    ]
  }
];
