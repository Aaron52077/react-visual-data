import React, { useRef, forwardRef, useImperativeHandle } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { converLayout } from "~utils/helper";

const renderThumb = ({ style, ...props }) => {
  const thumbStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.14)"
  };
  return <div style={{ ...style, ...thumbStyle }} {...props} />;
};

function VScrollbar(props, ref) {
  const { width, height, autoHide = true } = props;
  const scrollbarRef = useRef();

  useImperativeHandle(ref, () => ({
    scrollTo: (top, left) => {
      scrollbarRef.current.scrollTop(Math.random() * top);
      scrollbarRef.current.scrollLeft(Math.random() * left);
    },
    getValues: () => ({
      top: scrollbarRef.current.getScrollTop(),
      left: scrollbarRef.current.getScrollLeft()
    })
  }));

  return (
    <Scrollbars
      style={{
        width: converLayout(width),
        height: converLayout(height),
        color: "#0a73ff"
      }}
      renderThumbVertical={renderThumb}
      renderThumbHorizontal={renderThumb}
      autoHide={autoHide}
      ref={(el) => {
        scrollbarRef.current = el;
      }}
    >
      {props.children}
    </Scrollbars>
  );
}

export default forwardRef(VScrollbar);
