import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { AxureScreen } from '~renderer';
import { Ctx, StoreCtx, useSet, useDocumentTitle } from '~common/hooks';
import { mergeFieldConfig, setLevelPath } from '~renderer/utils';
import AxureLayoutAside from './src/aside';
import AxureLayoutHeader from './src/header';
import AxureLayoutContent from './src/wrapper';
import AxureLayoutField from './src/setting';
import { dataVScreen, dataVApiList, dataVSqlList } from '@/api';
import { pathToParam, loadScript } from '~utils';

function DataProvider(props) {
  useDocumentTitle('DataV Pro - 数据大屏');
  // 设计器相关状态
  const [state, setState] = useSet({
    tabsKey: 'base',
    components: [],
    page: {
      name: '',
      remark: '',
      pageSize: 'large',
      zoom: 'scaleX',
      backgroundMode: 'define',
      backgroundColor: 'rgba(29, 33, 39, 1)',
      backgroundImage: '',
      backgroundDefine: 'background-2.png',
      backgroundBlur: 0,
      backgroundOpacity: 10,
      width: 1920,
      height: 1080
    },
    undo: [],
    redo: []
  });

  // 其他无关状态
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
      const results = await Promise.all([dataVApiList(), dataVSqlList()]).then((res) => {
        return res;
      });
      props.dispatch({ type: 'component/api', data: results[0].data.data });
      props.dispatch({ type: 'component/sql', data: results[1].data.data });
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
      props.dispatch({ type: 'component/selected', data: '-' });
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    props.dispatch({ type: 'component/mode', data: 'development' });
    props.dispatch({ type: 'component/querys', data: pathToParam() });

    fetchData();
    storageData();
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css', 'css');
    onbeforeunload = 'return true';
  }, []);

  const onValueChange = (uniqueId, value, level = 0) => {
    setLevelPath(state.components, null);
    let results = mergeFieldConfig(state.components, { parentId: uniqueId, level: level }, value);
    setState({ components: results });
  };

  return (
    <Ctx.Provider value={{ state, setState }}>
      <StoreCtx.Provider value={{ view, setView }}>
        <AxureLayoutHeader />
        <section className="gc-design__bd">
          <DndProvider backend={HTML5Backend}>
            <AxureLayoutAside />
            <AxureLayoutContent {...state.page}>
              {state.components.length > 0
                ? state.components.map((prop) => (
                    <AxureScreen value={prop} key={prop.uniqueId} onValueChange={onValueChange} />
                  ))
                : null}
            </AxureLayoutContent>
            <AxureLayoutField />
          </DndProvider>
        </section>
      </StoreCtx.Provider>
    </Ctx.Provider>
  );
}

export default connect((state) => state.component)(DataProvider);
