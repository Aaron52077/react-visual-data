/**
 * @param [parma][数据]
 * @param [unit][单位]
 * @returns {*}  统一返回数据带单位
 */
export const tooltipFormatter = (parma, unit = "") => {
  let obj = parma[0].name + "<br />";
  for (const item of parma) {
    obj = `${obj}${item.marker}${item.seriesName}: ${item.value}${unit}<br />`;
  }
  return obj;
};
