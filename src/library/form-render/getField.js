import { getEnum } from "./utils";

function getBasicFieldName(schema, _mapping) {
  const { type, format } = schema;

  // 如果已经注明了渲染widget，那最好
  if (schema.component) {
    return schema.component;
  }

  const list = [];
  if (getEnum(schema) && !format) {
    list.push(`${type}?enum`);
  }
  if (format) {
    list.push(`${type}:${format}`);
  }
  list.push(type); // 放在最后兜底，其他使用type默认的组件
  const found = list.find((item) => !!_mapping[item]);
  return _mapping[found] || "";
}

export default function getBasicField(schema = {}, { customized, generated, mapping }) {
  const { component, widget } = schema;
  // Field 能否被重定义
  let fieldCanRedefine = false;
  let Field;
  // component是字符串，从generated中查，不是的话，就是本身
  const _component = typeof component === "string" ? generated[component] : component;
  if (widget && !Field) {
    Field = typeof widget === "string" ? customized[widget] : widget;
  }
  if (!Field && _component) {
    Field = _component;
  }
  if (!Field && !_component) {
    Field = generated[getBasicFieldName(schema, mapping)];
    fieldCanRedefine = !!Field;
  }
  return {
    fieldCanRedefine,
    Field: Field || null
  };
}
