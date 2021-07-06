import React from "react";
import { PictureOutlined } from "@ant-design/icons";
import { Input, Popover } from "antd";

const defaultImg = "https://img.alicdn.com/tfs/TB14tSiKhTpK1RjSZFKXXa2wXXa-354-330.png";

const previewContent = (format, value) => {
  return format === "image" ? <img src={value || defaultImg} alt="图片地址错误" className="fr-preview-image" /> : null;
};

const previewNode = (format, value) => {
  if (format !== "image") {
    return null;
  }
  return (
    <Popover content={previewContent(format, value)} className="fr-preview" placement="bottom">
      <PictureOutlined />
    </Popover>
  );
};

const VInput = (p) => {
  const { options = {}, invalid, schema = {} } = p;
  const style = invalid ? { borderColor: "#ff4d4f", boxShadow: "0 0 0 2px rgba(255,77,79,.2)" } : {};
  const { format = "text", maxLength } = schema;
  const type = format === "image" ? "text" : format;
  const handleChange = (e) => p.onChange(p.name, e.target.value);
  let suffix = undefined;
  try {
    const _value = p.value || "";
    suffix = options.suffix;
    if (!suffix && maxLength) {
      suffix = (
        <span style={_value.length > maxLength ? { fontSize: 12, color: "#ff4d4f" } : { fontSize: 12, color: "#999" }}>
          {_value.length + " / " + maxLength}
        </span>
      );
    }
  } catch (error) {}
  const config = {
    placeholder: "请输入",
    ...options,
    maxLength,
    suffix
  };
  return (
    <Input
      style={style}
      {...config}
      value={p.value}
      type={type}
      disabled={p.disabled || p.readonly}
      addonAfter={options.addonAfter ? options.addonAfter : previewNode(format, p.value)}
      onChange={handleChange}
    />
  );
};

export default VInput;
