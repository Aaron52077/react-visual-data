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
