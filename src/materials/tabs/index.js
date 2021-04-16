import React, { useState, useEffect } from "react";
import { Button, Empty } from "antd";
import { connect } from "react-redux";

let slideTimer = null;

const VTabs = ({ uniqueId, options, dispatch }) => {
  const [current, setCurrent] = useState("");
  let {
    btnMargin,
    tabToChart,
    btnType,
    openSlide,
    slideInterval,
    defaultColor,
    defaultBgColor,
    activeColor,
    activeBgColor,
    fontSize,
    defaultTab
  } = options;

  useEffect(() => {
    setCurrent(defaultTab);
    defaultTab && onClickHandle(defaultTab);
  }, [defaultTab]);

  useEffect(() => {
    return () => {
      dispatch({ type: "tab/dependencies", data: [] });
      dispatch({ type: "tab/component", data: [] });
    };
  }, [uniqueId]);

  useEffect(() => {
    openSlide && slide();
  }, [current, slideInterval, openSlide, tabToChart]);

  // 轮播循环处理
  const slide = () => {
    clearInterval(slideTimer);

    let _tabToChart = (tabToChart || []).map((t) => t.id);
    _tabToChart.length &&
      (slideTimer = setInterval(() => {
        let t = _tabToChart.indexOf(current || _tabToChart[0]) || 0,
          _index = (t + 1) % _tabToChart.length;

        onClickHandle(_tabToChart[_index]);
      }, slideInterval || 2e3));
  };

  const onClickHandle = (rowId) => {
    if (rowId === current) return;
    setCurrent(rowId);

    let _mapping = tabToChart.find((e) => e.id === rowId).mapping;
    let _components = [];

    _components.push({
      id: rowId,
      mapping: _mapping
    }) && dispatch({ type: "tab/dependencies", data: _components });
  };

  if (tabToChart.length === 0) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="请配置要关联的图表" />;
  }

  if (btnType === "disperse") {
    return (
      <div className="gc-flex">
        {tabToChart.map((m, n) => {
          return (
            <Button
              key={n}
              style={{
                height: "100%",
                shadowBulr: 4,
                margin: `0 ${btnMargin / 2}px`,
                padding: "10px 20px",
                fontSize: fontSize,
                color: current === m.id ? activeColor || "#ffffff" : defaultColor,
                backgroundColor: current === m.id ? activeBgColor || "#40a9f" : defaultBgColor,
                borderColor: current === m.id ? activeBgColor || "#40a9f" : defaultBgColor
              }}
              size="large"
              onClick={() => onClickHandle(m.id)}
            >
              {m.name || "未命名"}
            </Button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="gc-flex">
      <Button.Group
        style={{
          shadowBulr: 4
        }}
        size="large"
      >
        {tabToChart.map((m, n) => {
          return (
            <Button
              key={n}
              style={{
                height: "100%",
                padding: "10px 20px",
                fontSize: fontSize,
                color: current === m.id ? activeColor || "#ffffff" : defaultColor,
                backgroundColor: current === m.id ? activeBgColor || "#40a9f" : defaultBgColor,
                borderColor: current === m.id ? activeBgColor || "#40a9f" : defaultBgColor
              }}
              onClick={() => onClickHandle(m.id)}
            >
              {m.name || "未命名"}
            </Button>
          );
        })}
      </Button.Group>
    </div>
  );
};

export default connect((state) => ({
  tabDependencies: state.tab.dependencies
}))(VTabs);
