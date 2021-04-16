import React, { forwardRef, useMemo } from "react";
import { Scrollbar } from "~components";
import { useAutoResize } from "~common/hooks";

/**
 * 设计器容器大小
 */
const Wrapper = forwardRef((props, ref) => {
  const {
    backgroundMode,
    backgroundColor,
    backgroundImage,
    backgroundDefine,
    backgroundBlur,
    backgroundOpacity
  } = props;
  const { domRef } = useAutoResize(ref);

  const backgroundStyles = useMemo(() => {
    if (backgroundMode === "custom") {
      return backgroundImage ? `url(${backgroundImage}) 0% 0% / 100% 100%` : backgroundColor;
    }

    if (backgroundMode === "define") {
      return `url(./static/templet/${backgroundDefine}) 0% 0% / 100% 100%`;
    }

    return backgroundColor ? backgroundColor : null;
  }, [backgroundMode, backgroundImage, backgroundDefine, backgroundColor]);

  return (
    <div className="gc-design__wrapper" ref={domRef}>
      <div
        className="bg-container"
        style={{
          background: backgroundStyles,
          filter: `blur(${backgroundBlur}px)`,
          opacity: parseFloat(backgroundOpacity / 10)
        }}
      />
      <Scrollbar>{props.children}</Scrollbar>
    </div>
  );
});

export default Wrapper;
