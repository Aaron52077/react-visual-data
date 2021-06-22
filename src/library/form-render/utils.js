import { isEmpty } from "~utils/helper";

export function getFormat(format) {
  let dateFormat;
  switch (format) {
    case "date":
      dateFormat = "YYYY-MM-DD";
      break;
    case "time":
      dateFormat = "HH:mm:ss";
      break;
    case "dateTime":
      dateFormat = "YYYY-MM-DD HH:mm:ss";
      break;
    case "year":
      dateFormat = "YYYY";
      break;
    case "quarter":
      dateFormat = "YYYY-[Q]Q";
      break;
    case "month":
      dateFormat = "YYYY-MM";
      break;
    case "week":
      dateFormat = "YYYY-W[*]";
      break;
    default:
      dateFormat = "YYYY-MM-DD";
      if (format && typeof format === "string") {
        dateFormat = format;
      }
  }
  return dateFormat;
}

// 获得propsSchema的children
function getChildren(schema) {
  if (!schema) return [];
  const {
    // object
    properties,
    // array
    items,
    type
  } = schema;
  if (!properties && !items) {
    return [];
  }
  let schemaSubs = {};
  if (type === "object") {
    schemaSubs = properties;
  }
  if (type === "array") {
    schemaSubs = items;
  }
  return Object.keys(schemaSubs).map((name) => ({
    schema: schemaSubs[name],
    name
  }));
}

// 整合配置Schema
export function combineSchema(propsSchema = {}) {
  const propList = getChildren(propsSchema);
  const newList = propList.map((p) => {
    const { type, enum: options, properties, items } = p.schema;
    const isObj = type === "object" && properties;
    const isArr = type === "array" && items && !options; // enum + array 代表的多选框，没有sub
    // 如果是list，递归合并items
    if (isArr) {
      const newItems = combineSchema(items);
      return { ...p, schema: { ...p.schema, items: newItems } };
    }
    // object递归合并整个schema
    if (isObj) {
      const newSchema = combineSchema(p.schema);
      return { ...p, schema: newSchema };
    }
    return { ...p, schema: { ...p.schema } };
  });

  const newObj = {};
  newList.forEach((s) => {
    newObj[s.name] = s.schema;
  });

  if (isEmpty(newObj)) {
    return { ...propsSchema };
  }
  return { ...propsSchema, properties: newObj };
}

// 解析函数字符串值
const isValidVariableName = (param) => /^[a-zA-Z]+$/g.test(param);

// Remove all window valid api
// For safety jest-* variable will throw error
function safeEval(code) {
  let safeContextStr = "";
  if (typeof window !== "undefined") {
    const windowContextAttr = Object.getOwnPropertyNames(window).filter(isValidVariableName);
    for (let i = 0, len = windowContextAttr.length; i < len; i++) {
      safeContextStr += `var ${windowContextAttr[i]} = undefined;`;
    }
  }
  return new Function(`${safeContextStr} "use strict";  ${code}`)();
}

// 代替eval的函数
function parseString(string) {
  return safeEval(`return (${string})`);
}

// 解析函数字符串值
const evaluateString = (string, formData, rootValue) =>
  safeEval(`
  const rootValue = ${JSON.stringify(rootValue)};
  const formData = ${JSON.stringify(formData)};
  return (${string})
  `);

// 判断schema的值是是否是“函数”
export function isFunction(fn) {
  if (typeof fn === "function") {
    return true;
  }
  if (typeof fn === "string" && fn.substring(0, 2) === "{{" && fn.substring(fn.length - 2, fn.length) === "}}") {
    return fn.substring(2, fn.length - 2);
  }
  return false;
}

// 函数表达式转换成值
export const convertValue = (item, formData, rootValue) => {
  if (typeof item === "function") {
    return item(formData, rootValue);
  }

  if (typeof item === "string" && isFunction(item) !== false) {
    try {
      const _item = isFunction(item);
      return evaluateString(_item, formData, rootValue);
    } catch (error) {
      console.error(`happen at ${item}：${error.message}`);
      return item;
    }
  }
  return item;
};

const reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
const reIsPlainProp = /^\w*$/;

function isKey(value, object) {
  if (Array.isArray(value)) {
    return false;
  }

  if (typeof value === "number" || typeof value === "boolean" || value == null) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || (object != null && value in Object(object));
}

function castPath(value, object) {
  if (Array.isArray(value)) {
    return value;
  }
  return isKey(value, object) ? [value] : value.match(/([^\.\[\]"']+)/g);
}

function toKey(value) {
  if (typeof value === "string") {
    return value;
  }
  const result = `${value}`;
  return result == "0" && 1 / value == -Infinity ? "-0" : result;
}

export function baseGet(object, path) {
  path = castPath(path, object);

  let _index = 0;
  const _pathLength = path.length;

  while (object != null && _index < _pathLength) {
    object = object[toKey(path[_index++])];
  }
  return _index && _index == _pathLength ? object : undefined;
}

// 计算单个表达式的hidden值
const calcHidden = (hiddenString, rootValue, formData) => {
  if (!rootValue || typeof rootValue !== "object") {
    return false;
  }
  // 支持四种基本运算符
  const operators = ["==", "!=", ">", "<"];
  try {
    const op = operators.find((op) => hiddenString.indexOf(op) > -1);
    const [key, value] = hiddenString.split(op).map((item) => item.trim());
    let left = rootValue[key];
    // feature: 允许从 formData 取值
    if (key.substring(0, 9) === "formData." && formData) {
      const subKey = key.substring(9);
      left = baseGet(formData, subKey);
    }
    const right = parseString(value);
    return parseString(`"${String(left)}"${op}"${String(right)}"`);
  } catch (e) {
    console.error(e);
  }
  return false;
};

export function isHidden({ hidden, rootValue, formData }) {
  if (typeof hidden === "string") {
    // 支持 && 和 ||
    const hasAnd = (string) => string.indexOf("&&") > -1;
    const hasOr = (string) => string.indexOf("||") > -1;
    let hiddenList = [];
    if (!hasOr(hidden)) {
      if (!hasAnd(hidden)) {
        return calcHidden(hidden, rootValue, formData);
      } else {
        hiddenList = hidden.split("&&").map((item) => item.trim());
        return hiddenList.every((item) => calcHidden(item, rootValue, formData));
      }
    } else {
      hiddenList = hidden.split("||").map((item) => item.trim());
      if (!hasAnd(hidden)) {
        return hiddenList.some((item) => calcHidden(item, rootValue, formData));
      } else {
        return hiddenList.some((item) => {
          if (hasAnd(item)) {
            const list = item.split("&&").map((item) => item.trim());
            return list.every((x) => calcHidden(x, rootValue, formData));
          } else {
            return calcHidden(item, rootValue, formData);
          }
        });
      }
    }
  }
  return hidden;
}

export function getEnum(schema) {
  if (!schema) return undefined;
  const itemEnum = schema && schema.items && schema.items.enum;
  const schemaEnum = schema && schema.enum;
  return itemEnum ? itemEnum : schemaEnum;
}
