import React, { useState, useEffect, createContext } from "react";
import { Button, Empty, Form, Table, Input, Popconfirm, Select } from "antd";
import { IconFont } from "~components";
import { connect } from "react-redux";
import { useTools } from "~common/hooks";
import { uuid } from "~utils";

const Compose = createContext({});

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();

  return (
    <Compose.Provider value={form}>
      <Form form={form} component={false}>
        <tr {...props} key={index} />
      </Form>
    </Compose.Provider>
  );
};

const EditableCell = ({ children, ...restProps }) => {
  return <td {...restProps}>{children}</td>;
};

const VTabToTable = ({ name, cid, value, onChange, dispatch }) => {
  const [tableData, setTableData] = useState([]);
  const { state } = useTools();
  const chartsOptions = state.components
    .filter((v) => v.type !== "tabs")
    .map((o) => ({
      uniqueId: o.uniqueId,
      name: o.name
    }));

  useEffect(() => {
    setTableData(value);
  }, [state.selected]);

  const changeValue = (data) => {
    setTableData(data);
    onChange(name, data);

    dispatch({
      type: "tab/component",
      data: data.map((item) => ({
        id: item.id,
        form: cid,
        to: item.mapping.join(",")
      }))
    });
  };

  const handleCreate = () => {
    const newData = { id: uuid(), mapping: [], name: "" };
    let _newData = [...tableData, newData];
    changeValue(_newData);
  };

  const handleDelete = (key) => {
    let _temp = tableData.filter((item) => item.id !== key);
    changeValue(_temp);
  };

  const handleSave = (row) => {
    const newData = [...tableData];
    const index = newData.findIndex((item) => row.id === item.id);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row
    });
    changeValue(newData);
  };

  const onChangeValue = (value, row) => {
    let values = {
      ...row,
      ...value
    };
    handleSave(values);
  };

  const columns = [
    {
      title: "tab名称",
      dataIndex: "name",
      align: "center",
      width: 150,
      render: (_, record) => (
        <Input
          value={record.name}
          placeholder="请输入"
          allowClear
          onChange={(e) => {
            onChangeValue({ name: e.target.value }, record);
          }}
        />
      )
    },
    {
      title: "展示图表",
      dataIndex: "mapping",
      align: "center",
      width: 250,
      render: (_, record, index) => (
        <Select
          value={record.mapping}
          mode="multiple"
          placeholder="请选择要展示的图表"
          style={{
            width: "100%",
            textAlign: "left"
          }}
          onChange={(val) => {
            onChangeValue({ mapping: val }, record);
          }}
        >
          {chartsOptions.map((item, index) => (
            <Select.Option key={index} value={item.uniqueId}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      )
    },
    {
      title: "操作",
      dataIndex: "antion",
      align: "center",
      width: 100,
      render: (text, record, index) =>
        tableData.length >= 1 ? (
          <Popconfirm title={`确定要删除第${index + 1}行字段模型?`} onConfirm={() => handleDelete(record.id)}>
            <IconFont antd={true} type="DeleteOutlined" />
          </Popconfirm>
        ) : null
    }
  ];

  const renderColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title
      })
    };
  });

  return (
    <>
      <Table
        scroll={{
          x: 280
        }}
        rowKey="id"
        locale={{
          emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        }}
        tableLayout="auto"
        components={{
          body: {
            row: EditableRow,
            cell: EditableCell
          }
        }}
        columns={renderColumns}
        dataSource={tableData}
        pagination={false}
      />
      <Button type="dashed" onClick={handleCreate} style={{ width: "100%" }}>
        <IconFont antd={true} type="PlusCircleOutlined" />
      </Button>
    </>
  );
};

export default connect((state) => ({
  tabComponent: state.tab.component
}))(VTabToTable);
