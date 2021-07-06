/**
 * 通用的辅助工具方法
 * @module 通用工具方法
 * */
// 获取数据类型
export function toRawType(value) {
  const _toString = Object.prototype.toString;
  return _toString.call(value).slice(8, -1);
}

// 文件下载
export function downFile(data, name) {
  var saveLink = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
  saveLink.href = data;
  saveLink.download = name;
  var event = document.createEvent("MouseEvents");
  event.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  saveLink.dispatchEvent(event);
}

// base64文件转码
export function dataURLtoFile(dataurl, filename) {
  let arr = dataurl.split(",");
  let mine = arr[0].match(/:(.*?);/)[1];
  let bstr = atob(arr[1]);
  let n = bstr.length;
  let u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, {
    type: mine
  });
}

/**
 * @param {Array} 不同数组，取并集name
 */
export function array2Equal(arr1, arr2) {
  return arr1.concat(arr2.filter((val) => !arr1.includes(val.name)));
}

// 判断是否为空
export function isEmpty(value) {
  if (value === null || value === undefined) {
    return true;
  }

  if (Array.isArray(value) || toRawType(value) === "String" || value instanceof String) {
    return value.length === 0;
  }

  if (value instanceof Map || value instanceof Set) {
    return value.size === 0;
  }

  if (toRawType(value) === "Object") {
    return Object.keys(value).length === 0;
  }

  return false;
}

export function isObject(val) {
  return toRawType(val) === "Object";
}

// 小数值转百分比
export function percent(value, decimals = 0) {
  value = parseFloat(value) || 0;
  decimals = parseInt(decimals, 10) || 0;

  let whole = value * 100;
  let multiplier = Math.pow(10, decimals);

  return (Math.round(whole * multiplier) / multiplier).toFixed(decimals) + "%";
}

// 四舍五入取整
export function round(value, decimals = 0) {
  if (isNaN(value)) {
    return 0;
  }

  decimals = parseInt(decimals, 10) ?? 2;

  let multiplier = Math.pow(10, decimals);
  multiplier = (Math.round(value * multiplier) / multiplier).toFixed(decimals);
  return parseFloat(multiplier);
}

// 自动给数字加千分位
export function thousand(value) {
  let parts = String(value).split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

// 当超出若干个字符时，后面的部分直接显示某串字符(ps: 常用于文字限制切分)
export function truncate(value, length, end) {
  end = end || "...";

  if (length == null) {
    return value;
  }

  length = parseInt(length, 10) || 200;

  return value.substring(0, length) + (value.length > length ? end : "");
}

/**
 * 数组分割成多数组
 * @param  {[type]} target  要分割的数组
 * @param  {[type]} size  每个数组的个数
 * @return {[type]}       返回一个数组
 */
export function chunk(target, size) {
  let [start, end, result] = [null, null, []];
  for (let i = 0; i < Math.ceil(target.length / size); i++) {
    start = i * size;
    end = start + size;
    result.push(target.slice(start, end));
  }
  return result;
}

// 对象深度合并
export function deepMergeObj(obj1, obj2) {
  if (toRawType(obj2) !== "Object") return obj1;

  for (let [key, value] of Object.entries(obj2)) {
    obj1[key] =
      obj1[key] && toRawType(obj1[key]) === "Object" && value && toRawType(value) === "Object"
        ? deepMergeObj(obj1[key], value)
        : (obj1[key] = value);
  }
  return obj1;
}

// 转化样式布局值
export function converLayout(value, defaultValue = "100%") {
  // 是否为数字 ex："222"、222
  function isLooselyNumber(num) {
    if (toRawType(num) === "Number") return true;
    if (toRawType(num) === "String") {
      return !Number.isNaN(Number(num));
    }
    return false;
  }

  function isCssLength(str) {
    if (typeof str !== "string") return false;
    return str.match(/^([0-9])*(%|px|rem|em)$/i);
  }
  return isLooselyNumber(value) ? Number(value) : isCssLength(value) ? value : defaultValue;
}

// 拍平多维数组
export function flattenArray(target) {
  const flattened = [].concat(...target);
  return flattened.some((item) => Array.isArray(item)) ? flattenArray(flattened) : flattened;
}

// 获取base64格式文件
export function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

/**
 * 图片压缩，接受一个options参数，具体参数如下：
 * @param {string} data 图片数据 FileReader readAsDataURL方法得到的数据
 * @param {string} [type='image/jpeg'] 处理完之后的图片类型
 * @param {Number} [quality=0.8] 图片压缩比例
 * @returns {Promise}
 */
export function compressImage({ data, type = "image/jpeg", quality = 0.8 }) {
  if (!data) return;
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const img = new Image();
    img.onload = function () {
      img.width *= quality;
      img.height *= quality;
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;

      // canvas清屏
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 将图像绘制到canvas上
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // 必须等压缩完才读取canvas值，否则canvas内容是黑帆布
      resolve(canvas.toDataURL(type));
    };
    img.onerror = reject;
    // 记住必须先绑定事件，才能设置src属性，否则img没有内容可以画到canvas
    img.src = data;
  });
}

/**
 * 根据图片base64数据，获取图片文件实际大小，最终结果会有<3的偏差（比实际大1~3）
 * @param imageBase64Data
 * @returns {number}
 */
