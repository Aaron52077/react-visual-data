import fetch from "~utils/http";

/**
 * @description 账户登录
 */
export function accountIn(param) {
  return fetch({
    url: "/user/login",
    method: "post",
    data: param
  });
}

export function getMeunList() {
  return fetch({
    url: "/menu/list",
    method: "post"
  });
}

export function echartBarAPI() {
  return fetch({
    url: "/echart/bar",
    method: "get"
  });
}

export function dataVScreen() {
  return fetch({
    url: "/datav/screen",
    method: "post"
  });
}

export function dataVGrid() {
  return fetch({
    url: "/datav/grid",
    method: "post"
  });
}

export function dataVApiList() {
  return fetch({
    url: "/datav/api",
    method: "get"
  });
}

export function dataVOpenApi() {
  return fetch({
    url: "/datav/openapi",
    method: "get"
  });
}
