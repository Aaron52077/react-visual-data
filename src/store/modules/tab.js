import { handleActions } from "redux-actions";

/**
 * tab项组件状态
 * @param {*} component 列表项
 * @param {*} dependencies 依赖关系id集合
 */
const initState = {
  component: [],
  dependencies: []
};

export default handleActions(
  {
    "tab/component": (state, action) => ({ ...state, component: action.data }),
    "tab/dependencies": (state, action) => ({ ...state, dependencies: action.data })
  },
  initState
);
