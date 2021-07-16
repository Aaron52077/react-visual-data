// 公共基础配置项抽离
const BASE_CONF = {
  width: 400,
  height: 250,
  left: 15,
  top: 15,
  background: "",
  isLock: false,
  isHidden: false,
  remark: "",
  isCustomStyle: false,
  borderRadius: "",
  borderColor: "",
  borderWidth: "",
  borderStyle: "solid",
  shadowOffset: 0,
  shadowColor: "",
  shadowWidth: 0,
  animateType: "",
  animateTime: "",
  animateSpeed: "",
  animateRepeat: "",
  drillDownOpen: false,
  drillDown: [],
  dependenceOpen: false,
  dependence: [],
  isRefresh: false,
  refreshTime: 1800
};

// 公共数据配置项抽离
const BASE_DATA_CONF = {
  dataType: "json",
  dataSqlId: "",
  dataModals: {},
  dataApiId: ""
};

export { BASE_CONF, BASE_DATA_CONF };
