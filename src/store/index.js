import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import reducer from "./modules";

// 引入redux-persist插件进行持久化存储状态
// defaults to localStorage for web. eg: session => import storage from "redux-persist/es/storage/session";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";

// 首先定义一个对
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["app"]
};

// 使用redux-persist合并
const rootReducer = persistReducer(persistConfig, reducer);

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
// 应用redux-persist完成数据持久化
export const persistor = persistStore(store);

export default store;
