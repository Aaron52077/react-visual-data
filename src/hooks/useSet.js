import { useReducer } from "react";

// 基于redux的实现，类似于class component的setState 适用于复杂对象模式
export const useSet = (initState) => useReducer((state, action) => ({ ...state, ...action }), initState);
