// 下钻公共基础配置项抽离
const BASE_CONF = {
  width: 8,
  height: 250,
  link: "",
  titleColor: "",
  background: "",
  remark: "",
  isCenter: false,
  chartCustomStyle: false,
  borderColor: "",
  chartBorderRadius: "",
  borderWidth: "",
  chartBorderStyle: "",
  shadowWidth: "",
  shadowOffset: "",
  chartShadowColor: "",
  transition: "",
  transitionTime: 3,
  animateTime: "",
  animateRepeat: "",
  drillDownOpen: false,
  drillDown: [],
  dependenceOpen: false,
  dependences: []
};

// 公共数据配置项抽离
const BASE_DATA_CONF = {
  dataType: "json",
  dataSqlId: "",
  dataModals: {},
  dataApiId: ""
};

export { BASE_CONF, BASE_DATA_CONF };
