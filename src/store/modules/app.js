import { handleActions } from "redux-actions";

/**
 * 用户信息、路由信息
 */
const initState = {
  accessToken: "",
  refreshToken: "",
  userInfo: {},
  routes: [],
  routerPath: "",
  layouts: {},
  sidebarOpened: true
};

export default handleActions(
  {
    "app/accessToken": (state, action) => ({ ...state, accessToken: action.data }),
    "app/refreshToken": (state, action) => ({ ...state, refreshToken: action.data }),
    "app/routes": (state, action) => ({ ...state, routes: action.data }),
    "app/userInfo": (state, action) => ({ ...state, userInfo: action.data }),
    "app/routerPath": (state, action) => ({ ...state, routerPath: action.data }),
    "app/layouts": (state, action) => ({ ...state, layouts: action.data }),
    "app/sidebarOpened": (state) => ({ ...state, sidebarOpened: !state.sidebarOpened }),
    "app/resetState": () => {
      return initState;
    }
  },
  initState
);
