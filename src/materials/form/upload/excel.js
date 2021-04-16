import React, { useState, useEffect } from "react";
import { Button, Upload, message } from "antd";
import XLSX from "xlsx";
import { IconFont } from "~components";

function isExcel(file) {
  return /\.(xlsx|xls|csv)$/.test(file.name);
}

function getHeaderRow(sheet) {
  const headers = [];
  const range = XLSX.utils.decode_range(sheet["!ref"]);
  let C;
  const R = range.s.r;
  /* start in the first row */
  for (C = range.s.c; C <= range.e.c; ++C) {
    /* walk every column in the range */
    const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })];
    /* find the cell in the first row */
    let hdr = "未知 " + C; // <-- replace with your desired default
    if (cell && cell.t) hdr = XLSX.utils.format_cell(cell);
    headers.push(hdr);
  }
  return headers;
}

function VUploadExcel(props) {
  const [excelData, setExcelData] = useState({
    header: null,
    results: null
  });

  // TODO：上传逻辑
  const readerData = (raw) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const namespace = XLSX.read(data, { type: "array" });
        const firstSheetName = namespace.SheetNames[0];
        const worksheet = namespace.Sheets[firstSheetName];
        const header = getHeaderRow(worksheet);
        const results = XLSX.utils.sheet_to_json(worksheet);

        setExcelData({ header, results });
        console.log("header", header, "results", results);
        resolve();
      };
      reader.readAsArrayBuffer(raw);

      reader.onerror = (error) => reject(error);
    });
  };

  const renderProps = {
    name: "file",
    action: props.action,
    withCredentials: true,
    multiple: false,
    accept: "application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    listType: "picture",
    progress: {
      strokeColor: {
        "0%": "#108ee9",
        "100%": "#87d068"
      },
      strokeWidth: 3,
      format: (percents) => `${percent(percents, 2)}`
    },
    onChange(info) {
      const { status, name } = info.file;
      if (status === "done") {
        message.success(`${name} 文件上传成功`);
        console.log("response", excelData);
        props.onChange(props.name, excelData);
      } else if (status === "error") {
        message.error(`${name} 文件上传失败`);
        props.onChange(props.name, "");
      }
    },
    beforeUpload(file) {
      if (!isExcel(file)) {
        message.error("仅支持上传.xlsx, .xls, .csv 文件");
        return false;
      }
    },
    customRequest(e) {
      readerData(e.file).then(() => {
        e.onSuccess();
      });
    },
    onRemove() {
      props.onChange(props.name, "");
    }
  };

  useEffect(() => {
    props.onChange(props.name, excelData);
  }, [excelData.header]);

  return (
    <div className="gc-upload-mod">
      <Upload.Dragger {...renderProps}>
        <Button type="text">
          <IconFont antd={true} type="UploadOutlined" /> 上传
        </Button>
      </Upload.Dragger>
    </div>
  );
}

export default VUploadExcel;
