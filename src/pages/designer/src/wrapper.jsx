import React, { useEffect, forwardRef, useRef, useMemo, useLayoutEffect } from "react";
import { Space, Button, Tooltip, message } from "antd";
import { useDrop } from "react-dnd";
import { connect } from "react-redux";
import { IconFont, Scrollbar, SketchRuler } from "~components";
import { generatorField } from "~renderer/utils";
import { useAutoResize } from "~hooks/useAutoResize";
import { useView, useDesigner } from "~hooks/useDesigner";
import { THICK, DIMENSION, DRAGGABLE_COMPONENT } from "../constants";
import { round, deepMergeObj } from "~utils/helper";

/**
 * 设计器容器大小
 */
function Wrapper(props, ref) {
  let {
    pageSize,
    customPageSize,
    backgroundMode,
    backgroundColor,
    backgroundImage,
    backgroundDefine,
    backgroundBlur,
    backgroundOpacity
  } = props;
  const { state, setState } = useDesigner();
  const { view, setView } = useView();
  const { width, height, domRef } = useAutoResize(ref);
  const containerRef = useRef(null);

  const { rulerWidth, rulerHeight, scale, startX, startY, lines, isShowReferLine } = view;

  useEffect(() => {
    setView({
      rulerWidth: width ? width : 0,
      rulerHeight: height,
      scale: scaleSize
    });

    return () => {
      setView({
        isShowReferLine: false,
        lines: {
          h: [],
          v: []
        }
      });
    };
  }, [width, height]);

  useLayoutEffect(() => {
    if (pageSize === "custom") {
      // setView({
      //   width: props.customPageSize.width,
      //   height: props.customPageSize.height
      // });
    } else {
      setView({
        width: DIMENSION[pageSize].width,
        height: DIMENSION[pageSize].height
      });
    }
  }, [pageSize]);

  // 计算设计器画布缩放比例
  const scaleSize = useMemo(() => {
    return width ? Math.floor((width / view.width) * 100) / 100 : 1;
  }, [width, view.width]);

  const handleLine = (lines) => {
    setView({ lines });
  };
  // 显示/隐藏 参考线
  const handleShowReferLine = () => {
    setView({ isShowReferLine: !isShowReferLine });
  };

  const containerStyle = {
    width: view.width * scale + "px",
    height: view.height * scale + "px"
  };

  const canvasStyle = {
    width: view.width,
    height: view.height,
    transform: `scale(${scale})`
  };

  const backgroundStyles = useMemo(() => {
    if (backgroundMode === "custom") {
      return backgroundImage ? `url(${backgroundImage}) 0% 0% / 100% 100%` : backgroundColor;
    }

    if (backgroundMode === "define") {
      return `url(./static/templet/${backgroundDefine}) 0% 0% / 100% 100%`;
    }

    return backgroundColor ? backgroundColor : null;
  }, [backgroundMode, backgroundImage, backgroundDefine, backgroundColor]);

  const handleSetting = () => {
    setView({
      isShowReferLine: false,
      lines: {
        h: [],
        v: []
      }
    });
  };

  const onNodeChange = (item) => {
    try {
      const { components, fieldId } = generatorField(state.components, "field", item);
      setState({ tabsKey: "base", components: components });
      props.dispatch({ type: "component/selected", data: fieldId });
    } catch (error) {
      console.log(`组件创建失败，${error}`);
    }
  };

  // 处理组件拖拽落下事件
  const [, dropRef] = useDrop({
    accept: [DRAGGABLE_COMPONENT],
    collect: (monitor) => ({
      isOver: monitor.isOver()
    }),
    drop: (item, monitor) => {
      if (monitor.canDrop()) {
        // 拖动操作正在进行时，返回指针的最后记录的{x，y}client 偏移量。 如果没有拖动项目，则返回 null
        const currentMouseOffset = monitor.getClientOffset();
        // 返回当前拖动操作开始时指针的{x，y} client 偏移量。 如果没有拖动项目，则返回 null
        const sourceMouseOffset = monitor.getInitialClientOffset();
        // 返回当前拖动操作开始时 drag source 组件的根DOM节点的{x，y}client 偏移量。 如果没有拖动项目，则返回 null
        const sourceElementOffset = monitor.getInitialSourceClientOffset();
        const { top, left } = containerRef.current.getValues();
        const diffX = sourceMouseOffset.x - sourceElementOffset.x;
        const diffY = sourceMouseOffset.y - sourceElementOffset.y;
        const x = currentMouseOffset.x - diffX + left;
        const y = currentMouseOffset.y - diffY + top;

        // 组件完成新建工作
        const options = deepMergeObj(item.component, { data: { left: x, top: y } });
        onNodeChange(options);
      } else {
        message.info("实验数据建立中，请稍后再尝试添加节点");
      }
    }
  });

  return (
    <div className="gc-design__wrapper">
      {/* 刻度尺 */}
      <SketchRuler
        THICK={THICK}
        scale={scale}
        width={rulerWidth}
        height={rulerHeight}
        startX={startX}
        startY={startY}
        horLineArr={lines.h}
        verLineArr={lines.v}
        isOpenMenuFeature={true}
        isShowReferLine={isShowReferLine}
        handleLine={handleLine}
        handleShowReferLine={handleShowReferLine}
      />
      <div className="ruler-wrapper" ref={domRef}>
        <Scrollbar
          ref={(el) => {
            containerRef.current = el;
          }}
        >
          <div className="canvas-container design-pannable" style={containerStyle} tabIndex="-1">
            <div className="design-body" ref={dropRef}>
              <div className="design-container" style={canvasStyle}>
                <div
                  className="bg-container"
                  style={{
                    background: backgroundStyles,
                    filter: `blur(${backgroundBlur}px)`,
                    opacity: parseFloat(backgroundOpacity / 10)
                  }}
                />
                {props.children}
              </div>
            </div>
          </div>
        </Scrollbar>
      </div>
      <div className="ruler-tool">
        <Tooltip title="清空所有参考线">
          <Button
            shape="circle"
            size="small"
            icon={<IconFont antd={true} type="SettingOutlined" />}
            onClick={handleSetting}
          />
        </Tooltip>
        <Space>
          <Tooltip title="滚动">
            <Button
              shape="circle"
              size="small"
              icon={<IconFont antd={true} type="ColumnHeightOutlined" />}
              onClick={() => {
                containerRef.current.scrollTo(1000, 1000);
              }}
            />
          </Tooltip>
          <Tooltip title="缩小">
            <Button
              shape="circle"
              size="small"
              icon={<IconFont antd={true} type="ZoomOutOutlined" />}
              onClick={() => {
                setView({ scale: round(Math.max(0.2, scale - 0.1), 2) });
              }}
            />
          </Tooltip>
          <Tooltip title="放大">
            <Button
              shape="circle"
              size="small"
              icon={<IconFont antd={true} type="ZoomInOutlined" />}
              onClick={() => {
                setView({ scale: round(Math.min(2, scale + 0.1), 2) });
              }}
            />
          </Tooltip>
          <Tooltip title="自适应">
            <Button
              shape="circle"
              size="small"
              icon={<IconFont antd={true} type="ExpandOutlined" />}
              onClick={() => {
                setView({ scale: round(scaleSize, 2) });
              }}
            />
          </Tooltip>
        </Space>
      </div>
    </div>
  );
}

export default connect((state) => ({
  selected: state.component.selected
}))(forwardRef(Wrapper));
