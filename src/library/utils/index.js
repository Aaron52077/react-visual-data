/**
 * 通用的一些工具方法
 * @module 通用工具方法
 * Created by Aaron 2019-4-30.
 * */
import CryptoJS from "crypto-js";
const aseKey = CryptoJS.enc.Utf8.parse("1234567812345678");

/**
 * ASE加密函数
 * @param {*} str
 */
export function aesEncrypt(str) {
  return CryptoJS.AES.encrypt(str, aseKey, {
    iv: aseKey,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding
  }).toString();
}

/**
 * ASE解密函数
 * @param {*} str
 */
export function aesDecrypt(str) {
  let decrypted = CryptoJS.AES.decrypt(str, aseKey, {
    iv: aseKey,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}

/**
 * @description 获取url地址参数
 */
export function pathToParam(url) {
  url = url == null ? window.location.href : url;
  const search = url.substring(url.lastIndexOf("?") + 1);
  const obj = {};
  const reg = /([^?&=]+)=([^?&=]*)/g;
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1);
    let val = decodeURIComponent($2);
    val = String(val);
    obj[name] = val;
    return rs;
  });
  return obj;
}

/**
 * @description 拼接get请求所需url
 */
export function pathToMosaic(url, params) {
  if (!params) return url;
  const queryString = [];
  Object.keys(params).forEach((key) => {
    let value = params[key];
    if (value !== undefined && value !== null) {
      queryString.push(`${key}=${value}`);
    }
  });
  const qStr = queryString.join("&");
  if (url.indexOf("?") < 0) {
    url += `?${qStr}`;
  } else if (url.endsWith("&")) {
    url += qStr;
  } else if (url.endsWith("?")) {
    url += `${qStr}`;
  } else {
    url += `&${qStr}`;
  }
  return url;
}

// 深度克隆对象
export function cloneDeep(obj) {
  let clone = obj;
  if (obj && typeof obj === "object") {
    clone = new obj.constructor();
    Object.getOwnPropertyNames(obj).forEach((prop) => (clone[prop] = cloneDeep(obj[prop])));
  }
  return clone;
}

/**
 * @description 绑定事件 onEvent(element, event, handler)
 */
export const onEvent = (function () {
  if (document.addEventListener) {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false);
      }
    };
  } else {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.attachEvent("on" + event, handler);
      }
    };
  }
})();

/**
 * @description 解绑事件 offEvent(element, event, handler)
 */
export const offEvent = (function () {
  if (document.removeEventListener) {
    return function (element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false);
      }
    };
  } else {
    return function (element, event, handler) {
      if (element && event) {
        element.detachEvent("on" + event, handler);
      }
    };
  }
})();

/**
 * @description 格式化文件大小
 */
export function readFileSize(value) {
  if (value === null || value === "") {
    return "0B";
  }
  value = parseFloat(value);
  const units = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const formatter = (value, power) => {
    return (value / Math.pow(1024, power)).toFixed(2) + units[power];
  };
  const index = Math.floor(Math.log(value) / Math.log(1024)) || 0;
  return formatter(value, index);
}

/**
 * @description 日期对象格式化
 */
export function dateToStr(date, cFormat) {
  if (arguments.length === 0) {
    return null;
  }
  if (typeof date != "object") return "";

  cFormat = cFormat || "yyyy-MM-dd";
  var formatObj = {
    M: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    m: date.getMinutes(),
    s: date.getSeconds()
  };
  cFormat = cFormat.replace(/(M+|d+|h+|m+|s+)/g, (result) => {
    return ((result.length > 1 ? "0" : "") + formatObj[result.slice(-1)]).slice(-2);
  });
  return cFormat.replace(/(y+)/g, (result) => {
    return date.getFullYear().toString().slice(-result.length);
  });
}

/**
 * unix时间格式化
 */
export function unixToStr(data, cFormat) {
  var val = `${data}` || "";
  val = val.replace(/@1/g, "");
  val = val.replace(/@2/g, "");
  cFormat = cFormat || "yyyy-MM-dd hh:mm";
  var result = (val.length < 12 ? parseInt(val) * 1000 : parseInt(val)) || 0;
  return dateToStr(new Date(result), cFormat);
}

