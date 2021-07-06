import React, { useState, useEffect, useRef } from "react";
import { Modal, Button, Form, Space } from "antd";
import { MonacoEditor } from "~components";
import { dataVOpenApi } from "@/api";

const layout = {
  labelCol: {
    span: 24
  },
  wrapperCol: {
    span: 24
  }
};

function CodeCore({ name, cname, value, onChange }) {
  const [code, setCode] = useState("");
  const codeRef = useRef();
  const [visible, setvisible] = useState(false);
  const [hashCode, sethashCode] = useState(value.htmlHash);

  const toggleVisible = () => {
    setvisible(!visible);
  };

  const perform = () => {
    let _value = value;
    // TODO: 针对自定义组件拓展
    if (cname === "custom-iframe") {
      _value.count++;
    }
    onChange(name, _value);
  };

  useEffect(() => {
    dataVOpenApi().then((res) => {
      setCode(res.data.conent);
    });
  }, []);

  return (
    <>
      <Form {...layout}>
        <Form.Item>
          <MonacoEditor strict={false} height={600} language="html" readOnly={true} value={code} />
        </Form.Item>
        <Form.Item>
          <Space size="small">
            <Button type="primary" onClick={toggleVisible}>
              弹出编辑
            </Button>
            <Button onClick={perform}>执行代码</Button>
          </Space>
        </Form.Item>
      </Form>
      <Modal
        visible={visible}
        width={1080}
        destroyOnClose={true}
        closable={false}
        title="修改自定义组件"
        footer={[
          <Button key="cancel" type="dashed" onClick={toggleVisible}>
            取消
          </Button>,
          <Button
            key="ok"
            type="primary"
            onClick={() => {
              setCode(codeRef.current.getValue());
              setvisible(false);
            }}
          >
            确定
          </Button>
        ]}
      >
        <MonacoEditor
          ref={(el) => {
            codeRef.current = el;
          }}
          strict={false}
          height={600}
          language="html"
          value={code}
        />
      </Modal>
    </>
  );
}

export default CodeCore;
