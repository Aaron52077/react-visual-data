import React, { useRef, useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { Spin } from "antd";
import { converLayout } from "~utils/helper";
import { onEvent, offEvent } from "~utils";

import "./style.less";

function CustomIframe(props, ref) {
  let {
    className = "",
    style = {
      width: "100%",
      height: "100%"
    },
    frameBorder = 0,
    src = "",
    data,
    events,
    onAction = () => {}
  } = props;
  const iframeRef = useRef();
  const [loading, setLoading] = useState(true);
  const [styles, setStyles] = useState({});

  useEffect(() => {
    onEvent(window, "message", onMessage);

    postMessage("update", data);
    return () => {
      setLoading(false);
      offEvent(window, "message", onMessage);
    };
  }, []);

  const onMessage = (e) => {
    if (!e.data || e.data === "" || !events || !e.data.type) {
      return;
    }

    const [prefix, type] = e.data.type.split(":");

    if (prefix !== "iframe" || !type) {
      return;
    }

    if (type === "resize" && e.data.data) {
      setStyles({
        width: converLayout(e.data.data.width),
        height: converLayout(e.data.data.height)
      });
    } else {
      const action = events[type];
      action && onAction(e, action, Object.assign(data, e.data.data));
    }
  };

  const postMessage = (type, data) => {
    iframeRef.current.contentWindow?.postMessage(
      {
        type: `iframe:${type}`,
        data
      },
      "*"
    );
  };

  const onLoad = () => {
    setLoading(false);
    src && postMessage("init", data);
  };

  // TODO：组件通知iframe reload
  const reload = (query) => {
    if (query) {
      return receive(query);
    }

    if (src) {
      iframeRef.current.src = src;
    }
  };

  // 当别的组件把数据发给 iframe 里面的时候执行。
  const receive = (values) => {
    if (src) {
      iframeRef.current.src = src;
      postMessage("receive", Object.assign(data, values));
    }
  };

  useImperativeHandle(ref, () => ({
    reload
  }));

  return (
    <Spin spinning={loading} wrapperClassName="gc-iframe" size="large">
      <iframe
        className={className}
        ref={(el) => {
          iframeRef.current = el;
        }}
        style={{ ...style, ...styles, verticalAlign: "top" }}
        onLoad={onLoad}
        src={src}
        allowFullScreen={true}
        frameBorder={frameBorder}
      />
    </Spin>
  );
}

export default forwardRef(CustomIframe);
