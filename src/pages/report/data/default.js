// 公共基础配置项抽离
const BASE_CONF = {
  width: 3,
  height: 25,
  left: 0,
  top: 0,
  hideTitle: true,
  titleAlign: "left",
  titleColor: "rgba(188, 201, 212, 1)",
  link: "",
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
  isRefresh: true,
  refreshTime: 1800,
  drillDownOpen: false,
  drillDown: [],
  dependenceOpen: false,
  dependence: []
};

const SIMPLE_CONF = {
  width: 3,
  height: 25,
  left: 0,
  top: 0,
  background: "",
  isLock: false,
  isHidden: false,
  remark: ""
};

// 公共数据配置项抽离
const BASE_CONF_DATA = {
  dataType: "json",
  dataSqlId: "",
  dataModals: {},
  dataApiId: ""
};

const FORM_CONTAINER_CONF = {
  name: "过滤条件",
  type: "container",
  data: {
    title: "过滤条件",
    halfWidth: false,
    width: 12,
    height: 30,
    left: 0,
    top: 0,
    titleAlign: "left",
    titleColor: "rgba(188, 201, 212, 1)",
    hideTitle: false,
    labelColor: "",
    background: ""
  }
};

export { BASE_CONF, SIMPLE_CONF, BASE_CONF_DATA, FORM_CONTAINER_CONF };
