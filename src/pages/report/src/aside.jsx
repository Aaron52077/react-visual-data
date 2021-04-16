import React, { Fragment, useRef, useState, useEffect, useMemo } from "react";
import { Collapse, Tree, Select, Card, Col, Row } from "antd";
import { connect } from "react-redux";
import { IconFont, Scrollbar, SplitPanel } from "~components";
import { useTools, useStore } from "~common/hooks";
import { FORM_ID } from "~common/constants";
import assemblyData from "../data";
import { widgets } from "~materials";
import { generatorField } from "~renderer/utils";
import { FORM_CONTAINER_CONF } from "../data/default";
const { VERSION } = window.appConfig;

/**
 * 分类组件栏
 * @param {*} mode 组件模式 component 组件/ form 表单
 * @param {*} list 组件列表
 */
const SubEnumField = connect((state) => ({
  conditions: state.form.conditions
}))(({ list, conditions, dispatch }) => {
  const { state, setState } = useTools();

  const createChartField = (config) => {
    try {
      const { components, fieldId } = generatorField(state.components, "grid", config);

      setState({ tabsKey: "base", components: components });
      dispatch({ type: "component/activeKey", data: fieldId });
      dispatch({ type: "component/fieldType", data: "component" });
      dispatch({ type: "form/dependencies", data: components.map((item) => item.uniqueId) });
    } catch (error) {
      console.log(`组件创建失败，${error}`);
    }
  };

  const createFormField = (config) => {
    try {
      let _components;
      const { components, fieldId } = generatorField(conditions, "form", config);

      // TODO: 识别是否有表单容器、有且只有一个
      _components = state.components.some((item) => item.type === "container")
        ? state.components
        : [...state.components, { ...FORM_CONTAINER_CONF, uniqueId: FORM_ID }];

      setState({ tabsKey: "base", components: _components });
      dispatch({ type: "component/activeKey", data: fieldId });
      dispatch({ type: "component/fieldType", data: "form" });
      dispatch({ type: "form/conditions", data: components });
    } catch (error) {
      console.log(`表单创建失败，${error}`);
    }
  };

  const createField = (element) => {
    // TODO：识别当前新建元件是否为表单控件
    const isFormField = Object.keys(widgets).some((item) => item === element.type);
    isFormField ? createFormField(element) : createChartField(element);
  };

  return (
    <Row gutter={10}>
      {list.map((ele, idx) => {
        return (
          <Col span={12} key={`${idx}`} className="silder-item">
            <Card
              hoverable
              cover={ele.icon ? <img alt="AutoComplete" src={`./static/component/${ele.icon}.png`} /> : null}
              bodyStyle={{
                padding: "10px 5px",
                fontSize: 12
              }}
              onClick={() => {
                createField(ele);
              }}
            >
              <Card.Meta description={ele.name} />
            </Card>
          </Col>
        );
      })}
    </Row>
  );
});

/**
 * 枚举组件
 * @param {*} value 搜索值
 */
function EnumFields({ value }) {
  const componentTools = useRef([
    {
      key: "form",
      name: "过滤条件",
      icon: "WindowsOutlined",
      list: assemblyData.query
    },
    {
      key: "bar",
      name: "柱状图",
      icon: "BarChartOutlined",
      list: assemblyData.bar
    },
    {
      key: "line",
      name: "线形图",
      icon: "LineChartOutlined",
      list: assemblyData.line
    },
    {
      key: "pie",
      name: "饼状图",
      icon: "PieChartOutlined",
      list: assemblyData.pie
    },
    {
      key: "map",
      name: "地图",
      icon: "HeatMapOutlined",
      list: assemblyData.map
    },
    {
      key: "border",
      name: "边框",
      icon: "WindowsOutlined",
      list: assemblyData.border
    }
  ]).current;

  const displayField = useMemo(() => {
    return assemblyData.total.filter((ele) => ele.name === value);
  }, [value]);

  return displayField && displayField.length === 0 ? (
    <div className="silder-tab">
      <Collapse defaultActiveKey="form" expandIconPosition="right" accordion>
        {componentTools.map((item) => (
          <Collapse.Panel
            header={
              <Fragment>
                <IconFont antd={true} style={{ marginRight: 5 }} type={item.icon} />
                {item.name}
              </Fragment>
            }
            key={item.key}
          >
            <SubEnumField list={item.list} />
          </Collapse.Panel>
        ))}
      </Collapse>
    </div>
  ) : (
    <SubEnumField list={displayField} />
  );
}

// 组件市场汇总
function FieldMarkets({ activeKey, conditions, dispatch }) {
  const [cname, setcname] = useState("");
  const [layer, setLayer] = useState([
    {
      title: "图层",
      key: "-",
      children: []
    }
  ]);
  const { state, setState } = useTools();
  const { view } = useStore();

  useEffect(() => {
    let treeList = [
      {
        title: "图层",
        key: "-",
        children: state.components
          .filter((m) => m.type !== "container")
          .map((m) => ({
            key: m.uniqueId,
            title: m.name,
            isLeaf: true
          }))
      }
    ];
    // todo: 过滤条件和图层分块显示
    if (conditions.length > 0) {
      treeList.unshift({
        title: "过滤条件",
        key: "__form__",
        children: conditions.map((m) => ({
          key: m.uniqueId,
          title: m.name,
          isLeaf: true
        }))
      });
    }
    // 最终图层面板
    setLayer(treeList);
  }, [activeKey]);

  const onChange = (value) => {
    setcname(value);
  };

  const onSelect = (keys) => {
    setState({ tabsKey: "base" });
    dispatch({ type: "component/activeKey", data: keys.join("") });
  };

  return (
    <aside className={view.layerCollapsed ? "gc-design__silder is-show" : "gc-design__silder"}>
      <SplitPanel mode="horizontal" minSize={180} maxSize={600}>
        <div className="silder-tree">
          <Scrollbar>
            <Card title="报表设计器（自适应布局）" bordered={false}>
              <Tree.DirectoryTree
                defaultExpandAll
                expandAction={false}
                selectedKeys={[activeKey]}
                onSelect={onSelect}
                treeData={layer}
              />
            </Card>
          </Scrollbar>
        </div>
        <div className="silder-components">
          <Scrollbar>
            <Card title={`组件 （当前版本：${VERSION}）`} bordered={false}>
              <Select
                className="silder-select"
                showSearch={true}
                allowClear={true}
                placeholder="查找对应组件"
                optionFilterProp="children"
                onChange={onChange}
                filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                {assemblyData.total.map((item) => {
                  return (
                    <Select.Option value={item.name} key={item.name}>
                      {item.name}
                    </Select.Option>
                  );
                })}
              </Select>
              <EnumFields value={cname} />
            </Card>
          </Scrollbar>
        </div>
      </SplitPanel>
    </aside>
  );
}

export default connect((state) => ({
  activeKey: state.component.activeKey,
  conditions: state.form.conditions
}))(FieldMarkets);
