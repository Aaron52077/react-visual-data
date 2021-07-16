import { BASE_DATA_CONF } from "./default.js";

export default [
  {
    name: "iframe",
    icon: "iframe",
    type: "iframe",
    data: {
      title: "iframe",
      width: 450,
      height: 450,
      left: 15,
      top: 15,
      background: "",
      isLock: false,
      isHidden: false,
      dataConfig: {
        ...BASE_DATA_CONF,
        data: {
          src: "https://www.baidu.com"
        }
      }
    }
  }
];
