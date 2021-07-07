import React, { useRef } from "react";
import { onEvent, offEvent } from "~utils";

import "./style.less";
import { useEffect } from "react";

/**
 * 根据屏幕尺寸缩放
 * @param zoom scaleX(等比例缩放高度铺满)、scaleY(等比例缩放宽度铺满)、cover(全屏铺满),
 * @param config 屏幕尺寸配置
 * par
 */
const FullScreenContainer = ({ className, config, zoom = "cover", children }) => {
  const domRef = useRef();

  const resizeAuto = (width, height) => {
    const cw = document.documentElement.clientWidth;
    const ch = document.documentElement.clientHeight;
    const ratioX = cw / width;
    const ratioY = ch / height;
    return {
      transform: `scale(${ratioX}, ${ratioY})`
    };
  };

  const resizeWidth = (width) => {
    const ratio = document.documentElement.clientWidth / width;
    return {
      transform: `scale(${ratio})`
    };
  };

  const resizeHeight = (width, height) => {
    const cw = document.documentElement.clientWidth;
    const ch = document.documentElement.clientHeight;
    const ratio = ch / height;
    const gap = (cw - width * ratio) / 2;
    return {
      left: `${gap.toFixed(3)}px`,
      transform: `scale(${ratio})`
    };
  };

  const resize = (config) => {
    let styles = {};
    switch (zoom) {
      case "cover":
        styles = resizeAuto(config.width, config.height);
        break;
      case "scaleX":
        styles = resizeWidth(config.width);
        break;
      case "scaleY":
        styles = resizeHeight(config.width, config.height);
        break;
      default:
        break;
    }

    Object.assign(domRef.current.style, styles);
  };

  const initPageInfo = (config) => {
    document.querySelector('meta[name="viewport"]').setAttribute("content", `width=${config.width}`);

    Object.assign(domRef.current.style, {
      width: `${config.width}px`,
      height: `${config.height}px`
    });

    resize(config);
  };

  useEffect(() => {
    initPageInfo(config);

    onEvent(window, "resize", () => {
      resize(config);
    });

    return () => {
      offEvent(window, "resize", () => {
        resize(config);
      });
    };
  }, []);

  return (
    <div
      id="gc-designer-container"
      className={className}
      ref={(el) => {
        domRef.current = el;
      }}
    >
      {children}
    </div>
  );
};

export default FullScreenContainer;
