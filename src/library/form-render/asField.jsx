import React, { useState, memo } from "react";
import { Tooltip, Collapse } from "antd";
import cx from "classnames";
import { getValidateText } from "./validate";
import { convertValue, isHidden, getEnum } from "./utils";
import { converLayout } from "~utils/helper";

import { IconFont } from "~components";

// asField拆分成逻辑组件和展示组件，从而可替换展示组件的方式完全插拔的样式
export const asField = ({ FieldUI, Widget }) => {
  const availableKey = [
    "title",
    "description",
    "format",
    "minimum",
    "maximum",
    "minLength",
    "maxLength",
    "pattern",
    "message",
    "min",
    "max",
    "enum",
    "enumNames"
  ];

  function subFieldContainer({ className, schema, props = {}, options, ...rest }) {
    const { rootValue = {}, formData = {}, labelColor, verify, hidden, disabled } = rest;
    // most key of schema, disabled, options, hidden, support for function expression
    const _hidden = convertValue(hidden, formData, rootValue);

    // after "convertValue" being stable, this api will be discarded
    if (_hidden && isHidden({ hidden: _hidden, rootValue, formData })) {
      return null;
    }

    let _options = { ...options },
      _schema = { ...schema };
    try {
      Object.entries(options).forEach(([key, _val]) => {
        _options[key] = convertValue(_val, formData, rootValue);
      });
      // iterate over schema, and convert every key
      Object.keys(schema).forEach((key) => {
        // TODO: need to cover more
        if (availableKey.includes(key)) {
          _schema[key] = convertValue(schema[key], formData, rootValue);
        }
      });
    } catch (e) {
      console.log(`asField 组件解析失败：${e}`);
    }

    // 传入组件的值
    const porps = {
      ...rest,
      schema: _schema,
      disabled: convertValue(disabled, formData, rootValue),
      options: _options,
      formData,
      rootValue
    };

    let isComplex = _schema.type === "object" || (_schema.type === "array" && getEnum(_schema) === undefined);

    const isModal = options && (options.modal || options.drawer);

    if (isModal) {
      isComplex = false;
    }

    const validateText = _schema.required ? getValidateText(porps) : "";

    const showLabel =
      _schema.title || rest.description || _schema.required || (rest.displayType !== "row" && validateText);

    const fieldProps = {
      labelColor,
      className,
      displayType: rest.displayType,
      isComplex,
      isRoot: false,
      schema: _schema,
      showLabel,
      labelWidth: rest.labelWidth,
      tooltip: rest.tooltip,
      verify
    };

    return (
      <FieldUI {...fieldProps}>
        <Widget {...porps} invalid={verify ? validateText : ""} />
      </FieldUI>
    );
  }

  return memo(subFieldContainer);
};

/**
 * @param displayType 展示方式：row 横 column 竖
 * @param showLabel 是否展示label
 * @param isComplex 是否是复杂结构：对象和对象数组
 * @param tooltip 是否展示描述提示
 * @param validateText 必填项文字提示
 * @param required 是否必填项
 */
export const DefaultFieldUI = ({
  children,
  labelColor,
  className,
  schema,
  displayType,
  isComplex,
  showLabel,
  labelWidth,
  tooltip
}) => {
  // field 整体 label 标签 content 内容
  const { title, description = "", options, required = false } = schema;
  const [collapsed, setCollapsed] = useState(true);
  const _labelWidth = converLayout(labelWidth, 85);

  // 一个object是否可以折叠，options里collapsed这个值，且这个值只能是true或者false，代表初始是展开还是收起
  const onCanCollapse = schema.type === "object" && options && [false, true].includes(options.collapsed);
  const toggleCollapsed = () => setCollapsed(!collapsed);

  const _widgetClass = cx("field-flex", {
    [`${className}`]: className,
    "field-flex__vertical": displayType === "column"
  });

  const _labelClass = cx({
    "field-flex__none": displayType === "column"
  });

  if (onCanCollapse) {
    return (
      <Collapse
        bordered={false}
        ghost={true}
        defaultActiveKey={options.collapsed ? "conditions" : ""}
        expandIcon={({ isActive }) => (
          <IconFont
            antd={true}
            type="RightOutlined"
            rotate={isActive ? 90 : 0}
            style={{
              marginTop: "-3px"
            }}
          />
        )}
        onChange={toggleCollapsed}
      >
        <Collapse.Panel
          header={
            showLabel ? (
              <div
                className={isComplex ? "field-flex__object" : "field-flex__label"}
                style={displayType === "row" ? { width: _labelWidth } : {}}
              >
                <label className="field-flex__title" title={title}>
                  {required && <span className="field-flex__required">*&nbsp;</span>}
                  <span className={_labelClass} style={{ color: labelColor ? labelColor : "#bcc9d4" }}>
                    {title}
                  </span>
                  {description &&
                    (tooltip ? (
                      <Tooltip title={description}>
                        <IconFont
                          antd={true}
                          type="QuestionCircleOutlined"
                          style={{
                            marginLeft: 3,
                            color: "#177ddc"
                          }}
                        />
                      </Tooltip>
                    ) : (
                      <span className="field-flex__desc">(&nbsp;{description}&nbsp;)</span>
                    ))}
                </label>
              </div>
            ) : null
          }
          key="conditions"
          className={_widgetClass}
        >
          <div className="field-flex__control">
            <div className="field-flex__item">{children}</div>
          </div>
        </Collapse.Panel>
      </Collapse>
    );
  }

  return (
    <div className={_widgetClass}>
      {showLabel ? (
        <div
          className={isComplex ? "field-flex__object" : "field-flex__label"}
          style={displayType === "row" ? { width: _labelWidth } : {}}
        >
          <label className="field-flex__title" title={title}>
            {required && <span className="field-flex__required">*&nbsp;</span>}
            <span className={_labelClass} style={{ color: labelColor ? labelColor : "#bcc9d4" }}>
              {title}
            </span>
            {description &&
              (tooltip ? (
                <Tooltip title={description}>
                  <IconFont
                    antd={true}
                    type="QuestionCircleOutlined"
                    style={{
                      marginLeft: 3,
                      color: "#177ddc"
                    }}
                  />
                </Tooltip>
              ) : (
                <span className="field-flex__desc">(&nbsp;{description}&nbsp;)</span>
              ))}
          </label>
        </div>
      ) : null}
      <div className="field-flex__control">{children}</div>
    </div>
  );
};
