import React, { useMemo } from "react";
import { Tabs } from "antd";
import { connect } from "react-redux";
import cx from "classnames";
import { SchemaRender } from "~renderer";
import PageLayout from "./page";
import { useTools, useStore } from "~common/hooks";
import { getFieldConf, mergeFieldConfig, setLevelPath } from "~renderer/utils";
import { screenToSchema } from "../schema";

const { TabPane } = Tabs;

const FieldSetConf = ({ activeKey }) => {
  const { state, setState } = useTools();
  const { view } = useStore();

  const classNames = cx("gc-design__setting", {
    "is-show": view.settingCollapsed
  });

  const currentConf = useMemo(() => {
    if (state.components.length > 0 && activeKey !== "-") {
      try {
        // TODO: 获取物料组件配置项
        const currentField = getFieldConf(state.components, activeKey);

        return {
          cname: currentField.type,
          cid: currentField.uniqueId,
          value: currentField.data,
          configs: screenToSchema.find((o) => o.materials === currentField.type).fields
        };
      } catch (error) {}
    }

    return {
      cname: null,
      cid: null,
      value: {},
      configs: []
    };
  }, [activeKey, state.tabsKey]);

  if (activeKey === "-") {
    return (
      <div className={classNames}>
        <PageLayout />
      </div>
    );
  }

  const onValueChange = (value) => {
    let rootValue = { ...value };

    // 联动、下钻参数变更
    if (value.drillDownOpen) {
      rootValue = {
        ...rootValue,
        dependenceOpen: !value.drillDownOpen
      };
    }

    if (value.dependenceOpen) {
      rootValue = {
        ...rootValue,
        drillDownOpen: !value.dependenceOpen
      };
    }

    let results = mergeFieldConfig(state.components, { parentId: activeKey }, rootValue);
    setLevelPath(results, null);
    setState({ components: results });
  };

  return (
    <div className={classNames}>
      <Tabs
        className="setting-panel"
        size="large"
        tabPosition="right"
        activeKey={state.tabsKey}
        onTabClick={(key) => {
          setState({ tabsKey: key });
        }}
      >
        {currentConf.configs.map((item) => (
          <TabPane tab={item.name} key={item.key}>
            {state.tabsKey === item.key && (
              <SchemaRender
                cname={currentConf.cname}
                cid={currentConf.cid}
                schema={item.schema}
                formData={currentConf.value}
                onChange={onValueChange}
              />
            )}
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default connect((state) => ({
  activeKey: state.component.activeKey
}))(FieldSetConf);
