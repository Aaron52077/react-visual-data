import { useRef, useEffect, useState, useImperativeHandle } from "react";
import { resizeSensor } from "~utils/resize-sensor";
import { onEvent, offEvent, debounce } from "~utils";

function observerDomResize(dom, callback) {
  const MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

  const observer = new MutationObserver(callback);

  observer.observe(dom, {
    attributes: true,
    attributeFilter: ["style"],
    attributeOldValue: true
  });

  return observer;
}

// 自动监听视窗大小容器自适应
export const useAutoResize = (ref) => {
  const [state, setState] = useState({ width: 0, height: 0 });
  const domRef = useRef(null);

  const initWH = () => {
    if (!domRef.current) return state;
    const { clientWidth, clientHeight } = domRef.current;
    setState({ width: clientWidth, height: clientHeight });
  };

  useImperativeHandle(ref, () => ({ initWH }), []);

  useEffect(() => {
    const debounceSetWHHandler = debounce(initWH, 100, true);
    debounceSetWHHandler();

    const domObserver = observerDomResize(domRef.current, debounceSetWHHandler);

    if (domRef.current) {
      resizeSensor(domRef.current, () => {
        try {
          const resizeHandler = debounce(() => {
            const { clientWidth, clientHeight } = domRef.current;
            setState({ width: clientWidth, height: clientHeight });
          }, 100);

          resizeHandler();
        } catch (e) {
          console.warn(`监听元素dom节点失败, ${e}`);
        }
      });
    }

    onEvent(window, "resize", debounceSetWHHandler);

    return () => {
      domObserver.disconnect();
      domObserver.takeRecords();
      offEvent(window, "resize", debounceSetWHHandler);
    };
  }, []);

  return { ...state, domRef, initWH };
};
