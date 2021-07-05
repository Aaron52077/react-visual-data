import React, { useEffect } from "react";
import { Upload, message, Button, Modal } from "antd";
import ImgCrop from "antd-img-crop";
import { IconFont } from "~components";

import { useSet } from "~hooks/useSet";
import { percent, isEmpty, getBase64 } from "~utils/helper";

const VUploadCrop = ({ name, value, schema, onChange }) => {
  const [store, setState] = useSet({
    previewVisible: false,
    previewImage: "",
    previewTitle: "",
    fileLists: []
  });

  const { previewVisible, previewImage, previewTitle, fileLists } = store;

  useEffect(() => {
    if (isEmpty(value)) return;
    setState({
      fileLists: [
        {
          uid: "-1",
          name: previewTitle,
          status: "done",
          url: value
        }
      ]
    });
  }, []);

  const renderProps = {
    name: "file",
    action: schema.action,
    enctype: "multipart/form-data",
    withCredentials: true,
    type: "file",
    fileList: fileLists,
    listType: "picture-card",
    progress: {
      strokeColor: {
        "0%": "#108ee9",
        "100%": "#87d068"
      },
      strokeWidth: 3,
      format: (percents) => `${percent(percents, 2)}`
    },
    onPreview: async (file) => {
      if (!file.url) {
        file.url = await getBase64(file.originFileObj);
      }
      setState({
        previewImage: file.url,
        previewVisible: true,
        previewTitle: file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
      });
    },
    onChange({ file, fileList }) {
      if (file.status === "done") {
        message.success(`${file.name} 文件上传成功`);
        setState({ fileLists: fileList, previewTitle: file.name });
        onChange(name, file.response.thumbUrl);
      } else if (file.status === "error") {
        message.error(`${file.name} 文件上传失败`);
        onChange(name, "");
      }
    },
    onRemove() {
      setState({ fileLists: [] });
      onChange(name, "");
    }
  };

  return (
    <div className="gc-upload-mod">
      <ImgCrop rotate modalWidth={960}>
        <Upload {...renderProps} disabled={fileLists.length >= 1}>
          <Button type="text" disabled={fileLists.length >= 1}>
            <IconFont antd={true} type="UploadOutlined" /> 上传
          </Button>
        </Upload>
      </ImgCrop>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={() =>
          setState({
            previewVisible: false
          })
        }
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </div>
  );
};

export default VUploadCrop;
