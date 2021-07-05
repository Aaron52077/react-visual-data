import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { Breadcrumb } from "antd";

/**
 * 根据当前浏览器地址栏的路由地址，在menuConfig中查找路由跳转的路径
 * 如路由地址为/dashboard,则查找到的路径为[{title: "首页",...}]
 */
const getPath = (menuList, pathname) => {
  let temppath = [];
  try {
    function getNodePath(node) {
      temppath.push(node);
      // 找到符合条件的节点，通过throw终止掉递归
      if (node.path === pathname) {
        throw new Error("GOT IT!");
      }
      if (node.children && node.children.length > 0) {
        for (let i = 0; i < node.children.length; i++) {
          getNodePath(node.children[i]);
        }
        // 当前节点的子节点遍历完依旧没找到，则删除路径中的该节点
        temppath.pop();
      } else {
        // 找到叶子节点时，删除路径当中的该叶子节点
        temppath.pop();
      }
    }
    for (let i = 0; i < menuList.length; i++) {
      getNodePath(menuList[i]);
    }
  } catch (e) {
    return temppath;
  }
};

const AutoBreadcrumb = (props) => {
  const { location, dispatch, routes } = props;
  const { pathname } = location;
  const [curPath, setCurPath] = useState(null);

  useEffect(() => {
    let path = getPath(routes, pathname);
    const first = path && path[0];

    if (first && first.title.trim() !== "可视化设计器") {
      path = [{ title: "可视化设计器", path: "/dashboard" }].concat(path);
    }
    setCurPath(path);
  }, [pathname]);

  return (
    <Breadcrumb className="gc-breadcrumb">
      {curPath &&
        curPath.map((item, index) =>
          item.path === "/dashboard" ? (
            <Breadcrumb.Item
              key={item.path}
              onClick={() => {
                dispatch({ type: "app/routerPath", data: item.path });
              }}
            >
              <a href={`/#${item.path}`}>{item.title}</a>
            </Breadcrumb.Item>
          ) : index == curPath.length - 1 ? (
            <Breadcrumb.Item key={item.path}>{item.title}</Breadcrumb.Item>
          ) : (
            <Breadcrumb.Item key={item.path} href={item.path}>
              {item.title}
            </Breadcrumb.Item>
          )
        )}
    </Breadcrumb>
  );
};

export default withRouter(
  connect((state) => ({
    routes: state.app.routes
  }))(AutoBreadcrumb)
);