export function getImageSizeByBase64(imageBase64Data) {
  let arr = imageBase64Data.split(",");
  const base64Data = arr[1];
  const fileSize = ((base64Data.length - 3) * 3) / 4;
  return parseInt(fileSize) + 3;
}

/**
 * 将图片大约压缩到指定大小以下
 * @param {string} data 图片数据 FileReader readAsDataURL方法得到的数据
 * @param {string} [type='image/jpeg'] 处理完之后的图片类型
 * @param {Number} [size=300 * 1024] 压缩后大小
 * @param {Number} [qualityStep=0.9] 每次压缩比，数值越大越精确，但是压缩时间越长
 * @returns {Promise}
 */
export function compressImageToSize({
  data,
  type = "image/jpeg",
  size = 300 * 1000, // 默认 300K左右
  qualityStep = 0.9 // 每次压缩比
}) {
  if (getImageSizeByBase64(data) < size) {
    return Promise.resolve(data);
  }
  const loopCompress = (d) => {
    return compressImage({
      data: d,
      type,
      quality: qualityStep
    }).then(
      (result) => {
        if (getImageSizeByBase64(result) < size) {
          return Promise.resolve(result);
        }
        return loopCompress(result);
      },
      (err) => Promise.reject(err)
    );
  };
  return loopCompress(data);
}

function navigatorAgent(pattern) {
  if (typeof window !== "undefined" && window.navigator) {
    return !!navigator.userAgent.match(pattern);
  }
}

// 获取当前浏览器内核
export const getNavigator = {
  Edge: navigatorAgent(/Edge/i),
  FireFox: navigatorAgent(/firefox/i),
  Safari: navigatorAgent(/safari/i) && !navigatorAgent(/chrome/i) && !navigatorAgent(/android/i),
  IOS: navigatorAgent(/iP(ad|od|hone)/i),
  ChromeForAndroid: navigatorAgent(/chrome/i) && navigatorAgent(/android/i),
  // Not needed on <= IE11
  IE11OrLess: navigatorAgent(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i)
};

// 限制在一定范围内的数字
export function range2Scope(maxOrStart, end = null, step = null) {
  if (!end) {
    return Array.from({ length: maxOrStart }, (_, i) => i);
  }

  if (end <= maxOrStart) {
    return [];
  }

  if (step !== null) {
    return Array.from({ length: Math.ceil((end - maxOrStart) / step) }, (_, i) => i * step + maxOrStart);
  }

  return Array.from({ length: Math.ceil(end - maxOrStart) }, (_, i) => i + maxOrStart);
}

/**
 * 将数值四舍五入后格式化成金额形式
 * @param num 数值(Number或者String)
 * @param options 可选参数
 * @param options.prefix 金钱前缀，默认为空，一般为 ￥ 或 $
 * @param options.decimalNum 保留小数点个数，默认为2 一般为 0 1 2
 * @param options.splitSymbol 格式化分割符，默认为英文逗号，分隔符必须是单字符
 * @return 金额格式的字符串,如'￥1,234,567.45'
 * @type String
 */
export function formatCurrency(num, options = {}) {
  let { decimalNum, splitSymbol } = options;
  const { prefix = "￥" } = options;
  let centsPercent = 100;
  if (splitSymbol === undefined) splitSymbol = ",";
  if (decimalNum !== 0 && decimalNum !== 1 && decimalNum !== 2) decimalNum = 2;
  if (decimalNum === 0) centsPercent = 1;
  if (decimalNum === 1) centsPercent = 10;
  num = num.toString().replace(/\$|,/g, "");
  if (isNaN(num)) num = "0";
  const sign = num === Math.abs(num).toString() ? "" : "-";
  num = Math.abs(num);
  num = Math.floor(num * centsPercent + 0.50000000001);
  let cents = num % centsPercent;
  num = Math.floor(num / centsPercent).toString();
  if (cents < 10 && decimalNum === 2) {
    cents = `0${cents}`;
  }
  for (let i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
    const endPosition = 4 * i + 3;
    num = num.substring(0, num.length - endPosition) + splitSymbol + num.substring(num.length - endPosition);
  }
  if (decimalNum === 0) {
    return prefix + sign + num;
  }
  return `${prefix}${sign}${num}.${cents}`;
}

// 轮询
export async function poll(fn, validate, interval = 2500) {
  const resolver = async (resolve, reject) => {
    try {
      // fn does not need to be asynchronous or return promise
      // call validator to see if the data is at the state to stop the polling
      const result = await fn();
      const valid = validate(result);
      if (valid === true) {
        resolve(result);
      } else if (valid === false) {
        setTimeout(resolver, interval, resolve, reject);
      }
    } catch (e) {
      reject(e);
    }
  };
  return new Promise(resolver);
}

export class SimpleMap {
  list = [];

  has(key) {
    const resolved = this.list.find((item) => item.key === key);
    return !!resolved;
  }

  set(key, value) {
    this.list.push({ key, value });
  }

  get(key) {
    const resolved = this.list.find((item) => item.key === key);
    return resolved ? resolved.value : null;
  }

  delete(key) {
    const idx = this.list.findIndex((item) => item.key === key);
    ~idx && this.list.splice(idx, 1);
  }

  dispose() {
    this.list.splice(0, this.list.length);
  }
}
