import { resultSuccess } from "../_util";

export default [
  {
    url: "/user/login",
    timeout: 200,
    method: "post",
    response: () => {
      return resultSuccess({
        role: "admin",
        access_token: "@guid",
        refresh_token: "@guid",
        avatar: "@image('80x80', '#2d8cf0', '#FFF', 'admin')",
        name: "admin"
      });
    }
  },
  {
    url: "/menu/list",
    timeout: 200,
    method: "post",
    response: () => {
      return resultSuccess([
        {
          icon: "wp-hot",
          path: "/dashboard",
          title: "可视化设计器",
          roles: ["admin", "editor", "guest"]
        }
      ]);
    }
  },
  {
    url: "/user/logout",
    timeout: 200,
    method: "get",
    response: () => {
      return resultSuccess("退出成功");
    }
  }
];