/**
 * 防抖机制 ps: 建议使用lodash工具库
 */
export function debounce(fn, wait, immediate) {
  let timeout, args, context, timestamp, result;

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp;

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      // 如果设定为immediate === true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = fn.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function (...args) {
    context = this;
    timestamp = +new Date();
    const callNow = immediate && !timeout;
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = fn.apply(context, args);
      context = args = null;
    }

    return result;
  };
}

/**
 * 节流机制 ps: 建议使用lodash工具库
 */
export function throttle(fn, wait = 100) {
  let timer = null;
  return function () {
    let context = this,
      args = arguments;
    if (!timer) {
      timer = setTimeout(function () {
        fn.apply(context, args);
        timer = null;
      }, wait);
    }
  };
}

// 异步加载js、css
export function loadScript(url, type = "js") {
  let flag = false,
    insert = type === "js" ? "body" : "head";

  return new Promise((resolve) => {
    const insertNode = document.getElementsByTagName(insert)[0];
    Array.from(insertNode.children).forEach((ele) => {
      if ((ele.src || "").indexOf(url) !== -1) {
        flag = true;
        resolve();
      }
    });

    // TODO: 加载一次即可
    if (flag) return;

    let script;
    if (type === "js") {
      script = document.createElement("script");
      script.type = "text/javascript";
      script.src = url;
    } else if (type === "css") {
      script = document.createElement("link");
      script.rel = "stylesheet";
      script.href = url;
    }

    insertNode.appendChild(script);
    script.onload = function () {
      resolve();
    };
  });
}

/**
 * 生成字符串 mock token
 */
export function guid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;

    return v.toString(16);
  });
}

/**
 * 基于时间戳的 uuid
 * @return uniqueId
 */
export function uuid() {
  return (+new Date()).toString(36);
}

export const suid = (() => {
  const heyStack = "0123456789abcdefghijklmnopqrstuvwxyz";
  const randomInt = () => Math.floor(Math.random() * Math.floor(heyStack.length));
  return (length = 10) => Array.from({ length }, () => heyStack[randomInt()]).join("");
})();

/**
 * hex转rbg格式
 * @param {*} color 颜色
 * @param {*} opacity 透明度
 */
export function hexToRgb(color, opacity) {
  let newColor = "rgba(";
  // 判断是三位还是六位
  if (color.length === 4) {
    let arry = [];

    for (let i = 1; i < color.length; i++) {
      arry.push(parseInt("0x" + color[i] + color[i]));
    }

    arry.forEach((item) => {
      newColor += item + ", ";
    });

    newColor += opacity / 100 + ")";
    return newColor;
  } else {
    let arry = [];

    for (let i = 1; i < color.length; i += 2) {
      arry.push(parseInt("0x" + color.slice(i, i + 2)));
    }

    arry.forEach((item) => {
      newColor += item + ", ";
    });
    newColor += opacity / 100 + ")";
    return newColor;
  }
}

/**
 * @param {*} rgba 转 hex 16进制(ex: #000000)
 */
export function rgbToHex(rgba) {
  let str = rgba.slice(5, rgba.length - 1),
    arry = str.split(","),
    opa = Number(arry[3].trim()) * 100,
    strHex = "#",
    r = Number(arry[0].trim()),
    g = Number(arry[1].trim()),
    b = Number(arry[2].trim());

  strHex += ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  return { color: strHex, opacity: opa };
}

/**
 * @param {*} rgba 验证是否为rgba格式
 */
export function isRgba(rgba) {
  let str = rgba.slice(5, rgba.length - 1),
    arry = str.split(","),
    status = true,
    reg = /^rgba\(\d{1,3}(\,\s{0,1}\d{1,3}){2}\,\s{0,1}(0|(0(\.\d{1,2}))|1)\)$/;

  arry.forEach((item, index) => {
    if (index == arry.length - 1) {
      if (Number(item.trim()) < 0 || Number(item.trim()) > 1) {
        status = false;
      }
    } else {
      if (Number(item.trim()) < 0 || Number(item.trim()) > 255) {
        status = false;
      }
    }
  });

  if (reg.test(rgba) && status) {
    return true;
  } else {
    return false;
  }
}
