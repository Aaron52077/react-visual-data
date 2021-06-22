/**
 * 基于ECharts4的简单封装 fork自https://github.com/hustcc/echarts-for-react/blob/master/src/core.jsx
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { isEqual, debounce } from "lodash";
import { onEvent, offEvent } from "~utils";
import { resizeSensor } from "~utils/resize-sensor";

export default class VEchartsCore extends Component {
  constructor(props) {
    super(props);
    this.echartsLib = props.echarts; // the echarts object.
    this.echartsElement = null; // echarts div element
  }

  // first add
  componentDidMount() {
    this.rerender();
  }
  // update
  componentDidUpdate(prevProps) {
    // set the echart refresh
    if (!isEqual(prevProps.refresh, this.props.refresh) || !isEqual(prevProps.theme, this.props.theme)) {
      this.dispose();

      this.rerender();
      return;
    }

    const echartObj = this.renderEchartDom();
    // 样式修改的时候，可能会导致大小变化，所以触发一下 resize
    if (!isEqual(prevProps.style, this.props.style) || !isEqual(prevProps.className, this.props.className)) {
      try {
        echartObj.resize();
      } catch (e) {}
    }
  }
  // remove
  componentWillUnmount() {
    this.dispose();
  }

  // 监听图表resize变化
  resizeHandler = debounce(() => {
    const echartObj = this.renderEchartDom();
    echartObj.resize();
  }, 200);
  // 监听侧边导航resize变化
  sidebarResizeHandler = (e) => {
    if (e.propertyName === "width") {
      this.resizeHandler();
    }
  };

  // return the echart object
  getEchartsInstance = () =>
    this.echartsLib.getInstanceByDom(this.echartsElement) ||
    this.echartsLib.init(this.echartsElement, this.props.theme, this.props.opts);

  // dispose echarts
  dispose = () => {
    if (this.echartsElement) {
      try {
        // dispose echarts instance
        this.echartsLib.dispose(this.echartsElement);
        offEvent(window, "resize", this.resizeHandler);
      } catch (e) {
        console.warn(e);
      }
    }
  };

  rerender = () => {
    const { onEvents, onChartReady } = this.props;
    const echartObj = this.renderEchartDom();
    this.bindEvents(echartObj, onEvents || {});

    // on chart ready
    if (typeof onChartReady === "function") this.props.onChartReady(echartObj);

    // on resize
    onEvent(window, "resize", this.resizeHandler);
    if (this.echartsElement) {
      resizeSensor(this.echartsElement, () => {
        try {
          echartObj.resize();
        } catch (e) {
          console.warn(e);
        }
      });
    }
  };

  // bind the events
  bindEvents = (instance, events) => {
    const _bindEvent = (eventName, func) => {
      // ignore the event config which not satisfy
      if (typeof eventName === "string" && typeof func === "function") {
        // binding event
        instance.off(eventName); // 解绑
        instance.on(eventName, (param) => {
          // echart 阻止事件冒泡
          param.event.event.stopPropagation();
          func(param, instance);
        });
      }
    };

    // loop and bind
    for (const eventName in events) {
      if (Object.prototype.hasOwnProperty.call(events, eventName)) {
        _bindEvent(eventName, events[eventName]);
      }
    }
  };

  // render the dom
  renderEchartDom = () => {
    // init the echart object
    const echartObj = this.getEchartsInstance();

    // set the echart option
    echartObj.setOption(this.props.options, true);
    return echartObj;
  };

  render() {
    const { style, className } = this.props;
    const newStyle = { width: "100%", height: "100%", ...style };
    return (
      <div
        ref={(el) => {
          this.echartsElement = el;
        }}
        style={newStyle}
        className={cx("gc-echarts-react", className)}
      />
    );
  }
}

VEchartsCore.propTypes = {
  options: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  echarts: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  refresh: PropTypes.bool,
  style: PropTypes.object,
  className: PropTypes.string,
  theme: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onChartReady: PropTypes.func,
  onEvents: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  opts: PropTypes.shape({
    devicePixelRatio: PropTypes.number,
    renderer: PropTypes.oneOf(["canvas", "svg"]),
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null, undefined, "auto"])]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null, undefined, "auto"])])
  })
};

VEchartsCore.defaultProps = {
  echarts: {},
  refresh: false,
  style: {},
  className: "",
  theme: undefined,
  onChartReady: () => {},
  onEvents: {},
  opts: {}
};
