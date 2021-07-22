import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Ctx, StoreCtx } from "~hooks/useDesigner";
import { useDocumentTitle } from "~hooks/useDocumentTitle";
import { useSet } from "~hooks/useSet";
import { Designer } from "./renderer";
import { mergeFieldConfig, setLevelPath } from "./renderer/utils";
import DesignerAside from "./aside-panel";
import DesignerHeader from "./toollbar/header";
import DesignerContent from "./canvas-graph";
import DesignerField from "./configuration-panel";
import { dataVScreen, dataVApiList } from "@/api";
import { pathToParam, loadScript } from "~utils";

function DataProvider(props) {
  useDocumentTitle("DataV Pro - 数据大屏");
  const [state, setState] = useSet({
    tabsKey: "base",
    components: [],
    page: {
      name: "",
      remark: "",
      pageSize: "large",
      zoom: "scaleX",
      backgroundMode: "define",
      backgroundColor: "rgba(29, 33, 39, 1)",
      backgroundImage: "",
      backgroundDefine: "background-2.png",
      backgroundBlur: 0,
      backgroundOpacity: 10,
      width: 1920,
      height: 1080
    },
    undo: [],
    redo: []
  });

  const [view, setView] = useSet({
    layerCollapsed: false,
    settingCollapsed: false,
    visible: false,
    rulerWidth: 0,
    rulerHeight: 0,
    width: 1366,
    height: 768,
    scale: 1,
    startX: 0,
    startY: 0,
    lines: {
      h: [],
      v: []
    },
    isShowReferLine: true
  });

  // 异步多接口请求
  const storageData = async () => {
    try {
      const results = await Promise.all([dataVApiList()]).then((res) => {
        return res;
      });
      props.dispatch({ type: "component/api", data: results[0].data.data });
    } catch (err) {
      console.warn(err);
    }
  };

  const fetchData = async () => {
    try {
      const {
        data: { page, components }
      } = await dataVScreen();
      setState({ page: page, components: components });
      props.dispatch({ type: "component/selected", data: "-" });
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    // 初始化数据
    props.dispatch({ type: "component/mode", data: "development" });
    props.dispatch({ type: "component/querys", data: pathToParam() });
    loadScript("https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css", "css");
    fetchData();
    storageData();
  }, []);

  const onValueChange = (uniqueId, value, level = 0) => {
    setLevelPath(state.components, null);
    let results = mergeFieldConfig(state.components, { parentId: uniqueId, level: level }, value);
    setState({ components: results });
  };

  return (
    <Ctx.Provider value={{ state, setState }}>
      <StoreCtx.Provider value={{ view, setView }}>
        <DesignerHeader />
        <section className="gc-design__bd" id="designer">
          <DesignerAside />
          <DesignerContent {...state.page}>
            {state.components.length > 0
              ? state.components.map((prop, index) => (
                  <Designer index={index} value={prop} key={prop.uniqueId} onValueChange={onValueChange} />
                ))
              : null}
          </DesignerContent>
          <DesignerField />
        </section>
      </StoreCtx.Provider>
    </Ctx.Provider>
  );
}

export default connect((state) => state.component)(DataProvider);
