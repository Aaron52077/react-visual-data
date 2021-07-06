import { cloneDeep } from "~utils";
import { isEmpty } from "~utils/helper";
import { isFunction } from "./utils";

// 获取当前字段默认值
function getDefaultValue(schema) {
  const { default: def, enum: enums = [], type } = schema;
  const defaultValue = {
    array: [],
    boolean: false,
    integer: "",
    null: null,
    number: "",
    object: {},
    string: "",
    range: null
  };

  if (isFunction(def)) {
    return defaultValue[type];
  }
  if (isFunction(enums)) {
    if (type === "array") {
      return [];
    }
    if (type === "string" || type === "number") {
      return "";
    }
  }

  // 如果设置默认值，优先从默认值中获取
  if (!isEmpty(def)) {
    return def;
  }
  // array且enum的情况，为多选框，默认值[]
  if (type === "array" && enums.length) {
    return [];
  }
  if ("default" in schema || schema.hasOwnProperty("default")) {
    return schema.default; // 就算default: undefined, 也用 undefined, 这样就可以清空了
  }
  return defaultValue[type];
}

function schemaResolve(schema, data) {
  const { type, properties, items, default: def, required = false, component } = schema;

  const value = isEmpty(data) ? getDefaultValue(schema) : cloneDeep(data);

  if (type === "object") {
    // 如果自定义组件
    if (component) {
      return def ? def : value;
    }

    const subs = properties || {};
    let ret = {};

    if (!isEmpty(subs)) {
      Object.keys(subs).forEach((name) => {
        if (!required) {
          ret[name] = schemaResolve(subs[name], value[name]);
        }
      });
    }

    return ret;
  }

  if (type === "array") {
    // 如果没有value且default有值，用default
    if (def && Array.isArray(def) && !value) {
      return def;
    }
    // 如果自定义组件
    if (component) return value;

    const subs = [].concat(items || []);
    let ret = [];

    if (!isEmpty(value)) {
      value.forEach((item, idx) => {
        ret[idx] = schemaResolve(subs[idx] || subs[0], item);
      });
    }

    return ret;
  }
  return value;
}

export default schemaResolve;
