export default {
  setCookie(name, value, days) {
    var Days = days || 7;
    var exp = new Date();
    if (Days && !isNaN(parseInt(Days))) {
      exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
      document.cookie = name + "=" + escape(value) + ";path=/;expires=" + exp.toGMTString();
    }
  },
  getCookie(name) {
    var arrStr = document.cookie.split(";");
    for (var i = 0; i < arrStr.length; i++) {
      var temp = arrStr[i].split("=");
      if (temp[0].trim() === name) return unescape(temp[1]);
    }
  },
  delCookie(name) {
    document.cookie = name + "=;expires=" + new Date(0).toGMTString();
  },
  getSession(name) {
    if (!name) return;
    return window.sessionStorage.getItem(name);
  },
  setSession(name, content) {
    if (!name) return;
    if (typeof content !== "string") {
      content = JSON.stringify(content);
    }
    window.sessionStorage.setItem(name, content);
  },
  removeSession(name) {
    if (!name) return;
    window.sessionStorage.removeItem(name);
  },
  getLocal(name) {
    if (!name) return;
    return window.localStorage.getItem(name);
  },
  setLocal(name, content) {
    if (!name) return;
    if (typeof content !== "string") {
      content = JSON.stringify(content);
    }
    window.localStorage.setItem(name, content);
  },
  removeLocal(name) {
    if (!name) return;
    window.localStorage.removeItem(name);
  },
  /**
   * Clear all localStorage and sessionStorage
   */
  clear() {
    window.localStorage.clear();
    window.sessionStorage.clear();
  }
};
