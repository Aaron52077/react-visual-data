import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Button, Modal, Tabs, Row, Col, Card } from "antd";
import { connect } from "react-redux";
import { Scrollbar } from "~components";
import { SchemaRender, AxureParser } from "~renderer";
import fetcher from "~materials/hoc";
import subSchemaJson from "./schema-json";

// reset form fields when modal is dirlldown, closed
function WithDialog(props) {
  const { visible, value, mode, onCancel, onRowValueChange } = props;
  const [keys, setKeys] = useState("base");
  const [currentField, setField] = useState({
    cname: "",
    value: {},
    schema: []
  });

  const isDevelop = mode === "development";
  const calculateWidth = `${(value.data?.width / 12) * 100}%`;

  const modalStyle = {
    maxWidth: "100vw",
    minWidth: 800,
    minHeight: 300,
    paddingBottom: 0
  };

  const footer = useMemo(() => {
    return isDevelop
      ? [
          <Button key="back" key="submit" type="primary" onClick={onCancel}>
            确定
          </Button>
        ]
      : null;
  }, [isDevelop]);

  const onDialogChange = useCallback(
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
      onRowValueChange(rootValue, value.data.drillDownLevel);
    },
    [onRowValueChange]
  );

  useEffect(() => {
    visible && setKeys("base");
  }, [visible]);

  useEffect(() => {
    try {
      // TODO: 获取物料组件配置项
      const currentFieldSchema = subSchemaJson.find((o) => o.materials === value.type).fields;

      setField({
        cname: value.type,
        value: value.data,
        schema: currentFieldSchema
      });
    } catch (error) {
      console.warn(`error message. ${error}`);
    }
  }, [value.uniqueId]);

  return (
    <Modal
      title={value.data.title || "未命名"}
      forceRender={true}
      visible={visible}
      destroyOnClose={true}
      maskClosable={false}
      onCancel={onCancel}
      footer={footer}
      width={calculateWidth}
      style={modalStyle}
    >
      <Row>
        {isDevelop ? (
          <>
            <Col span={16} style={{ height: value.data.height || 300 }}>
              <AxureParser value={value} onRowValueChange={onRowValueChange} />
            </Col>
            <Col span={8}>
              <Card
                title="控制面板"
                bodyStyle={{
                  padding: "0 15px",
                  fontSize: 12,
                  minHeight: 600
                }}
              >
                <Tabs
                  activeKey={keys}
                  onTabClick={(key) => {
                    setKeys(key);
                  }}
                >
                  {currentField.schema.map((item) => (
                    <Tabs.TabPane tab={item.name} key={item.key}>
                      <Scrollbar height={600}>
                        {keys === item.key && (
                          <SchemaRender
                            cname={currentField.cname}
                            schema={item.schema}
                            formData={currentField.value}
                            onChange={onDialogChange}
                          />
                        )}
                      </Scrollbar>
                    </Tabs.TabPane>
                  ))}
                </Tabs>
              </Card>
            </Col>
          </>
        ) : (
          <Col span={24}>
            <AxureParser value={value} />
          </Col>
        )}
      </Row>
    </Modal>
  );
}

export default connect((state) => state.component)(fetcher(WithDialog));
