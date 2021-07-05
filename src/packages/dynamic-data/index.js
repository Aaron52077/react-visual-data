import React, { Fragment, useRef, useEffect, createContext } from "react";
import { Modal, Drawer, Space, Button, Divider, Row, Col, Select, Form } from "antd";
import { connect } from "react-redux";
import { MonacoEditor } from "~components";
import { useSet } from "~hooks/useSet";
import { echartBarAPI } from "@/api";

const { Option } = Select;
const Compose = createContext();

const layout = {
  labelCol: {
    span: 24
  },
  wrapperCol: {
    span: 24
  }
};

/**
 * 数据管理数据
 * @param {value} 数据
 * @param {onChange} 通过刷新数据改变
 */
const DataSource = ({ name, value, options, onChange, api }) => {
  const codeRef = useRef();
  const [state, dispath] = useSet({
    typeOf: "json",
    visible: false,
    visible1: false,
    disabled: true,
    code: { data: null },
    apiValue: null,
    apiList: api
  });

  useEffect(() => {
    dispath({
      typeOf: value.dataType,
      code: value.data
    });
  }, []);

  const handleOk = () => {
    echartBarAPI({ code: "// try to write code somewhere 😈" }).then((res) => {
      dispath({
        disabled: false,
        code: res.data
      });
    });
  };

  const handleChange = (value) => {
    dispath({
      typeOf: value
    });
  };

  const onChangeApi = (value) => {
    const result = state.apiList.find((item) => item.id === value).data;
    dispath({
      apiValue: value,
      code: result
    });
  };

  return (
    <Compose.Provider value={{ state, dispath }}>
      <Form {...layout} style={{ marginTop: 5 }}>
        <Form.Item label="数据源类型">
          <Select value={state.typeOf} onChange={handleChange}>
            <Option value="json">JSON数据</Option>
            <Option value="api">API接口</Option>
          </Select>
        </Form.Item>
        {state.typeOf === "json" && (
          <Fragment>
            <MonacoEditor ref={codeRef} height={options.height} language="json" value={value.data} />
            <Space size="small" style={{ marginTop: 10 }}>
              <Button
                type="primary"
                onClick={() => {
                  dispath({
                    visible1: true,
                    code: codeRef.current.getValue()
                  });
                }}
              >
                调试
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  let _value = Object.assign(value, {
                    dataType: state.typeOf,
                    data: codeRef.current.getValue()
                  });

                  onChange(name, _value);
                }}
              >
                刷新数据
              </Button>
            </Space>
          </Fragment>
        )}

        {state.typeOf === "api" && (
          <Form.Item label="数据模型">
            <Select
              placeholder="请选择数据模型"
              defaultValue={state.apiValue}
              showSearch
              filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              onChange={onChangeApi}
            >
              {state.apiList.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
            <Space size="small" style={{ marginTop: 15 }}>
              <Button
                type="primary"
                onClick={() => {
                  dispath({
                    visible1: true
                  });
                }}
              >
                调试
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  let _value = Object.assign(value, {
                    dataType: state.typeOf,
                    data: state.code
                  });
                  onChange(name, _value);
                }}
              >
                刷新数据
              </Button>
            </Space>
          </Form.Item>
        )}
      </Form>
      {/* 查询 */}
      <Modal
        visible={state.visible}
        width={1080}
        destroyOnClose={true}
        closable={false}
        title="请求数据"
        footer={[
          <Button key="request" type="dashed" onClick={handleOk}>
            调试
          </Button>,
          <Button
            key="cancel"
            onClick={() => {
              dispath({
                visible: false,
                code: { data: null }
              });
            }}
          >
            取消
          </Button>,
          <Button
            key="ok"
            type="primary"
            disabled={state.disabled}
            onClick={() => {
              dispath({
                visible: false,
                code: { data: null }
              });

              onChange(state.code);
            }}
          >
            更新
          </Button>
        ]}
      >
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Divider orientation="left" plain>
              查询表达式
            </Divider>
            <MonacoEditor height={300} language="mysql" value="// try to write code somewhere 😈" />
          </Col>
          <Col span={12}>
            <Divider orientation="left" plain>
              格式化后结果
            </Divider>
            <MonacoEditor height={300} value={state.code} readOnly={true} />
          </Col>
        </Row>
      </Modal>
      {/* 调试 */}
      <Drawer
        visible={state.visible1}
        title="数据响应结果"
        width={400}
        placement="right"
        onClose={() => {
          dispath({ visible1: false });
        }}
      >
        <MonacoEditor height={800} value={state.code} readOnly={true} />
      </Drawer>
    </Compose.Provider>
  );
};

export default connect((state) => ({
  api: state.component.api,
  sql: state.component.sql
}))(DataSource);
