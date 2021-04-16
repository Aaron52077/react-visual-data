import React from "react";
import cx from "classnames";
import Panel from "./panel";
import Resizer from "./resizer";

function unFocus(document, window) {
  if (document.selection) {
    document.selection.empty();
  } else {
    try {
      window.getSelection().removeAllRanges();
      // eslint-disable-next-line no-empty
    } catch (e) {}
  }
}

function getDefaultSize(defaultSize, minSize, maxSize, draggedSize) {
  if (typeof draggedSize === "number") {
    const min = typeof minSize === "number" ? minSize : 0;
    const max = typeof maxSize === "number" && maxSize >= 0 ? maxSize : Infinity;
    return Math.max(min, Math.min(max, draggedSize));
  }
  if (defaultSize !== undefined) {
    return defaultSize;
  }
  return minSize;
}

function removeNullChildren(children) {
  return React.Children.toArray(children).filter((c) => c);
}

class SplitPanel extends React.Component {
  constructor(props) {
    super(props);

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);

    // order of setting panel sizes.
    // 1. size
    // 2. getDefaultSize(defaultSize, minsize, maxSize)

    const { size, defaultSize, minSize, maxSize, primary } = props;

    const initialSize = size !== undefined ? size : getDefaultSize(defaultSize, minSize, maxSize, null);

