import React, { useState, createContext } from "react";
import { Button, Form, Table, Popconfirm } from "antd";
import { IconFont } from "~components";
import { uuid } from "~utils";
import ColorPicker from "./index";

const Compose = createContext();

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();

  return (
    <Compose.Provider value={form}>
      <Form form={form} autoComplete="off" component={false}>
        <tr {...props} key={index} />
      </Form>
    </Compose.Provider>
  );
};

const EditableCell = ({ children, ...restProps }) => {
  return <td {...restProps}>{children}</td>;
};

export default ({ name, value, options, onChange }) => {
  const [dataColor, setDataColor] = useState(value || []);

  const handleCreate = () => {
    let newData = [...dataColor, { key: uuid(8), id: uuid(10), color: "#23b7e5" }];
    setDataColor(newData);
    onChangeValue(newData);
  };

  const handleDelete = (current) => {
    let _newData = dataColor.filter((item) => item.id !== current);
    setDataColor(_newData);
    onChangeValue(_newData);
  };

  const onChangeValue = (data) => {
    onChange(name, data);
  };

  const columns = [
    {
      title: "颜色",
      dataIndex: "color",
      render: (value, record, index) => {
        return (
          <ColorPicker
            onChange={(key, val) => {
              const values = [...dataColor];
              values.splice(index, 1, { key: record.key, id: record.id, color: val });
              setDataColor(values);
              onChangeValue(values);
            }}
            disabled={true}
            schema={{ format: "color" }}
            value={value}
          />
        );
      }
    },
    {
      title: "操作",
      dataIndex: "antion",
      align: "center",
      width: 50,
      render: (text, record, index) =>
        dataColor.length >= 1 ? (
          <Popconfirm title={`确定要删除第${index + 1}行字段模型?`} onConfirm={() => handleDelete(record.id)}>
            <IconFont antd={true} type="DeleteOutlined" />
          </Popconfirm>
        ) : null
    }
  ];

  return (
    <>
      {options.label && <div style={{ marginBottom: 5 }}>{options.label}</div>}
      <Table
        columns={columns}
        dataSource={dataColor}
        bordered
        components={{
          body: {
            row: EditableRow,
            cell: EditableCell
          }
        }}
        height={200}
        scroll={{ y: 200 }}
        size="small"
        pagination={false}
      />
      <Button type="dashed" onClick={handleCreate} style={{ width: "100%" }}>
        <IconFont antd={true} type="PlusCircleOutlined" />
      </Button>
    </>
  );
};
