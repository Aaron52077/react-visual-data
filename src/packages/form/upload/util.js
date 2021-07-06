import store from "@/store";
import axios from "axios";
import { Modal } from "antd";

/**
 * 文件异步分片上传
 * @param {*} file
 * @param {*} path
 */
export const dynamicUploadFile = (file, path) =>
  new Promise((resolve, reject) => {
    // 每个文件切片大小定为5MB.
    const bytesPerPiece = 5 * 1024 * 1024;
    const { accessToken } = store.getState().app;

    let start = 0,
      index = 0;
    let end;
    const filesize = file.size;
    const filename = file.name;
    const { webkitRelativePath } = file;

    // 计算文件切片总数
    const totalPieces = Math.max(Math.ceil(filesize / bytesPerPiece), 1);
    const uploadInfo = { file: filename, uploaded: 0, total: totalPieces };

    const formData = new FormData();
    let formDatas = [];

    if (totalPieces <= 1) {
      formData.append("access_token", accessToken);
      formData.append("file", file);
      formData.append("file_path", path);
      if (webkitRelativePath) {
        formData.append("fullPath", webkitRelativePath);
      }
      formData.append("name", filename);
      formDatas.push({ formData, count: 0 });
    } else {
      while (start < filesize) {
        end = start + bytesPerPiece;
        if (end > filesize) {
          end = filesize;
        }
        // 切割文件
        const chunk = file.slice(start, end);
        const chunkFile = new File([chunk], filename);

        formData.append("access_token", accessToken);
        formData.append("name", filename);
        formData.append("file", chunkFile);
        formData.append("upload_to", path);
        formData.append("chunks", String(totalPieces));
        formData.append("chunk", String(index));

        if (webkitRelativePath) {
          formData.append("fullPath", webkitRelativePath);
        }
        formDatas.push({ formData, count: 0 });

        start = end;
        index += 1;
      }
    }

    let state = false;

    const uploadFiles = () => {
      const fileData = formDatas.splice(0);
      fileData.forEach(({ formData, count }) => {
        axios({
          url: path,
          method: "post",
          data: formData
        })
          .then((res) => {
            if (state) return;
            if (!res.code) {
              state = true;
              reject(`上传失败: ${res.data}`);
              uploadInfo.status = "exception";
              return;
            }
            if (res.info) {
              uploadInfo.uploaded = uploadInfo.total;
              resolve(res);
            } else {
              uploadInfo.uploaded = uploadInfo.uploaded + 1;
            }
          })
          .catch(() => {
            if (count <= 2) {
              formDatas.push({ count: count + 1, formData });
              if (formDatas.length === 1) {
                Modal.confirm({
                  title: "上传文件失败, 点击确定重传",
                  onOk: () => {
                    uploadFiles();
                  }
                });
              }
            } else {
              reject("上传失败");
            }
          });
      });
    };

    uploadFiles();
  });
