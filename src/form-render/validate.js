import { baseGet } from "./utils";
import { isEmpty } from "~utils/helper";

/* eslint-disable prefer-rest-params */
const isLength = (str, options) => {
  const isString = typeof str === "string" || str instanceof String;

  if (!isString) {
    let invalidType = typeof str;
    if (str === null) invalidType = "null";
    else if (invalidType === "object") invalidType = str.constructor.name;

    throw new TypeError(`Expected a string but received a ${invalidType}`);
  }

  let min;
  let max;
  if (typeof options === "object") {
    min = options.min || 0;
    max = options.max;
  } else {
    // backwards compatibility: isLength(str, min [, max])
    min = arguments[1] || 0;
    max = arguments[2];
  }
  const surrogatePairs = str.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g) || [];
  const len = str.length - surrogatePairs.length;
  return len >= min && (typeof max === "undefined" || len <= max);
};

/**
 * 使用正则表达式验证 fork: amis
 * @param {*} reg 字符串 or 正则表达式
 */
function matchRegexp(reg) {
  if (reg instanceof RegExp) {
    return reg;
  }

  if (/^(?:matchRegexp\:)?\/(.+)\/([gimuy]*)$/.test(reg)) {
    return new RegExp(RegExp.$1, RegExp.$2 || "");
  }
  if (typeof reg === "string") {
    return new RegExp(reg);
  }

  return /^$/;
}

const hasRepeat = (list) => {
  return list.find((x, i, self) => i !== self.findIndex((y) => JSON.stringify(x) === JSON.stringify(y)));
};

const isEmptyObject = (obj) => Object.keys(obj).length === 0 && obj.constructor === Object;

const isEmptyValue = (value, schema) => {
  // 多选组件的值为 [] 时，也判断为空值
  if (schema.type === "array" && schema.enum) {
    return !value || value.length === 0;
  }
  // boolean里的false, number里的0, 都不要认为是空值
  if (value === 0 || value === false) {
    return false;
  }
  return !value;
};

export const getValidateText = (obj) => {
  const { value, defaultValue, schema = {} } = obj;
  const {
    type,
    format,
    pattern,
    message,
    minLength,
    maxLength,
    minimum,
    maximum,
    minItems,
    maxItems,
    uniqueItems,
    required = false
  } = schema;

  let defineValue = [undefined, null].indexOf(value) > -1 ? defaultValue : value;

  if (type === "number" && value === 0) {
    defineValue = 0;
  }
  const needPattern = pattern && ["string", "number"].indexOf(type) > -1;
  // schema 里面没有内容的，直接退出
  if (isEmptyObject(schema)) {
    return false;
  }

  // 校验是否为required
  if (required && isEmptyValue(defineValue, schema)) {
    return (message && message.required) || "不能为空";
  }
  // 字符串相关校验
  if (type === "string") {
    let _defineValue = defineValue;
    if (typeof defineValue !== "string") {
      if (defineValue === null || defineValue === undefined) {
        _defineValue = "";
      } else {
        _defineValue = String(defineValue);
      }
    }

    if (_defineValue && maxLength) {
      if (!isLength(_defineValue, 0, parseInt(maxLength, 10))) {
        return (message && message.maxLength) || `长度不能大于 ${maxLength}`;
      }
    }
    if (_defineValue && (minLength || minLength === 0)) {
      if (!_defineValue || !isLength(_defineValue, parseInt(minLength, 10), undefined)) {
        return (message && message.minLength) || `长度不能小于 ${minLength}`;
      }
    }
    if (format === "email") {
      if (_defineValue && needPattern && !matchRegexp(pattern).test(_defineValue)) {
        return (message && message.email) || "请输入正确的email格式";
      }
    }
  }

  // 数字相关校验
  if (type === "number") {
    if (typeof defineValue !== "number") {
      return "请填写数字";
    }
    if (maximum && parseFloat(defineValue, 10) > maximum) {
      return (message && message.maximum) || `数值不能大于 ${maximum}`;
    }
    if ((minimum || minimum === 0) && parseFloat(defineValue, 10) < minimum) {
      return (message && message.minimum) || `数值不能小于 ${minimum}`;
    }
  }

  // 正则只对数字和字符串有效果
  if (defineValue && needPattern && !matchRegexp(pattern).test(defineValue)) {
    return (message && message.pattern) || "格式不匹配";
  }

  // 数组项目相关校验
  if (type === "array") {
    if (maxItems && defineValue && defineValue.length > maxItems) {
      return (message && message.maxItems) || `数组长度不能大于 ${maxItems}`;
    }

    if ((minItems || minItems === 0) && defineValue && defineValue.length < minItems) {
      return (message && message.minItems) || `数组长度不能小于 ${minItems}`;
    }

    if (uniqueItems && Array.isArray(defineValue) && defineValue.length > 1) {
      if (typeof uniqueItems === "boolean") {
        if (hasRepeat(defineValue)) {
          return "存在重复元素";
        }
      }
      if (typeof uniqueItems === "string") {
        try {
          const nameList = defineValue.map((item) => baseGet(item, uniqueItems));
          // 只考虑非object的情况
          const isRepeat = nameList.find((x, index) => nameList.indexOf(x) !== index);
          if (isRepeat) {
            return uniqueItems + " 的值存在重复的";
          }
        } catch (e) {}
      }
    }
  }

  return false;
};

const deepValidate = (key, value, schema = {}, formData) => {
  const checkList = [];
  const { type } = schema;
  const obj = { value, schema };

  if (type === "object") {
    const list = getValidateList(value, schema, formData); // eslint-disable-line
    checkList.push(...list);
  }

  if (getValidateText(obj)) {
    checkList.push({
      key: key,
      label: schema.title,
      message: getValidateText(obj)
    });
  }
  return checkList;
};

export const getValidateList = (values = {}, schema = {}, formData) => {
  const _formData = formData || values;
  const checkList = [];
  const { properties } = schema;
  // 校验必填（required 属性)
  if (!isEmpty(properties) && !isEmpty(values)) {
    Object.keys(values).forEach((key) => {
      const curSchema = properties[key] || {};
      const list = deepValidate(key, values[key], curSchema, _formData);
      checkList.push(...list);
    });
  }

  return checkList;
};
