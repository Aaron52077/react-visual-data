import Mock from "mockjs";

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context("./modules", false, /\.js$/);

const mockModules = modulesFiles.keys().reduce((modules, modulePath) => {
  const value = modulesFiles(modulePath);
  modules.push(...value.default);
  return modules;
}, []);

function param2Obj(url) {
  const search = decodeURIComponent(url.split("?")[1]).replace(/\+/g, " ");
  if (!search) {
    return {};
  }
  const obj = {};
  const searchArr = search.split("&");
  searchArr.forEach((v) => {
    const index = v.indexOf("=");
    if (index !== -1) {
      const name = v.substring(0, index);
      const val = v.substring(index + 1, v.length);
      obj[name] = val;
    }
  });
  return obj;
}

/**
 * Used in a production environment. Need to manually import all modules
 */
export function mockXHR() {
  // mock patch
  // https://github.com/nuysoft/Mock/issues/300
  Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send;
  Mock.XHR.prototype.send = function () {
    if (this.custom.xhr) {
      this.custom.xhr.withCredentials = this.withCredentials || false;

      if (this.responseType) {
        this.custom.xhr.responseType = this.responseType;
      }
    }
    this.proxy_send(...arguments);
  };

  function XHR2ExpressReqWrap(respond) {
    return function (options) {
      let result = null;
      if (respond instanceof Function) {
        const { url, body, method } = options;
        // https://expressjs.com/en/4x/api.html#req
        result = respond({
          method: method,
          body: JSON.parse(body),
          query: param2Obj(url)
        });
      } else {
        result = respond;
      }
      return Mock.mock(result);
    };
  }

  for (const i of mockModules) {
    Mock.mock(process.env.REACT_APP_API + i.url, i.method || "get", XHR2ExpressReqWrap(i.response));
  }
}
