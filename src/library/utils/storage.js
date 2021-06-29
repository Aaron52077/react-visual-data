export default {
  setCookie(key, value, days) {
    const Days = days || 7;
    const exp = new Date();
    if (Days && !isNaN(parseInt(Days))) {
      exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
      document.cookie = key + "=" + escape(value) + ";path=/;expires=" + exp.toGMTString();
    }
  },
  getCookie(key) {
    const arrStr = document.cookie.split(";");
    for (let i = 0; i < arrStr.length; i++) {
      const temp = arrStr[i].split("=");
      if (temp[0].trim() === key) return unescape(temp[1]);
    }
  },
  removeCookie(key) {
    document.cookie = key + "=;expires=" + new Date(0).toGMTString();
  },
  setSession(key, value) {
    if (!key) return;
    window.sessionStorage.setItem(key, JSON.stringify(value));
  },
  getSession(key) {
    if (!key) return;
    const value = window.sessionStorage.getItem(key);

    try {
      return JSON.parse(value);
    } catch (error) {
      return null;
    }
  },
  removeSession(key) {
    if (!key) return;
    window.sessionStorage.removeItem(key);
  },
  setLocal(key, value) {
    if (!key) return;
    window.localStorage.setItem(key, JSON.stringify(value));
  },
  getLocal(key) {
    if (!key) return;
    const value = window.localStorage.getItem(key);

    try {
      return JSON.parse(value);
    } catch (error) {
      return null;
    }
  },
  removeLocal(key) {
    if (!key) return;
    window.localStorage.removeItem(key);
  },
  /**
   * Clear all localStorage and sessionStorage
   */
  clear() {
    window.localStorage.clear();
    window.sessionStorage.clear();
  }
};
