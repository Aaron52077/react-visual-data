import React, { useState, useEffect } from "react";
import { Upload, message, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { isEmpty, getBase64 } from "~utils/helper";

export default ({ name, value, options, schema, onChange }) => {
  const [fileList, setFileList] = useState([]);
  // 获取到文件名
  const fileName = (name) => {
    let pos = name.lastIndexOf("/");
    return name.substring(pos + 1);
  };

  useEffect(() => {
    if (isEmpty(value)) return;

    setFileList([
      {
        uid: "1",
        status: "done",
        name: fileName(value),
        url: value
      }
    ]);
  }, []);

  const renderProps = {
    name: "file",
    action: schema.action,
    enctype: "multipart/form-data",
    withCredentials: true,
    listType: options?.listType || "picture",
    type: "file",
    fileList: fileList,
    onChange: async (info) => {
      // 转化为base64格式数据，真实地址为info.file.response.url
      if (!info.file.url) {
        info.file.url = await getBase64(info.file.originFileObj);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} 文件上传成功`);
        setFileList([
          {
            uid: "1",
            status: "done",
            name: info.file.name,
            url: info.file.url
          }
        ]);
        onChange(name, info.file.url);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} 文件上传失败`);
        setFileList([]);
        onChange(name, "");
      }
    },
    onRemove() {
      setFileList([]);
      onChange(name, "");
    }
  };

  return (
    <div className="gc-upload-mod">
      <Upload {...renderProps} {...options}>
        <Button disabled={fileList.length >= 1}>
          <UploadOutlined /> 上传
        </Button>
      </Upload>
    </div>
  );
};
