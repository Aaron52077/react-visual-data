import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { Vcharts } from "~components";
import { DynamicDialog, DynamicContent } from "../../dynamic-dialog";
import vchartsOption from "../options";
import { echartBarAPI } from "@/api";
import { isEmpty } from "~utils/helper";

// TODO: 当前type配置项是否有效
function resoleOption(type) {
  let canRedefine = false;
  let callback = vchartsOption[type];

  if (callback) {
    canRedefine = !!callback;
  }

  return {
    canRedefine,
    callback: callback || null
  };
}

function GeneratorVCharts({ uniqueId, type, value, options, onChange, ...rest }) {
  if (isEmpty(value.dataConfig.data)) return null;
  const [dataSource, setDataSource] = useState({});
  const [stauts, setStauts] = useState(false);
  const { dataConfig, isRefresh, refreshTime } = value;
  const { mode, dependencies, drilldowns, dispatch } = rest;

  const getOption = useMemo(() => resoleOption(type), [type]);

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

  if (!getOption.canRedefine) return null;

  // 开启联动
  if (value.dependenceOpen) {
    return (
      <Vcharts
        refresh={stauts}
        options={getOption.callback(options, dataSource)}
        theme="dark"
        onEvents={{
          click: () => {
            if (value.dependence.length === 0) return;
            dispatch({
              type: "component/dependencies",
              data: dependencies.concat(value.dependence)
            });
          }
        }}
      />
    );
  }

  // 开启下钻
  if (value.drillDownOpen) {
    return (
      <Vcharts
        refresh={stauts}
        options={getOption.callback(options, dataSource)}
        theme="dark"
        onEvents={{
          click: (param) => {
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

            DynamicDialog({
              container: "#designer",
              title: value.title,
              content: <DynamicContent value={value.drillDown[0]} />
            });
          }
        }}
      />
    );
  }

  return <Vcharts refresh={stauts} options={getOption.callback(options, dataSource)} theme="dark" />;
}

export default connect((state) => ({
  mode: state.component.mode,
  dependencies: state.component.dependencies,
  drilldowns: state.component.drilldown
}))(GeneratorVCharts);