    this.state = {
      active: false,
      resized: false,
      pane1Size: primary === "first" ? initialSize : undefined,
      pane2Size: primary === "second" ? initialSize : undefined,

      // these are props that are needed in static functions. ie: gDSFP
      instanceProps: {
        size
      }
    };
  }

  componentDidMount() {
    document.addEventListener("mouseup", this.onMouseUp);
    document.addEventListener("mousemove", this.onMouseMove);
    document.addEventListener("touchmove", this.onTouchMove);
    this.setState(SplitPanel.getSizeUpdate(this.props, this.state));
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return SplitPanel.getSizeUpdate(nextProps, prevState);
  }

  componentWillUnmount() {
    document.removeEventListener("mouseup", this.onMouseUp);
    document.removeEventListener("mousemove", this.onMouseMove);
    document.removeEventListener("touchmove", this.onTouchMove);
  }

  onMouseDown(event) {
    const eventWithTouches = Object.assign({}, event, {
      touches: [{ clientX: event.clientX, clientY: event.clientY }]
    });
    this.onTouchStart(eventWithTouches);
  }

  onTouchStart(event) {
    const { allowResize, onDragStarted, mode } = this.props;
    if (allowResize) {
      unFocus(document, window);
      const position = mode === "vertical" ? event.touches[0].clientX : event.touches[0].clientY;

      if (typeof onDragStarted === "function") {
        onDragStarted();
      }
      this.setState({
        active: true,
        position
      });
    }
  }

  onMouseMove(event) {
    const eventWithTouches = Object.assign({}, event, {
      touches: [{ clientX: event.clientX, clientY: event.clientY }]
    });
    this.onTouchMove(eventWithTouches);
  }

  onTouchMove(event) {
    const { allowResize, maxSize, minSize, onChange, mode, step } = this.props;
    const { active, position } = this.state;

    if (allowResize && active) {
      unFocus(document, window);
      const isPrimaryFirst = this.props.primary === "first";
      const ref = isPrimaryFirst ? this.pane1 : this.pane2;
      const ref2 = isPrimaryFirst ? this.pane2 : this.pane1;
      if (ref) {
        const node = ref;
        const node2 = ref2;

        if (node.getBoundingClientRect) {
          const width = node.getBoundingClientRect().width;
          const height = node.getBoundingClientRect().height;
          const current = mode === "vertical" ? event.touches[0].clientX : event.touches[0].clientY;
          const size = mode === "vertical" ? width : height;
          let positionDelta = position - current;
          if (step) {
            if (Math.abs(positionDelta) < step) {
              return;
            }
            // Integer division
            // eslint-disable-next-line no-bitwise
            positionDelta = ~~(positionDelta / step) * step;
          }
          let sizeDelta = isPrimaryFirst ? positionDelta : -positionDelta;

          const pane1Order = parseInt(window.getComputedStyle(node).order);
          const pane2Order = parseInt(window.getComputedStyle(node2).order);
          if (pane1Order > pane2Order) {
            sizeDelta = -sizeDelta;
          }

          let newMaxSize = maxSize;
          if (maxSize !== undefined && maxSize <= 0) {
            const splitPane = this.splitPane;
            if (mode === "vertical") {
              newMaxSize = splitPane.getBoundingClientRect().width + maxSize;
            } else {
              newMaxSize = splitPane.getBoundingClientRect().height + maxSize;
            }
          }

          let newSize = size - sizeDelta;
          const newPosition = position - positionDelta;

          if (newSize < minSize) {
            newSize = minSize;
          } else if (maxSize !== undefined && newSize > newMaxSize) {
            newSize = newMaxSize;
          } else {
            this.setState({
              position: newPosition,
              resized: true
            });
          }

          if (onChange) onChange(newSize);

          this.setState({
            draggedSize: newSize,
            [isPrimaryFirst ? "pane1Size" : "pane2Size"]: newSize
          });
        }
      }
    }
  }

  onMouseUp() {
    const { allowResize, onDragFinished } = this.props;
    const { active, draggedSize } = this.state;
    if (allowResize && active) {
      if (typeof onDragFinished === "function") {
        onDragFinished(draggedSize);
      }
      this.setState({ active: false });
    }
  }

  // we have to check values since gDSFP is called on every render and more in StrictMode
  static getSizeUpdate(props, state) {
    const newState = {};
    const { instanceProps } = state;

    if (instanceProps.size === props.size && props.size !== undefined) {
      return {};
    }

    const newSize =
      props.size !== undefined
        ? props.size
        : getDefaultSize(props.defaultSize, props.minSize, props.maxSize, state.draggedSize);

    if (props.size !== undefined) {
      newState.draggedSize = newSize;
    }

    const isPane1Primary = props.primary === "first";

    newState[isPane1Primary ? "pane1Size" : "pane2Size"] = newSize;
    newState[isPane1Primary ? "pane2Size" : "pane1Size"] = undefined;

    newState.instanceProps = { size: props.size };

    return newState;
  }

  render() {
    const {
      allowResize,
      children,
      className,
      onResizerClick,
      onResizerDoubleClick,
      paneClassName,
      pane1ClassName,
      pane2ClassName,
      paneStyle,
      pane1Style: pane1StyleProps,
      pane2Style: pane2StyleProps,
      resizerStyle,
      mode,
      style: styleProps,
      hover
    } = this.props;

    const { pane1Size, pane2Size } = this.state;

    const disabledClass = allowResize ? "" : "disabled";

    const notNullChildren = removeNullChildren(children);

    const style = {
      display: "flex",
      flex: 1,
      height: "100%",
      position: "absolute",
      outline: "none",
      overflow: "hidden",
      MozUserSelect: "text",
      WebkitUserSelect: "text",
      msUserSelect: "text",
      userSelect: "text",
      ...styleProps
    };

    if (mode === "vertical") {
      Object.assign(style, {
        flexDirection: "row",
        left: 0,
        right: 0
      });
    } else {
      Object.assign(style, {
        bottom: 0,
        flexDirection: "column",
        minHeight: "100%",
        top: 0,
        width: "100%"
      });
    }

    const pane1Style = { ...paneStyle, ...pane1StyleProps };
    const pane2Style = { ...paneStyle, ...pane2StyleProps };

    const classes = cx({
      [`${mode}`]: mode,
      [`${className}`]: className,
      [`${disabledClass}`]: disabledClass
    });

    const pane1Classes = cx({
      [`${paneClassName}`]: paneClassName,
      [`${pane1ClassName}`]: pane1ClassName
    });

    const pane2Classes = cx({
      [`${paneClassName}`]: paneClassName,
      [`${pane2ClassName}`]: pane2ClassName
    });

    return (
      <div
        className={classes}
        ref={(node) => {
          this.splitPane = node;
        }}
        style={style}
      >
        <Panel
          className={pane1Classes}
          key="panel1"
          eleRef={(node) => {
            this.pane1 = node;
          }}
          size={pane1Size}
          mode={mode}
          style={pane1Style}
        >
          {notNullChildren[0]}
        </Panel>
        <Resizer
          className={disabledClass}
          onClick={onResizerClick}
          onDoubleClick={onResizerDoubleClick}
          onMouseDown={this.onMouseDown}
          onTouchStart={this.onTouchStart}
          onTouchEnd={this.onMouseUp}
          key="resizer"
          mode={mode}
          style={resizerStyle || {}}
          hover={hover}
        />
        <Panel
          className={pane2Classes}
          key="panel2"
          eleRef={(node) => {
            this.pane2 = node;
          }}
          size={pane2Size}
          mode={mode}
          style={pane2Style}
        >
          {notNullChildren[1]}
        </Panel>
      </div>
    );
  }
}

SplitPanel.defaultProps = {
  allowResize: true,
  minSize: 50,
  primary: "first",
  mode: "vertical",
  hover: false,
  paneClassName: "",
  pane1ClassName: "",
  pane2ClassName: ""
};

export default SplitPanel;
