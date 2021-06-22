/**
 * Updated by Aaron on 2020-06-10.
 * more eg: https://github.com/streamich/react-use
 */
import { useReducer, useContext, useRef, useEffect, useState, createContext, useImperativeHandle } from "react";
import { onEvent, offEvent, debounce } from "~utils";
import { resizeSensor } from "~utils/resize-sensor";

export const Ctx = createContext(() => {});
export const StoreCtx = createContext({});

export const useTools = () => {
  return useContext(Ctx);
};

export const useStore = () => {
  return useContext(StoreCtx);
};

export function useDocumentTitle(title) {
  const prevTitleRef = useRef(title);
  useEffect(() => {
    document.title = title;
    return () => {
      // eslint-disable-next-line
      document.title = prevTitleRef.current;
    };
  }, [title]);
}

export function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes

  return ref.current;
}

export const useDebounce = (action, ms = 500) => {
  const debouncedAction = useRef(null);

  useEffect(() => {
    if (!debouncedAction.current) {
      debouncedAction.current = debounce(action, ms);
    }
  }, []);

  return debouncedAction.current;
};

// 基于redux的实现，类似于class component的setState 适用于复杂对象模式
export const useSet = (initState) => useReducer((state, action) => ({ ...state, ...action }), initState);

// 持久化存储 sessionStorage
export const useStorage = (initState = {}, key = "_root_storage") => {
  const getStorage = () => {
    const searchStr = sessionStorage.getItem(key);
    if (searchStr) {
      try {
        return JSON.parse(searchStr);
      } catch (error) {
        return initState;
      }
    }
    return initState;
  };

  const [data, setData] = useState(getStorage());
  const setStorage = (query) => {
    setData(query);
    sessionStorage.setItem(key, JSON.stringify(query));
  };
  return [data, setStorage];
};

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

export function composeProviders(...providers) {
  return ({ children }) => providers.reduce((prev, Provider) => <Provider>{prev}</Provider>, children);
}
