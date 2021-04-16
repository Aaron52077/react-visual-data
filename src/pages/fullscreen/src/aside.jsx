import React, { Fragment, useRef, useState, useEffect } from "react";
import { Collapse, Tree, Select, Card, Col, Row } from "antd";
import { DragSource } from "react-dnd";
import { IconFont, Scrollbar, SplitPanel } from "~components";
import { connect } from "react-redux";
import { useTools, useStore } from "~common/hooks";
import collections from "../data";
import { DRAGGABLE_COMPONENT } from "~common/constants";

/**
 * 配置项汇总
 */
const { collection } = collections;
const { VERSION } = window.appConfig;

function FieldCard(props) {
  const { node = {}, connectDragPreview, connectDragSource } = props;

  return connectDragPreview(
    connectDragSource(
      <div className="silder-item">
        <Card
          hoverable
          cover={node.icon ? <img alt="AutoComplete" src={`./static/component/${node.icon}.png`} /> : null}
          bodyStyle={{
            padding: "10px 5px",
            fontSize: 12
          }}
        >
          <Card.Meta description={node.name} />
        </Card>
      </div>
    )
  );
}

const FieldProvider = DragSource(
  DRAGGABLE_COMPONENT,
  {
    /**
     * 开始拖拽时触发当前函数
     */
    beginDrag: (props) => ({
      component: props.node
    })
  },
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  })
)(FieldCard);

/**
 * 分类组件栏
 * @param {*} list 组件列表
 */
const SubEnumField = ({ list }) => {
  return (
    <Row gutter={10}>
      {list.map((ele, idx) => {
        return (
          <Col span={12} key={`${idx}`}>
            <FieldProvider node={ele} />
          </Col>
        );
      })}
    </Row>
  );
};

/**
 * 枚举组件
 * @param {*} value 搜索值
 */
const EnumFields = ({ value }) => {
  const componentTools = useRef([
    {
      key: "bar",
      name: "柱状图",
      icon: "BarChartOutlined",
      list: collections.bar
    },
    {
      key: "line",
      name: "线形图",
      icon: "LineChartOutlined",
      list: collections.line
    },
    {
      key: "pie",
      name: "饼状图",
      icon: "PieChartOutlined",
      list: collections.pie
    },
    {
      key: "map",
      name: "地图",
      icon: "HeatMapOutlined",
      list: collections.map
    },
    {
      key: "other",
      name: "其他图表",
      icon: "FundOutlined",
      list: collections.other
    },
    {
      key: "datav",
      name: "辅助组件",
      icon: "WindowsOutlined",
      list: collections.datav
    }
  ]).current;
  const displayField = collection.filter((ele) => ele.name === value);

  return displayField && displayField.length === 0 ? (
    <div className="silder-tab">
      <Collapse defaultActiveKey="bar" expandIconPosition="right" accordion>
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
};

// 组件市场汇总
const FieldMarkets = ({ activeKey, dispatch }) => {
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
    let treeList = state.components.map((m) => {
      return {
        key: m.uniqueId,
        title: m.data.title || "未命名",
        isLeaf: true
      };
    });
    // 最终图层面板
    setLayer([
      {
        title: "图层",
        key: "-",
        children: treeList
      }
    ]);
  }, [activeKey, state.components]);

  const onChange = (value) => {
    setcname(value);
  };

  const onSelect = (keys) => {
    setState({ tabsKey: "base" });
    dispatch({ type: "component/activeKey", data: keys.join("") });
  };

  return (
    <aside className={view.layerCollapsed ? "gc-design__silder is-show" : "gc-design__silder"}>
      <SplitPanel mode="horizontal" minSize={400} maxSize={600}>
        <div className="silder-tree">
          <Scrollbar>
            <Card title="大屏设计器" bordered={false}>
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
                {collection.map((item) => {
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
};

export default connect((state) => ({
  activeKey: state.component.activeKey
}))(FieldMarkets);
