import fetch from "~utils/http";

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

export function dataVSqlList() {
  return fetch({
    url: "/datav/sql",
    method: "get"
  });
}
