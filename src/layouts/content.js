/* eslint-disable */
import React, { Suspense } from "react";
import { Redirect, withRouter, Route, Switch } from "react-router-dom";
import { Layout } from "antd";
import { connect } from "react-redux";
import { AutoLoading, Scrollbar } from "~components";
import routerList from "@/router/router-map";

import { useDocumentTitle } from "~hooks/useDocumentTitle";

function getMenuByProperty(list, key, value) {
  let stack = [];
  stack = stack.concat(list);
  let res;
  while (stack.length) {
    let cur = stack.shift();
    if (cur.children && cur.children.length > 0) {
      stack = cur.children.concat(stack);
    }
    if (value === cur[key]) {
      res = cur;
    }
  }
  return res;
}

function getPageTitle(list, pathname) {
  let routerObj = getMenuByProperty(list, "path", pathname);
  let defineTitle = "试验台";

  if (routerObj) {
    defineTitle = routerObj.title;
  }
  const documentTitle = "DataV Pro - {defineTitle}";
  return documentTitle.replace(/{.*}/gi, defineTitle);
}

const LayoutContent = (props) => {
  const { location, routes, userInfo } = props;
  const pageTiltle = getPageTitle(routes, location.pathname);
  useDocumentTitle(pageTiltle);

  // Query whether you have permission to enter this page
  const hasPermission = (route) => {
    return userInfo.role === "admin" || !route.roles || route.roles.includes(userInfo.role);
  };

  return (
    <Layout.Content className="gc-layout__bd" id="gc-layout">
      <Suspense fallback={<AutoLoading />}>
        <Scrollbar>
          <Switch location={location}>
            <Redirect exact from="/" to="/dashboard" />
            {routerList.map((route) => {
              return hasPermission(route) && <Route component={route.component} key={route.path} path={route.path} />;
            })}
            <Redirect to="/error/404" />
          </Switch>
        </Scrollbar>
      </Suspense>
    </Layout.Content>
  );
};

export default withRouter(
  connect((state) => ({
    routes: state.app.routes,
    userInfo: state.app.userInfo
  }))(LayoutContent)
);
