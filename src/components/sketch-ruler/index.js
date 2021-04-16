import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import RulerWrapper from "./ruler-wrapper";
import RulerContextMenu from "./ruler-context-menu";
import IconFont from "../iconfont";

import { StyledRuler } from "./styles";

const DEFAULTMENU = {
  bgColor: "#27343e",
  dividerColor: "#3a4659",
  listItem: {
    textColor: "#bcc9d4",
    hoverTextColor: "#bcc9d4",
    disabledTextColor: "#90a0ae",
    bgColor: "#27343e",
    hoverBgColor: "#1b1f25"
  }
};

export default class SketchRuler extends PureComponent {
  constructor(props) {
    super(props);
    const { ratio, palette } = props;
    const menu = palette.menu || DEFAULTMENU;
    this.canvasConfigs = {
      ratio,
      bgColor: palette.bgColor,
      longfgColor: palette.longfgColor,
      shortfgColor: palette.shortfgColor,
      fontColor: palette.fontColor,
      shadowColor: palette.shadowColor,
      lineColor: palette.lineColor
    };
    this.menuConfigs = {
      bgColor: menu.bgColor,
      dividerColor: menu.dividerColor,
      listItem: menu.listItem
    };
    this.state = {
      isShowMenu: false,
      vertical: false,
      positionObj: {
        x: 0,
        y: 0
      }
    };
  }
  onCornerClick = () => {
    const { handleShowReferLine } = this.props;
    handleShowReferLine();
  };
  handleLineChange = (arr, vertical) => {
    const { horLineArr, verLineArr, handleLine } = this.props;
    const newLines = vertical ? { h: horLineArr, v: [...arr] } : { h: [...arr], v: verLineArr };
    handleLine(newLines);
  };
  // 展示右键菜单
  onShowRightMenu = (left, top, vertical) => {
    this.setState({
      isShowMenu: true,
      vertical: vertical,
      positionObj: {
        x: left,
        y: top
      }
    });
  };
  onhandlecloseMenu = () => {
    this.setState({ isShowMenu: false });
  };
  // 取消默认菜单事件
  preventDefault(e) {
    e.preventDefault();
  }
  render() {
    const {
      width,
      height,
      scale,
      handleLine,
      thick,
      shadow,
      startX,
      startY,
      horLineArr,
      verLineArr,
      palette: { bgColor },
      isOpenMenuFeature,
      handleShowRuler,
      isShowReferLine,
      handleShowReferLine
    } = this.props;

    const { positionObj, vertical, isShowMenu } = this.state;

    const { x, y, width: w, height: h } = shadow;

    const commonProps = {
      scale,
      canvasConfigs: this.canvasConfigs,
      onLineChange: this.handleLineChange,
      onShowRightMenu: this.onShowRightMenu,
      isShowReferLine,
      handleShowReferLine
    };

    const menuPosition = {
      left: positionObj.x,
      top: positionObj.y
    };

    return (
      <StyledRuler
        isShowReferLine={isShowReferLine}
        thick={thick}
        {...this.canvasConfigs}
        onContextMenu={this.preventDefault}
      >
        {/* 水平方向 */}
        <RulerWrapper
          width={width}
          height={thick}
          start={startX}
          lines={horLineArr}
          selectStart={x}
          selectLength={w}
          {...commonProps}
        />
        {/* 竖直方向 */}
        <RulerWrapper
          width={thick}
          height={height}
          start={startY}
          lines={verLineArr}
          selectStart={y}
          selectLength={h}
          vertical
          {...commonProps}
        />
        <span className="corner" style={{ backgroundColor: bgColor }} onClick={this.onCornerClick}>
          <IconFont antd={true} type={isShowReferLine ? "EyeOutlined" : "EyeInvisibleOutlined"} />
        </span>
        {isOpenMenuFeature && isShowMenu && (
          <RulerContextMenu
            key={String(menuPosition.left) + String(menuPosition.top)}
            vertical={vertical}
            handleLine={handleLine}
            horLineArr={horLineArr}
            verLineArr={verLineArr}
            menuPosition={menuPosition}
            handleShowRuler={handleShowRuler}
            isShowReferLine={isShowReferLine}
            handleShowReferLine={handleShowReferLine}
            oncloseMenu={this.onhandlecloseMenu}
            menuConfigs={this.menuConfigs}
          />
        )}
      </StyledRuler>
    );
  }
}

SketchRuler.propTypes = {
  scale: PropTypes.number,
  ratio: PropTypes.number,
  thick: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  startX: PropTypes.number,
  startY: PropTypes.number,
  shadow: PropTypes.object,
  horLineArr: PropTypes.array,
  verLineArr: PropTypes.array,
  handleLine: PropTypes.func,
  isOpenMenuFeature: PropTypes.bool,
  handleShowRuler: PropTypes.func,
  isShowReferLine: PropTypes.bool,
  handleShowReferLine: PropTypes.func,
  palette: PropTypes.shape({
    bgColor: PropTypes.string,
    longfgColor: PropTypes.string,
    shortfgColor: PropTypes.string,
    fontColor: PropTypes.string,
    shadowColor: PropTypes.string,
    lineColor: PropTypes.string,
    borderColor: PropTypes.string,
    menu: PropTypes.shape({
      bgColor: PropTypes.string, // menu菜单
      dividerColor: PropTypes.string, // 分割线
      listItem: PropTypes.shape({
        textColor: PropTypes.string, // 文本
        hoverTextColor: PropTypes.string,
        disabledTextColor: PropTypes.string,
        bgColor: PropTypes.string,
        hoverBgColor: PropTypes.string
      })
    })
  })
};

SketchRuler.defaultProps = {
  isOpenMenuFeature: false,
  isShowReferLine: true,
  handleShowRuler: () => {},
  handleShowReferLine: () => {},
  thick: 20,
  horLineValue: [],
  verLineValue: [],
  scale: 1,
  startX: 0,
  startY: 0,
  ratio: window.devicePixelRatio || 1,
  shadow: {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  },
  palette: {
    bgColor: "#0e1013", // ruler bg color
    longfgColor: "#3a4659", // ruler longer mark color
    shortfgColor: "#3a4659", // ruler shorter mark color
    fontColor: "#90a0ae", // ruler font color
    shadowColor: "#E8E8E8", // ruler shadow color
    lineColor: "rgba(0, 173, 255, 0.84)",
    borderColor: "#E8E8E8",
    menu: DEFAULTMENU
  }
};
