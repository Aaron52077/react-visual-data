/**
 * core 编辑器渲染核心代码
 */
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { AxureGrid } from "~renderer";
import AxureLayoutAside from "./src/aside";
import AxureLayoutHeader from "./src/header";
import AxureLayoutContent from "./src/wrapper";
import AxureLayoutField from "./src/setting";
import { dataVGrid, dataVApiList, dataVSqlList } from "@/api";
import { useSet, useDocumentTitle } from "~common/hooks";
import { Ctx, StoreCtx } from "~common/hooks";
import { pathToParam, loadScript } from "~utils";

loadScript("https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css", "css");

// 设计模式组件(components)和条件(conditions)抽离
function DataProvider({ dispatch }) {
  useDocumentTitle("DataV Pro - 数据报表");
  const [state, setState] = useSet({
    tabsKey: "base",
    components: [],
    page: {
      name: "",
      remark: "",
      backgroundMode: "define",
      backgroundColor: "rgba(29, 33, 39, 1)",
      backgroundImage: "",
      backgroundDefine: "background-2.png",
      backgroundBlur: 0,
      backgroundOpacity: 10
    },
    undo: [],
    redo: []
  });

  // 其他无关状态
  const [view, setView] = useSet({
    layerCollapsed: false,
    settingCollapsed: false,
    visible: false
  });

  // 异步多接口请求
  const storageData = async () => {
    try {
      const results = await Promise.all([dataVApiList(), dataVSqlList()]).then((ret) => {
        return ret;
      });
      dispatch({ type: "component/api", data: results[0].data });
      dispatch({ type: "component/sql", data: results[1].data });
    } catch (err) {
      console.warn(err);
    }
  };

  const fetchData = async () => {
    const { data } = await dataVGrid();
    setState({ page: data.page, components: data.components });
    dispatch({ type: "component/activeKey", data: "-" });
    dispatch({ type: "form/conditions", data: data.conditions });
    dispatch({
      type: "form/dependencies",
      data: data.components.filter((m) => m.type !== "container").map((item) => item.uniqueId)
    });
  };

  useEffect(() => {
    dispatch({ type: "component/mode", data: "development" });
    dispatch({ type: "component/drilldown", data: [] });
    dispatch({ type: "component/querys", data: pathToParam() });
    dispatch({ type: "tab/component", data: [] });
    dispatch({ type: "form/parmas", data: [] });

    fetchData();
    storageData();
  }, []);

  return (
    <Ctx.Provider value={{ state, setState }}>
      <StoreCtx.Provider value={{ view, setView }}>
        <div className="gc-design">
          <AxureLayoutHeader />
          <section className="gc-design__bd">
            <AxureLayoutAside title="Axure v2" />
            <AxureLayoutContent {...state.page}>
              <AxureGrid dataGrid={state.components} />
            </AxureLayoutContent>
            <AxureLayoutField />
          </section>
        </div>
      </StoreCtx.Provider>
    </Ctx.Provider>
  );
}

export default connect((state) => ({
  conditions: state.form.conditions
}))(DataProvider);
