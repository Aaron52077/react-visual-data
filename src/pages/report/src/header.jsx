import React, { Fragment, useMemo } from "react";
import { Link } from "react-router-dom";
import { Modal, Space, Button, Typography, Badge, message, Tooltip } from "antd";
import copyTOClipboard from "copy-text-to-clipboard";
import { connect } from "react-redux";
import { useTools, useStore } from "~common/hooks";
import { FORM_ID } from "~common/constants";
import { uuid } from "~utils";
import { generatorField, getFieldConf, deleteItem } from "~renderer/utils";
import { IconFont, MonacoEditor } from "~components";
import storage from "~utils/storage";

const FieldActionsConf = ({ activeKey, fieldType, conditions, dispatch }) => {
  const { state, setState } = useTools();
  const { view, setView } = useStore();

  const statusing = useMemo(() => {
    return activeKey === "-";
  }, [activeKey]);

  // TODO: 清空
  const handleClear = () => {
    setState({
      components: [],
      undo: [],
      redo: []
    });

    // 筛选条件查询关联数据项
    dispatch({ type: "component/activeKey", data: "-" });
    dispatch({ type: "form/conditions", data: [] });
    dispatch({ type: "form/dependencies", data: [] });
    dispatch({ type: "form/parmas", data: [] });
  };

  // TODO: 复制
  const handleCopy = () => {
    const curFieldConf = getFieldConf(state.components, activeKey);
    const { components, fieldId } = generatorField(state.components, "field", curFieldConf);
    setState({ components: components });

    dispatch({ type: "component/activeKey", data: fieldId });
    // 遍历当前组件的id集合便于筛选条件查询关联
    dispatch({ type: "form/dependencies", data: components.map((item) => item.uniqueId) });
  };

  // TODO: 删除
  const handleDelete = () => {
    let overData;
    const fieldArr = fieldType === "form" ? conditions : state.components;

    // 识别元件(form/component)
    if (fieldType === "form") {
      overData = deleteItem(activeKey, fieldArr);

      if (overData.data.length > 0) {
        dispatch({ type: "component/activeKey", data: overData.uniqueId });
        dispatch({ type: "form/conditions", data: overData.data });
      } else {
        dispatch({ type: "component/activeKey", data: "-" });
        // 表单自定义控件
        dispatch({ type: "form/conditions", data: [] });
        overData = state.components.filter((item) => item.uniqueId !== FORM_ID);
        setState({ components: overData });
      }
    } else if (activeKey === "__form__") {
      dispatch({ type: "component/activeKey", data: "-" });
      dispatch({ type: "form/conditions", data: [] });
      overData = state.components.filter((item) => item.uniqueId !== FORM_ID);
      setState({ components: overData });
    } else {
      overData = deleteItem(activeKey, fieldArr);
      dispatch({ type: "component/activeKey", data: overData.uniqueId });
      setState({ components: overData.data });
    }
  };

  const toggleModal = () => setView({ visible: !view.visible });

  const handleCopySchema = () => {
    let displaySchemaString = JSON.stringify(
      {
        page: state.page,
        components: state.components
      },
      null,
      4
    );
    copyTOClipboard(displaySchemaString);
    message.info("复制成功");
  };

  const handledevlop = () => {
    message.info("待开发...");
  };

  return (
    <header className="gc-design__hd">
      <div className="gc-design__hd--title">
        <Typography.Title level={4} className="gc-design__hd--h1">
          Axure v2&nbsp;
          <Badge status="processing" text="Beta测试版" />
        </Typography.Title>
        <div
          className="gc-design__hd--icon"
          onClick={() => {
            setView({
              layerCollapsed: !view.layerCollapsed
            });
          }}
        >
          {!view.layerCollapsed ? (
            <Tooltip title="关闭侧边栏" key="关闭侧边栏">
              <IconFont antd={true} type="LeftSquareOutlined" />
            </Tooltip>
          ) : (
            <Tooltip title="打开侧边栏" key="打开侧边栏">
              <IconFont antd={true} type="RightSquareOutlined" />
            </Tooltip>
          )}
        </div>
      </div>
      <Space className="gc-design__hd--action">
        <Button
          disabled={statusing || fieldType === "form" || activeKey === "__form__"}
          icon={<IconFont antd={true} type="CopyOutlined" />}
          onClick={handleCopy}
        >
          复制
        </Button>
        <Button disabled={statusing} icon={<IconFont antd={true} type="DeleteOutlined" />} onClick={handleDelete}>
          删除
        </Button>
        <Button icon={<IconFont antd={true} type="ClearOutlined" />} onClick={handleClear}>
          清空
        </Button>
        <Button icon={<IconFont antd={true} type="UndoOutlined" />} onClick={handledevlop}>
          撤销
        </Button>
        <Button icon={<IconFont antd={true} type="RedoOutlined" />} onClick={handledevlop}>
          重做
        </Button>
      </Space>
      <div className="gc-design__hd--setting">
        <div
          className="gc-design__hd--icon"
          onClick={() => {
            setView({
              settingCollapsed: !view.settingCollapsed
            });
          }}
        >
          {!view.settingCollapsed ? (
            <Tooltip title="关闭配置" key="关闭配置">
              <IconFont antd={true} type="RightSquareOutlined" />
            </Tooltip>
          ) : (
            <Tooltip title="打开配置" key="关闭配置">
              <IconFont antd={true} type="LeftSquareOutlined" />
            </Tooltip>
          )}
        </div>
        <Space className="gc-design__hd--save">
          <Button
            icon={
              <Fragment>
                <Link
                  to={"/report/preview/" + uuid()}
                  target="_blank"
                  onClick={() => {
                    storage.setLocal("schema_report_config", {
                      page: state.page,
                      components: state.components
                    });
                  }}
                >
                  <IconFont antd={true} type="DesktopOutlined" />
                  预览
                </Link>
              </Fragment>
            }
          ></Button>
          <Button icon={<IconFont antd={true} type="CloudOutlined" />} onClick={toggleModal}>
            调试
          </Button>
        </Space>
      </div>
      {/* 模态框 */}
      <Modal
        visible={view.visible}
        title="调试"
        width={960}
        okText="复制"
        cancelText="取消"
        onOk={handleCopySchema}
        onCancel={toggleModal}
      >
        <MonacoEditor
          height={600}
          language="json"
          value={{
            page: state.page,
            conditions: conditions,
            components: state.components
          }}
        />
      </Modal>
    </header>
  );
};

export default connect((state) => ({
  activeKey: state.component.activeKey,
  fieldType: state.component.fieldType,
  conditions: state.form.conditions
}))(FieldActionsConf);
