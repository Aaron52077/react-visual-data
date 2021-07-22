import React, { useMemo } from "react";
import { Tabs } from "antd";
import { connect } from "react-redux";
import cx from "classnames";
import SchemaRender from "@/form-render";
import PageLayout from "./page";
import { useDesigner, useView } from "~hooks/useDesigner";
import { getFieldConf, mergeFieldConfig, setLevelPath } from "../renderer/utils";
import { screenToSchema } from "../configuration-schema";

const FieldSetConf = ({ selected }) => {
  const { state, setState } = useDesigner();
  const { view } = useView();

  const classNames = cx("gc-design__setting", {
    "is-show": view.settingCollapsed
  });

  const currentConf = useMemo(() => {
    if (state.components.length > 0 && selected !== "-") {
      try {
        // TODO: 获取物料组件配置项
        const currentField = getFieldConf(state.components, selected);

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
  }, [selected, state.tabsKey]);

  if (selected === "-") {
    return (
      <div className={classNames}>
        <PageLayout />
      </div>
    );
  }

  const onValueChange = (value) => {
    let results = mergeFieldConfig(state.components, { parentId: selected }, value);
    setLevelPath(results, null);
    setState({ components: results });
  };

  return (
    <div className={classNames}>
      <Tabs
        className="setting-panel"
        size="large"
        tabPosition="right"
        selected={state.tabsKey}
        onTabClick={(key) => {
          setState({ tabsKey: key });
        }}
      >
        {currentConf.configs.map((item) => (
          <Tabs.TabPane tab={item.name} key={item.key}>
            {state.tabsKey === item.key && (
              <SchemaRender
                cname={currentConf.cname}
                cid={currentConf.cid}
                schema={item.schema}
                formData={currentConf.value}
                onChange={onValueChange}
              />
            )}
          </Tabs.TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default connect((state) => ({
  selected: state.component.selected
}))(FieldSetConf);
