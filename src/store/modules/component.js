import { handleActions } from "redux-actions";

/**
 * 设计器组件公用状态
 * @param mode 开发模式
 * @param activeKey 当前高亮选择的key
 * @param fieldType 当前组件类型分类、(常规)component/(表单)form
 * @param querys url传参
 * @param dependencies 联动依赖关系
 * @param drilldown 下钻配置关联
 * @param api api枚举列表
 * @param sql aql枚举列表
 */
const initState = {
  mode: "development",
  activeKey: "",
  fieldType: "component",
  querys: {},
  dependencies: [],
  drilldown: [],
  api: [],
  sql: []
};

export default handleActions(
  {
    "component/mode": (state, action) => ({
      ...state,
      mode: ["development", "preview"].includes(action.data) ? action.data : "preview"
    }),
    "component/activeKey": (state, action) => ({ ...state, activeKey: action.data }),
    "component/fieldType": (state, action) => ({ ...state, fieldType: action.data }),
    "component/querys": (state, action) => ({ ...state, querys: action.data }),
    "component/dependencies": (state, action) => ({ ...state, dependencies: action.data }),
    "component/drilldown": (state, action) => ({ ...state, drilldown: action.data }),
    "component/api": (state, action) => ({ ...state, api: action.data }),
    "component/sql": (state, action) => ({ ...state, sql: action.data })
  },
  initState
);
