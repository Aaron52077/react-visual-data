/**
 * request 网络请求工具，创建axios实例对象
 * send cookies when cross-domain requests
 */
import axios from "axios";
import { notification } from "antd";
import store from "@/store";
import { isEmpty } from "~utils/helper";

const codeMessage = {
  200: "服务器成功返回请求的数据。",
  201: "新建或修改数据成功。",
  202: "一个请求已经进入后台排队（异步任务）。",
  204: "删除数据成功。",
  400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
  401: "用户没有权限（令牌、用户名、密码错误）。",
  403: "用户得到授权，但是访问是被禁止的。",
  404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
  406: "请求的格式不可得。",
  410: "请求的资源被永久删除，且不会再得到的。",
  422: "当创建一个对象时，发生一个验证错误。",
  500: "服务器发生错误，请检查服务器。",
  502: "网关错误。",
  503: "服务不可用，服务器暂时过载或维护。",
  504: "网关超时。"
};

/**
 * 异常处理程序
 */
const errorHandler = (error) => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;

    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText
    });
  }

  if (!response) {
    notification.error({
      description: "您的网络发生异常，无法连接服务器",
      message: "网络异常"
    });
  }
  throw error;
};

const fetch = axios.create({
  baseURL: process.env.REACT_APP_API,
  timeout: 15 * 1000, // 请求超时时间
  retry: 4,
  retryDelay: 500,
  withCredentials: true
});

// request拦截器 请求处理
fetch.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    config.headers = {
      Accept: "application/json, text/plain, */*",
      Authorization: "Basic bmVpemhlbjpuZWl6aGVu",
      ContentType: "application/json;charset=UTF-8"
    };

    const { accessToken } = store.getState().app;
    if (!isEmpty(accessToken)) {
      // 让每个请求携带token -- ['AUTH_TOKEN']为自定义key
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// respone拦截器 响应处理
fetch.interceptors.response.use(
  (response) => {
    // 根据自身业务定制化提示语
    response.data.code === 1 &&
      notification.error({
        message: "系统提示",
        description: response.data.msg
      });

    if (
      response.config.responseType === "blob" ||
      response.config.responseType === "arraybuffer" ||
      response.data instanceof Blob ||
      response.data instanceof ArrayBuffer
    ) {
      return response;
    }
    return response.data;
  },
  (error) => {
    // Do something with request error
    errorHandler(error);
    return Promise.resolve(error);
  }
);

export default fetch;
