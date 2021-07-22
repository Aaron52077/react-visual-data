import React from "react";
import ReactDOM from "react-dom";
import { Button, Modal } from "antd";

function DynamicDialog({ container = null, title, content, onCancel }) {
  const node = document.createElement("div");

  if (container && typeof container === "string") {
    document.querySelector(container).appendChild(node);
  } else {
    document.body.appendChild(node);
  }

  const close = () => {
    onCancel && onCancel();

    if (container && typeof container === "string") {
      document.querySelector(container).removeChild(node);
    } else {
      document.body.removeChild(node);
    }

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
      width={1000}
    >
      {content}
    </Modal>,
    node
  );
}

export default DynamicDialog;
