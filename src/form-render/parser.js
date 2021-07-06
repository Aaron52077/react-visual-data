import getBasicField from "./getField";
import transformField from "./transformField";

// 对于数组或对象类型，获取其子集schema
function getSubSchemas(schema = {}) {
  const {
    properties,
    items,
    // as subset's parent
    ...$parent
  } = schema;
  const { type } = $parent;
  if (!properties && !items) {
    return [];
  }

  let children = {};
  if (type === "object") {
    children = properties;
  }
  if (type === "array") {
    children = [].concat(items);
  }

  return Object.keys(children).map((name) => ({
    schema: children[name],
    name,
    $parent
  }));
}

function getBasicProps(settings, materials) {
  const { labelColor, schema, name, cname, cid, verify, displayType, labelWidth, formData, disabled, tooltip } =
    settings;

  if (!schema) return {};

  const {
    className,
    displayType: _displayType,
    options: options = {},
    disabled: _disabled,
    extraButtons: extraButtons = [],
    tooltip: _tooltip,
    labelWidth: _labelWidth,
    required: _required = false,
    hidden
  } = schema;

  const { generated: widgets, customized: fields } = materials;
  // TODO: 标准化属性模型,除了 value 和 onChange 为动态值这里不处理
  // attr前者单个当前UI的，后者全局的
  const passDownProps = {
    labelColor,
    cname,
    cid,
    verify,
    displayType: _displayType || displayType,
    tooltip: _tooltip || tooltip,
    disabled: _disabled || disabled,
    labelWidth: _labelWidth || labelWidth
  };

  let basicProps = {
    ...passDownProps,
    name,
    widgets,
    fields,
    schema,
    required: _required,
    options, // TODO: 所有特定组件规则,addable等规则
    hidden,
    formData
  };

  if (className) {
    basicProps = { ...basicProps, className };
  }
  // 子集的属性
  const subItems = {};
  const subSchemas = getSubSchemas(schema);
  subSchemas.forEach((subSchema) => {
    const { name: _name, schema: _schema = {} } = subSchema;

    subItems[_name] = {
      field: getBasicField(_schema, materials),
      props: getBasicProps(
        {
          ...subSchema,
          ...passDownProps,
          formData
        },
        materials
      )
    };
  });

  if (["array", "object"].includes(schema.type)) {
    // 传入 name 和 Field（如果重定义Field的话）及其配置信息（如 onChange 等）
    basicProps.getSubField = (m) => {
      const { field, props } = subItems[m.name] || {};

      return transformField({
        ...field,
        props: {
          ...props,
          name: m.name,
          rootValue: m.rootValue
        }
      })(m);
    };

    if (schema.items) {
      basicProps.extraButtons = extraButtons;
    }
  }

  return basicProps;
}

/**
 *  schema + materials --> parser --> Field + props
 *  schema {
 *    propsSchema,
 *    data,
 *    name,
 *  }
 *  materials {
 *    generated,
 *    customized,
 *    mapping,
 *  }
 */
const schemaParser = (settings = {}, materials) => {
  const { schema = {} } = settings;
  return {
    Field: getBasicField(schema, materials).Field,
    props: getBasicProps(settings, materials)
  };
};

export default schemaParser;
