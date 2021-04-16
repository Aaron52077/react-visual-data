import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Modal, Space, Button, Typography, Badge, message, Tooltip } from "antd";
import copyTOClipboard from "copy-text-to-clipboard";
import { connect } from "react-redux";
import { useTools, useStore } from "~common/hooks";
import { uuid } from "~utils";
import { generatorField, getFieldConf, getFieldOrderBy, orderBy } from "~renderer/utils";

import { IconFont, MonacoEditor } from "~components";
import storage from "~utils/storage";

const FieldActionsConf = ({ activeKey, dispatch }) => {
  const { state, setState } = useTools();
  const { view, setView } = useStore();

  const onKeyDown = (e) => {
    canUndo(e.ctrlKey || e.metaKey) && 90 === e.keyCode && (e.shiftKey ? this.redo() : this.undo());
  };

  // TODO: 清空
  const handleClear = () => {
    setView({
      isShowReferLine: false,
      lines: {
        h: [],
        v: []
      }
    });
    setState({
      components: [],
      undo: [],
      redo: []
    });

    dispatch({ type: "component/activeKey", data: "-" });
  };

  // TODO: 复制
  const handleCopy = () => {
    const curFieldConf = getFieldConf(state.components, activeKey);
    const { components, fieldId } = generatorField(state.components, "field", curFieldConf);
    setState({ components: components });

    dispatch({ type: "component/activeKey", data: fieldId });
  };

  // TODO: 删除
  const handleDelete = () => {
    const { index, components } = getFieldOrderBy(state.components, activeKey);
    let fieldId;
    if (components.length === 1) {
      fieldId = "-";
    } else if (index > 0) {
      fieldId = components[index - 1].uniqueId;
    } else {
      fieldId = components[index + 1].uniqueId;
    }
    components.splice(index, 1);
    setState({ components: components });

    dispatch({ type: "component/activeKey", data: fieldId });
  };

  // TODO: 上移，与前一个元素交换顺序
  const handleUp = () => {
    const { index, components } = getFieldOrderBy(state.components, activeKey);

    if (index - 1 >= 0) {
      const results = orderBy(components, index, index - 1);
      setState({ components: results });
    } else {
      message.destroy();
      message.warning("图层已经置顶，无法上移");
    }
  };

  // TODO: 下移，与后一个元素交换顺序
  const handleDown = () => {
    const { index, components } = getFieldOrderBy(state.components, activeKey);

    if (index + 1 < components.length) {
      const results = orderBy(components, index, index + 1);
      setState({ components: results });
    } else {
      message.destroy();
      message.warning("图层已经置底，无法下移");
    }
  };

  // TODO: 置顶
  const handleTop = () => {
    const { index, components } = getFieldOrderBy(state.components, activeKey);

    if (index - 1 >= 0) {
      // 将要置顶的元素存储后删除
      const temp = components.splice(index, 1)[0];
      // 将元素unshift到数组第一位
      components.unshift(temp);
      setState({ components: components });
    } else {
      message.destroy();
      message.warning("图层已经置顶");
    }
  };

  // TODO: 置底
  const handleBottom = () => {
    const { index, components } = getFieldOrderBy(state.components, activeKey);

    if (index + 1 < components.length) {
      // 将要置底的元素存储后删除
      const temp = components.splice(index, 1)[0];
      // 将元素push到数组最后一位
      components.push(temp);
      setState({ components: components });
    } else {
      message.destroy();
      message.warning("图层已经置底");
    }
  };

  // TODO: 撤销
  const handleUndo = () => {
    if (state.undo.length === 0) return;
    let redoStack = [...state.redo, state.undo.pop()];
    setState({ undo: redoStack });
  };

  // TODO: 重做
  const handleRedo = () => {
    if (state.redo.length === 0) return;
    let undoStack = [...state.redo, state.redo.pop()];
    setState({ undo: undoStack });
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
        <Button disabled={activeKey === "-"} icon={<IconFont antd={true} type="CopyOutlined" />} onClick={handleCopy}>
          复制
        </Button>
        <Button
          disabled={activeKey === "-"}
          icon={<IconFont antd={true} type="DeleteOutlined" />}
          onClick={handleDelete}
        >
          删除
        </Button>
        <Button icon={<IconFont antd={true} type="ClearOutlined" />} onClick={handleClear}>
          清空
        </Button>
        <Button disabled={activeKey === "-"} icon={<IconFont antd={true} type="SwapLeftOutlined" />} onClick={handleUp}>
          上一层
        </Button>
        <Button
          disabled={activeKey === "-"}
          icon={<IconFont antd={true} type="SwapRightOutlined" />}
          onClick={handleDown}
        >
          下一层
        </Button>
        <Button
          disabled={activeKey === "-"}
          icon={<IconFont antd={true} type="VerticalAlignTopOutlined" />}
          onClick={handleTop}
        >
          置顶
        </Button>
        <Button
          disabled={activeKey === "-"}
          icon={<IconFont antd={true} type="VerticalAlignBottomOutlined" />}
          onClick={handleBottom}
        >
          置底
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
                  to={"/fullscreen/preview/" + uuid()}
                  target="_blank"
                  onClick={() => {
                    storage.setLocal("schema_screen_config", {
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
          <Button icon={<IconFont antd={true} type="CodepenOutlined" />} onClick={toggleModal}>
            调试
          </Button>
        </Space>
      </div>
      {/* 模态框 */}
      <Modal
        visible={view.visible}
        title="调试"
        width={960}
        okText="复制配置"
        cancelText="取消"
        onOk={handleCopySchema}
        onCancel={toggleModal}
      >
        <MonacoEditor
          height={600}
          language="json"
          value={{
            page: state.page,
            components: state.components
          }}
        />
      </Modal>
    </header>
  );
};

export default connect((state) => ({
  activeKey: state.component.activeKey
}))(FieldActionsConf);
