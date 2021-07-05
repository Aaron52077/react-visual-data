import React, { useState, useEffect } from "react";
import { Spin, message, Result } from "antd";
import { isEmpty } from "~utils/helper";
import { pathToMosaic } from "~utils";

import "./style.less";

function IframeWrapper(props) {
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("");
  const { className = "", src = "", data, required = false } = props;

  useEffect(() => {
    let realPath;
    const reg = /^(http|https):\/\//g;

    if (required) {
      if (reg.test(src)) {
        realPath = data ? pathToMosaic(src, data) : src;
        setUrl(realPath);
      } else {
        message.error("iframe地址必须以 http 或 https 开头");
        setLoading(false);
      }
    } else {
      setUrl(src);
    }

    return () => {
      setLoading(false);
    };
  }, [src]);

  return (
    <Spin spinning={loading} wrapperClassName="gc-iframe" size="large">
      {!isEmpty(url) ? (
        <iframe
          className={className}
          onLoad={() => setLoading(false)}
          src={url}
          allowFullScreen={true}
          style={{ width: "100%", height: "100%", verticalAlign: "top" }}
          frameBorder="0"
        />
      ) : (
        <Result status={404} title="404" subTitle="Sorry, iframe地址必须以 http 或 https 开头." />
      )}
    </Spin>
  );
}

export default IframeWrapper;
