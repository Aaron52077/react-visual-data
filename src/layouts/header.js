import React from "react";
import { Layout, Avatar, Popover } from "antd";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { AutoBreadcrumb, IconFont } from "~components";

function LayoutHeader(props) {
  const { history, dispatch, userInfo, collapsed } = props;

  // 随机头像
  const ColorList = ["#2db7f5", "#19be6b", "#ff9900", "#ed4014", "#e8eaec"];
  const mid = Number(userInfo.name || 0) || "0";

  const handleToggle = () => {
    dispatch({ type: "app/sidebarOpened", data: !collapsed });
  };

  const handleSignOut = () => {
    dispatch({ type: "app/resetState" });
    dispatch({ type: "component/resetState" });
    dispatch({ type: "form/resetState" });
    history.replace({ pathname: "/account" });
  };

  const content = (
    <div onClick={handleSignOut} style={{ cursor: "pointer" }}>
      <IconFont antd={true} type="LogoutOutlined" />
      &nbsp;&nbsp;退出登录
    </div>
  );

  return (
    <Layout.Header className="gc-layout__hd">
      <div className="gc-collapsed" onClick={handleToggle}>
        {collapsed ? (
          <IconFont antd={true} type="MenuUnfoldOutlined" />
        ) : (
          <IconFont antd={true} type="MenuFoldOutlined" />
        )}
      </div>
      <AutoBreadcrumb />
      <div>
        <Avatar
          className="user-avatar"
          style={{
            backgroundColor: ColorList[mid % ColorList.length],
            verticalAlign: "middle"
          }}
          size="48"
        >
          {userInfo.name[0] || "-"}
        </Avatar>

        <Popover placement="bottomRight" content={content} arrowPointAtCenter>
          <div className="user-signout">
            {userInfo.name}&nbsp;&nbsp;
            <IconFont antd={true} type="CaretDownOutlined" />
          </div>
        </Popover>
      </div>
    </Layout.Header>
  );
}

export default connect((state) => ({
  userInfo: state.app.userInfo,
  collapsed: state.app.sidebarOpened
}))(withRouter(LayoutHeader));
