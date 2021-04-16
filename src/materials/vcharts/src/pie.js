import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { Vcharts } from "~components";
import SubDialog from "../../dialog";
import getOption from "../options/pie";
import { isEmpty } from "~utils/helper";

const GeneratorPie = ({ value, options, onChange, mode, drilldowns, dispatch }) => {
  if (isEmpty(value.dataConfig.data)) return null;
  const [dataSource, setDataSource] = useState({});
  const [stauts, setStauts] = useState(false);
  const [visible, setVisible] = useState(false);
  const { dataConfig, isRefresh, drillDownOpen } = value;

  useEffect(() => {
    setDataSource(dataConfig.data);
  }, [dataConfig.data.series]);

  useEffect(() => {
    setStauts(drillDownOpen);
  }, [drillDownOpen]);

  let currentOption = getOption(options, dataConfig.data);

  const subDialogTpl = useMemo(() => {
    return visible && value.drillDown && value.drillDown.length > 0 ? (
      <SubDialog
        visible={visible}
        value={value.drillDown[0]}
        onRowValueChange={onChange}
        onCancel={(e) => {
          e.stopPropagation();
          // TODO: 解锁图层
          mode === "development" && value.drillDown[0].drillDownLevel === 0 && onChange({ isLock: false }, 0);
          // TODO: 下钻过滤参数条件
          drilldowns.pop();
          dispatch({ type: "component/drilldown", data: drilldowns });
          setVisible((o) => !o);
        }}
      />
    ) : null;
  }, [visible, onChange]);

  if (drillDownOpen) {
    return (
      <>
        {subDialogTpl}
        <Vcharts
          refresh={stauts}
          options={currentOption.options}
          onChartReady={(echart) => {
            currentOption.callback && currentOption.callback(echart);
          }}
          theme="dark"
          onEvents={{
            click: (param) => {
              if (value.drillDown.length === 0) return;
              // TODO: 锁住图层
              mode === "development" && onChange({ isLock: true }, 0);
              dispatch({
                type: "component/drilldown",
                data: drilldowns.concat([
                  {
                    fireKey: "",
                    item: {
                      name: param.name,
                      value: param.value,
                      category: param.seriesName,
                      _default: param.name
                    }
                  }
                ])
              });

              setVisible(true);
            }
          }}
        />
      </>
    );
  }

  return (
    <Vcharts
      refresh={isRefresh}
      options={currentOption.options}
      onChartReady={(echart) => {
        currentOption.callback && currentOption.callback(echart);
      }}
      theme="dark"
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default connect((state) => ({
  mode: state.component.mode,
  drilldowns: state.component.drilldown,
  dependencies: state.component.dependencies
}))(GeneratorPie);
