import React, { useRef, useMemo, useEffect, useImperativeHandle } from "react";
import { asField, DefaultFieldUI } from "./asField";
import schemaParser from "./parser";
import schemaResolve from "./resolve";
import { useDebounce } from "../hooks/useDebounce";
import { getValidateList } from "./validate";
import { combineSchema } from "./utils";
import { isEmpty } from "~utils/helper";

function RenderField({ fields, onChange, ...settings }) {
  const { Field, props } = schemaParser(settings, fields);
  if (!Field) {
    return null;
  }
  return <Field isRoot {...props} value={settings.data} onChange={onChange} formData={settings.formData} />;
}

/**
 * @param generated 根据 Widget 生成的 Field
 * @param customized 自定义的 Field
 * @param mapping 字段 type 与 widgetName 的映射关系
 */
function FieldRender({
  className = "",
  name = "$Field",
  cname = null,
  cid = "-1",
  schema = {},
  formData = {},
  widgets = {},
  FieldUI = DefaultFieldUI,
  fields = {},
  mapping = {},
  displayType = "row",
  tooltip = true,
  labelWidth = 85,
  disabled = false,
  verify = false,
  labelColor = "#bcc9d4",
  onValidate = () => {},
  onChange = () => {},
  forwardedRef
}) {
  const isUserInput = useRef(false); // 状态改变是否来自于用户操作
  const originWidgets = useRef();
  const generatedFields = useRef({});

  const rootData = useMemo(() => schemaResolve(schema, formData), [schema, formData]);

  // 字段验证防抖
  const debouncedValidate = useDebounce(onValidate, 300);

  useEffect(() => {
    if (isUserInput.current) {
      isUserInput.current = false;
      return;
    }
    if (isEmpty(formData)) return;
  }, []);

  // data修改比较常用，所以放第一位
  const resetData = (newData, newSchema) => {
    const _schema = newSchema || schema;
    const _formData = newData || formData;
    const res = schemaResolve(_schema, _formData);
    return new Promise((resolve) => {
      onChange(res);
      resolve(res);
    });
  };

  // 数据验证相关
  const onValidateList = (newData, newSchema) => {
    const _schema = newSchema || schema;
    const _formData = newData || formData;
    return getValidateList(_formData, _schema);
  };

  useImperativeHandle(forwardedRef, () => ({
    resetData,
    validate: onValidateList
  }));

  // 用户输入都是调用这个函数
  const handleChange = (key, val) => {
    isUserInput.current = true;
    onChange(val);

    if (!verify) return;
    debouncedValidate(getValidateList(val, schema));
  };

  const generated = useMemo(() => {
    let obj = {};
    if (!originWidgets.current) {
      originWidgets.current = widgets;
    }
    Object.keys(widgets).forEach((key) => {
      const oWidget = originWidgets.current[key];
      const nWidget = widgets[key];
      let gField = generatedFields.current[key];
      if (!gField || oWidget !== nWidget) {
        if (oWidget !== nWidget) {
          originWidgets.current[key] = nWidget;
        }
        gField = asField({ FieldUI, Widget: nWidget });
        generatedFields.current[key] = gField;
      }
      obj[key] = gField;
    });
    return obj;
  }, []);

  const settings = {
    className,
    cname,
    cid,
    schema,
    data: rootData,
    name,
    verify,
    labelColor,
    tooltip,
    displayType,
    labelWidth,
    disabled,
    formData
  };

  const _fields = {
    // 根据 Widget 生成的 Field
    generated,
    // 自定义的 Field
    customized: fields,
    // 字段 type 与 widgetName 的映射关系
    mapping
  };

  return <RenderField {...settings} fields={_fields} onChange={handleChange} />;
}

const Wrapper = ({ schema, ...args }) => {
  return <FieldRender schema={combineSchema(schema)} {...args} />;
};

export default Wrapper;
