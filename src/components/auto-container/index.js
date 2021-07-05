import React, { useState, useLayoutEffect, forwardRef } from "react";
import PropTypes from "prop-types";
import { useAutoResize } from "~hooks/useAutoResize";

import "./style.less";
import { useEffect } from "react";

/**
 * 根据屏幕尺寸缩放
 * @param zoom scaleX(等比例缩放高度铺满)、scaleY(等比例缩放宽度铺满)、cover(全屏铺满),
 * @param style 屏幕尺寸配置
 * par
 */
const FullScreenContainer = forwardRef(({ children, className, style, zoom = "cover" }, ref) => {
  const { domRef } = useAutoResize(ref);
  const [scale, setScale] = useState("");
  const { width, height } = style;
  const { clientHeight, clientWidth } = document.body;

  useEffect(() => {
    if (zoom === "scaleY") {
      setScale(`scale(${clientHeight / height})`);
    } else if (zoom === "scaleX") {
      setScale(`scale(${clientWidth / width})`);
    } else {
      setScale(`scale(${clientWidth / width}, ${clientHeight / height})`);
    }
  });

  useLayoutEffect(() => {
    Object.assign(domRef.current.style, {
      width: `${width}px`,
      height: `${height}px`,
      transform: scale
    });
    if (zoom === "scaleY") {
      const clientLeft = +((clientWidth - (width * clientHeight) / height) / 2).toFixed(3);
      domRef.current.style.left = `${clientLeft}px`;
    }
  });

  return (
    <div id="gc-designer-container" className={className} style={style} ref={domRef}>
      {children}
    </div>
  );
});

FullScreenContainer.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object
};

export default FullScreenContainer;
