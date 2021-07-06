import React, { useState, useEffect, useContext, createContext } from "react";
import { connect } from "react-redux";
import { Row, Col, Button, notification } from "antd";
import { SortableContainer, SortableHandle, SortableElement, arrayMove } from "react-sortable-hoc";
import cx from "classnames";
import { Scrollbar, IconFont } from "~components";
import SchemaRender from "@/form-render";
import { useSet } from "~hooks/useSet ";
import { isEmpty } from "~utils/helper";
import "./style.less";

const Compose = createContext({});

function getParams(arr, value, data) {
  const hasParmas = arr.some((item) => item.k === value.data.key);

  return hasParmas
    ? arr.map((item) =>
        Object.assign({}, item, {
          v: data
        })
      )
    : [
        ...arr,
        {
          k: value.data.key,
          t: value.type,
          v: data
        }
      ];
}

function getValues(arr, uniqueId, data) {
  return arr.map((item) => ({
    id: item.uniqueId,
    data: item.uniqueId === uniqueId ? data : "",
    label: item.data.title,
    required: item.data.required,
    message: "必须填写"
  }));
}

const DragHandle = SortableHandle(() => (
  <div className="form-drag">
    <IconFont antd={true} type="DragOutlined" />
  </div>
));

const SortableItem = connect((state) => ({
  mode: state.component.mode,
  parmas: state.form.parmas,
  selected: state.component.selected
}))(
  SortableElement(({ value, labelColor, onClickItem, mode, parmas, selected, dispatch }) => {
    const [formData, setFormData] = useState(null);
    const { formState, dispathFormState } = useContext(Compose);
    const classNames = cx("form-item form-item__border", {
      "is-active": selected === value.uniqueId && mode === "development"
    });

    const onValueChange = (data) => {
      setFormData(data);
      let newParmas;

      dispathFormState({ values: getValues(formState.items, value.uniqueId, data) });
      // TODO: 处理筛选条件值
      if (data) {
        newParmas = getParams(parmas, value, data);
      } else {
        newParmas = parmas.filter((item) => item.k !== value.data.key);
      }
      dispatch({ type: "form/parmas", data: newParmas });
    };

    const onItemClick = ($event) => {
      dispatch({ type: "component/fieldType", data: "form" });
      onClickItem($event, value.uniqueId);
    };

    const currentSchema = {
      title: value.data.title,
      type: value.type,
      format: value.data.format,
      required: value.data.required,
      options: {}
    };

    return (
      <Col span={value.data.halfWidth ? 12 : 24} className={classNames} onClick={onItemClick}>
        {selected === value.uniqueId && mode === "development" && <DragHandle />}
        <SchemaRender
          cname={value.type}
          schema={currentSchema}
          formData={formData}
          labelColor={labelColor}
          verify={formState.verify}
          onChange={onValueChange}
        />
      </Col>
    );
  })
);

const SortableList = SortableContainer(({ labelColor, mode, dependencies, conditions, onClickItem, dispatch }) => {
  const { formState, dispathFormState } = useContext(Compose);
  // 筛选查询
  const onSumbitClick = (event) => {
    event.stopPropagation();
    const isValid = conditions.some((item) => item.data.required === true);
    let checkList;

    if (isValid) {
      dispathFormState({ verify: true });
      notification.destroy();

      checkList = formState.values.filter((m) => m.required === true && isEmpty(m.data));

      // TODO: 验证是否通过
      if (checkList.length > 0) {
        checkList.forEach((item) => {
          notification.error({
            top: 70,
            duration: 3,
            message: `「${item.label}」过滤条件${item.message}`
          });
        });
      } else {
        dispatch({ type: "component/dependencies", data: dependencies });
      }
    } else {
      dispathFormState({ verify: false });
      dispatch({ type: "component/dependencies", data: dependencies });
    }
  };

  return (
    <Scrollbar>
      <Row
        style={{
          padding: "10px 25px"
        }}
      >
        {formState.items.map((item, index) => (
          <SortableItem
            key={item.uniqueId}
            index={index}
            labelColor={labelColor}
            value={item}
            disabled={mode === "preview" ? true : false}
            onClickItem={onClickItem}
          />
        ))}
        <Col
          span={24}
          style={{
            marginTop: 20,
            paddingLeft: 94
          }}
        >
          <Button type="primary" onClick={onSumbitClick}>
            查询
          </Button>
        </Col>
      </Row>
    </Scrollbar>
  );
});

function SortableComponent({ value, mode, dependencies, conditions, dispatch }) {
  const [formState, dispathFormState] = useSet({
    items: [],
    verify: false,
    values: []
  });

  const onSortStart = ({ index }, event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    let newItems = arrayMove(formState.items, oldIndex, newIndex);
    // TODO: 组装筛选数据
    newItems.forEach((item, index) => {
      item.data.order = index + 1;
    });

    dispathFormState({ items: newItems });
    dispatch({ type: "form/conditions", data: newItems });
  };

  const onItemClick = (event, key) => {
    event.stopPropagation();
    if (mode === "preview") return;
    dispatch({ type: "component/selected", data: key });
  };

  useEffect(() => {
    if (conditions.length > 0) {
      const values = conditions.map((m) => ({
        id: m.uniqueId,
        data: m.data.defaultVal,
        label: m.data.title,
        required: m.data.required,
        message: "必须填写"
      }));
      dispathFormState({ items: conditions, values: values });
    }
  }, [conditions]);

  if (formState.items.length === 0) return null;

  const sortableProps = {
    axis: "xy",
    lockAxis: "y",
    labelColor: value.labelColor || "",
    mode,
    conditions,
    dependencies,
    dispatch,
    useDragHandle: true
  };

  return (
    <Compose.Provider value={{ formState, dispathFormState }}>
      <SortableList {...sortableProps} onSortStart={onSortStart} onSortEnd={onSortEnd} onClickItem={onItemClick} />
    </Compose.Provider>
  );
}

export default connect((state) => ({
  mode: state.component.mode,
  dependencies: state.form.dependencies,
  conditions: state.form.conditions
}))(SortableComponent);
