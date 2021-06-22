import { handleActions } from "redux-actions";

/**
 * 筛选组件状态
 * @param {*} valid 表单必填项验证
 * @param {*} dependencies 表单依赖关系id集合
 * @param {*} conditions 表单筛选条件列表
 * @param {*} parmas 表单筛选条件查询参数
 */
const initState = {
  dependencies: [],
  parmas: [],
  conditions: []
};

export default handleActions(
  {
    "form/dependencies": (state, action) => ({ ...state, dependencies: action.data }),
    "form/conditions": (state, action) => ({ ...state, conditions: action.data }),
    "form/parmas": (state, action) => ({ ...state, parmas: action.data }),
    "form/resetState": () => {
      return initState;
    }
  },
  initState
);
