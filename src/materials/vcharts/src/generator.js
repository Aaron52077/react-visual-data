import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { Vcharts } from "~components";
import allOptions from "../options";
import SubDialog from "../../dialog";
import { echartBarAPI } from "@/api";
import { isEmpty } from "~utils/helper";

function getFieldOption(type) {
  let optionCanRedefine = false;
  let callback = allOptions[type];

  if (callback) {
    optionCanRedefine = !!callback;
  }

  return {
    optionCanRedefine,
    callback: callback || null
  };
}

function GeneratorVCharts({ uniqueId, type, value, options, onChange, ...rest }) {
  if (isEmpty(value.dataConfig.data)) return null;
  const [dataSource, setDataSource] = useState({});
  const [stauts, setStauts] = useState(false);
  const [visible, setVisible] = useState(false);
  const { dataConfig, isRefresh, refreshTime } = value;
  const { mode, drilldowns, dependencies, dispatch } = rest;
  let getOptions = useMemo(() => getFieldOption(type), [type]);

  useEffect(() => {
    setDataSource(dataConfig.data);
  }, [dataConfig.data]);

  useEffect(() => {
    setStauts(!stauts);
  }, [value.drillDownOpen, value.dependenceOpen, isRefresh]);

  useEffect(() => {
    let recordTimeInterval;
    if (mode === "preview" && isRefresh) {
      recordTimeInterval = setInterval(() => {
        echartBarAPI().then((res) => {
          console.log("res", res.data);
          setDataSource(res.data);
        });
      }, refreshTime * 1000);
    }

    return () => {
      clearInterval(recordTimeInterval);
    };
  }, [mode]);

  useEffect(() => {
    // TODO：刷新清空联动集合ids
    if (dependencies.includes(uniqueId)) {
      echartBarAPI().then((res) => {
        setDataSource(res.data);
        setStauts(true);
        dispatch({ type: "component/dependencies", data: [] });
      });
    } else {
      setStauts(false);
    }
  }, [dependencies]);

  const onDialogCancel = (e) => {
    e.stopPropagation();
    // TODO: 解锁图层
    if (mode === "development" && onChange) {
      onChange({ isLock: false }, 0);
    }
    // TODO: 下钻过滤参数条件
    drilldowns.pop();
    dispatch({ type: "component/drilldown", data: drilldowns });
    setVisible((o) => !o);
  };

  // TODO：下钻模态框
  const subDialogTpl = useMemo(() => {
    return visible && value.drillDown && value.drillDown.length > 0 ? (
      <SubDialog
        visible={visible}
        value={value.drillDown[0]}
        key={value.drillDown[0].uniqueId}
        onRowValueChange={onChange}
        onCancel={onDialogCancel}
      />
    ) : null;
  }, [visible, onChange]);

  let onDrillDownClick = {
    click: (param) => {
      if (value.drillDown.length === 0) return;
      // TODO: 锁住图层
      if (mode === "development" && onChange) {
        onChange({ isLock: true }, 0);
      }

      dispatch({
        type: "component/drilldown",
        data: drilldowns.concat([
          {
            name: param.name,
            value: param.value,
            category: param.seriesName,
            _default: param.name
          }
        ])
      });
      setVisible(true);
    }
  };

  let onDependenceClick = {
    click: () => {
      if (value.dependence.length === 0) return;
      dispatch({ type: "component/dependencies", data: dependencies.concat(value.dependence) });
    }
  };

  if (!getOptions.optionCanRedefine) return null;

  // 开启下钻
  if (value.drillDownOpen) {
    return (
      <>
        {subDialogTpl}
        <Vcharts
          refresh={stauts}
          options={getOptions.callback(options, dataSource)}
          theme="dark"
          onEvents={onDrillDownClick}
        />
      </>
    );
  }

  // 开启联动
  if (value.dependenceOpen) {
    return (
      <Vcharts
        refresh={stauts}
        options={getOptions.callback(options, dataSource)}
        theme="dark"
        onEvents={onDependenceClick}
      />
    );
  }

  return <Vcharts refresh={stauts} options={getOptions.callback(options, dataSource)} theme="dark" />;
}

export default connect((state) => ({
  mode: state.component.mode,
  drilldowns: state.component.drilldown,
  dependencies: state.component.dependencies
}))(GeneratorVCharts);
