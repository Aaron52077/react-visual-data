import { handleActions } from "redux-actions";

/**
 * tab项组件状态
 * @param {*} tabStore 列表项
 * @param {*} bind 依赖关系id集合
 */
const initState = {
  tabStore: [],
  tabBind: []
};

export default handleActions(
  {
    "tab/tabStore": (state, action) => ({ ...state, tabStore: action.data }),
    "tab/tabBind": (state, action) => ({ ...state, tabBind: action.data }),
    "tab/resetState": () => {
      return initState;
    }
  },
  initState
);
