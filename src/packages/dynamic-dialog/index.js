import React from "react";
import ReactDOM from "react-dom";
import { Button, Modal } from "antd";

function DynamicDialog({ title, content }) {
  const node = document.createElement("div");
  document.body.appendChild(node);

  const close = () => {
    document.body.removeChild(node);
    ReactDOM.unmountComponentAtNode(node);
    node.remove();
  };

  ReactDOM.render(
    <Modal
      visible={true}
      transparent={true}
      title={title || "-"}
      closable={false}
      maskClosable={false}
      footer={
        <Button key="back" key="submit" type="primary" onClick={close}>
          确定
        </Button>
      }
    >
      {content}
    </Modal>,
    node
  );
}

export default DynamicDialog;
