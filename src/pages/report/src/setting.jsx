import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import { connect } from "react-redux";
import { SchemaRender } from "~renderer";
import PageLayout from "./page";
import { allToSchema } from "../schema";
import { useTools, useStore } from "~common/hooks";
import { getFieldConf, mergeFieldConfig, setLevelPath } from "~renderer/utils";

const { TabPane } = Tabs;

const FieldSetConf = ({ activeKey, fieldType, conditions, dispatch }) => {
  const [field, setField] = useState({
    cname: null,
    cid: null,
    value: {},
    schema: []
  });
  const { state, setState } = useTools();
  const { view } = useStore();

  useEffect(() => {
    const allComponents = [...conditions, ...state.components];
    if (allComponents.length > 0 && activeKey !== "-") {
      try {
        // TODO: 获取物料组件配置项
        const currentField = getFieldConf(allComponents, activeKey);
        setField({
          cname: currentField.type,
          cid: currentField.uniqueId,
          value: currentField.data,
          schema: allToSchema[fieldType].find((o) => o.materials === currentField.type).fields
        });
      } catch (error) {
        console.log(`当前组件配置错误! ${error}`);
      }
    }
    return () => {
      setState({ tabsKey: "base" });
    };
  }, [activeKey]);

  const onValueChange = (value) => {
    let result;
    // TODO：表单控件
    if (fieldType === "form") {
      result = mergeFieldConfig(conditions, { parentId: activeKey }, value);
      dispatch({ type: "form/conditions", data: result });
    } else {
      let rootValue = { ...value, drillDownLevel: 0 };

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

      result = mergeFieldConfig(state.components, { parentId: activeKey }, rootValue);
      setLevelPath(result, null);
      setState({ components: result });
    }
  };

  return (
    <div className={view.settingCollapsed ? "gc-design__setting is-show" : "gc-design__setting"}>
      {activeKey === "-" ? (
        <PageLayout />
      ) : (
        <Tabs
          className="setting-panel"
          size="large"
          tabPosition="right"
          activeKey={state.tabsKey}
          onTabClick={(key) => {
            setState({ tabsKey: key });
          }}
        >
          {field.schema.map((item) => (
            <TabPane tab={item.name} key={item.key}>
              <SchemaRender
                cname={field.cname}
                cid={field.cid}
                schema={item.schema}
                formData={field.value}
                onChange={onValueChange}
              />
            </TabPane>
          ))}
        </Tabs>
      )}
    </div>
  );
};

export default connect((state) => ({
  activeKey: state.component.activeKey,
  fieldType: state.component.fieldType,
  conditions: state.form.conditions
}))(FieldSetConf);
