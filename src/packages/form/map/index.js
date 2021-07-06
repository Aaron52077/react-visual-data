import React, { memo, useState } from "react";
import { Modal, Drawer } from "antd";
import { toRawType } from "~utils/helper";

function SubComponent(p) {
  return (
    <div className="field-wrapper">
      {Object.keys(p.value).map((name) => {
        return p.getSubField({
          name,
          value: p.value[name],
          onChange(key, val, objValue) {
            let value = { ...p.value, [key]: val };
            // 第三个参数，允许object里的一个子控件改动整个object的值
            if (objValue) {
              value = objValue;
            }
            p.onChange(p.name, value);
          },
          rootValue: p.value
        });
      })}
    </div>
  );
}

const MapWithModal = (props) => {
  const { options = {}, schema } = props || {};
  const [show, setShow] = useState(false);
  const toggle = () => setShow((o) => !o);
  // 模态框
  if (options && options.modal) {
    const config = toRawType(options.modal) === "object" ? options.modal : {};
    const { text } = config;
    return (
      <>
        <a onClick={toggle}>{text && toRawType(text) === "string" ? "+ " + text : "+ 配置"}</a>
        <Modal
          title={(schema && schema.title) || "子配置"}
          visible={show}
          onCancel={toggle}
          footer={null}
          width="80%"
          {...config}
          style={{ maxWidth: 800, ...config.style }}
        >
          <SubComponent {...props} />
        </Modal>
      </>
    );
  }
  // 抽屉
  if (options && options.drawer) {
    const config = toRawType(options.drawer) === "object" ? options.drawer : {};
    const { text } = config;
    return (
      <>
        <a onClick={toggle}>{text && toRawType(text) === "string" ? "+ " + text : "+ 配置"}</a>
        <Drawer title={(schema && schema.title) || "子配置"} visible={show} onClose={toggle} width="30%" {...config}>
          <SubComponent {...props} />
        </Drawer>
      </>
    );
  }

  return <SubComponent {...props} />;
};

export default memo(MapWithModal);
