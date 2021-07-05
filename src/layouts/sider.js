import React, { useState, useMemo, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Layout, Menu } from "antd";
import { connect } from "react-redux";
import { IconFont } from "~components";

const LayoutSider = (props) => {
  const { history, location, dispatch, routes, currentPath, collapsed, userInfo } = props;
  const [openKey, setOpenKey] = useState([]);

  function filterMenuItem(item) {
    const { roles } = item;
    if (userInfo.role === "admin" || !roles || roles.includes(userInfo.role)) {
      return true;
    } else if (item.children) {
      // 如果当前用户有此item的某个子item的权限
      return !!item.children.find((child) => roles.includes(child.role));
    }
    return false;
  }

  const getMenuNodes = (menuList) => {
    // 得到当前请求的路由路径
    const path = location.pathname;
    return menuList.reduce((pre, item) => {
      if (filterMenuItem(item)) {
        if (!item.children || item.children.length === 0) {
          pre.push(
            <Menu.Item key={item.path}>
              {item.icon ? <IconFont type={item.icon} /> : null}
              <span>{item.title}</span>
            </Menu.Item>
          );
        } else {
          // 查找一个与当前请求路径匹配的子Item
          const cItem = item.children.find((cItem) => path.indexOf(cItem.path) === 0);
          // 如果存在, 说明当前item的子列表需要打开
          if (cItem) {
            // console.log(item.path, openKey);
            const openKeys = [...openKey, item.path];
            setOpenKey(openKeys);
          }

          pre.push(
            <Menu.SubMenu
              key={item.path}
              title={
                <span>
                  {item.icon ? <IconFont type={item.icon} /> : null}
                  <span>{item.title}</span>
                </span>
              }
            >
              {getMenuNodes(item.children)}
            </Menu.SubMenu>
          );
        }
      }

      return pre;
    }, []);
  };

  const menuTreeNode = useMemo(() => {
    return getMenuNodes(routes);
  }, []);

  const onMenuSelect = (e) => {
    if (currentPath === e.key) return;
    history.push({ pathname: e.key });
  };

  useEffect(() => {
    dispatch({ type: "app/routerPath", data: location.pathname });
  }, [location.pathname]);

  return (
    <Layout.Sider trigger={null} collapsed={collapsed} width={180} collapsedWidth={60} className="sidebar-container">
      <div className="gc-logo" />
      <Menu
        defaultSelectedKeys={[currentPath]}
        defaultOpenKeys={openKey}
        theme="dark"
        mode="inline"
        onClick={(e) => {
          onMenuSelect(e);
        }}
      >
        {menuTreeNode}
      </Menu>
    </Layout.Sider>
  );
};

export default withRouter(
  connect((state) => ({
    currentPath: state.app.routerPath,
    collapsed: state.app.sidebarOpened,
    userInfo: state.app.userInfo,
    routes: state.app.routes
  }))(LayoutSider)
);
