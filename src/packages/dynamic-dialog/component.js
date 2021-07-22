import React, { useState, useEffect, useCallback } from "react";
import { Row, Col, Card, Tabs } from "antd";
import SchemaRender from "@/form-render";
import { subToSchema } from "./configuration-schema";
import { isEmpty } from "~utils/helper";

// reset form fields when modal is dirlldown, closed
function DynamicContent({ value, onRowValueChange }) {
  if (isEmpty(value)) return null;

  const [keys, setKeys] = useState("base");
  const [field, setField] = useState({
    cname: null,
    cid: null,
    value: {},
    configs: []
  });

  useEffect(() => {
    setKeys("base");
    return () => {
      setKeys("base");
    };
  }, []);

  useEffect(() => {
    try {
      // TODO: 获取物料组件配置项
      const currentFieldSchema = subToSchema.find((o) => o.materials === value.type).fields;

      setField({
        cname: value.type,
        cid: value.uniqueId,
        value: value.data,
        configs: currentFieldSchema
      });
    } catch (error) {
      console.log(error);
    }
  }, [value.uniqueId]);

  const onTabClick = (key) => {
    setKeys(key);
  };

  const onValueChange = useCallback(
    (val) => {
      if (!onRowValueChange) return;
      let rootValue = { ...val };

      // 联动、下钻参数变更
      if (val.drillDownOpen) {
        rootValue = {
          ...rootValue,
          dependenceOpen: !val.drillDownOpen
        };
      }

      if (val.dependenceOpen) {
        rootValue = {
          ...rootValue,
          drillDownOpen: !val.dependenceOpen
        };
      }

      onRowValueChange(rootValue, value.data.drillDownLevel, value.uniqueId);
    },
    [onRowValueChange]
  );

  return (
    <Row gutter={15}>
      <Col span={12}>test</Col>
      <Col span={12}>
        <Card
          title="控制面板"
          bodyStyle={{
            padding: "0 15px",
            fontSize: 12,
            minHeight: 600,
            minWidth: 380
          }}
        >
          <Tabs activeKey={keys} onTabClick={onTabClick}>
            {field.configs.map((item) => (
              <Tabs.TabPane tab={item.name} key={item.key}>
                {keys === item.key && (
                  <SchemaRender
                    cname={keys.cname}
                    cid={keys.cid}
                    schema={item.schema}
                    formData={keys.value}
                    onChange={onValueChange}
                  />
                )}
              </Tabs.TabPane>
            ))}
          </Tabs>
        </Card>
      </Col>
    </Row>
  );
}

export default DynamicContent;
