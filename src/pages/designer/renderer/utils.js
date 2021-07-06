import { guid, cloneDeep } from "~utils";
import { isEmpty, deepMergeObj } from "~utils/helper";

/**
 * 新建组件生成配置项
 * @param {*} fields 所有组件配置项
 * @param {*} type 组件类型 form/表单、field/元件、grid/布局
 * @param {*} opts 当前组件配置项
 */
export function generatorField(fields, type = "field", opts = {}) {
  let options;
  // 唯一标识uniqueTag
  const uniqueId = guid();

  options = cloneDeep(opts);
  options.uniqueId = uniqueId;

  if (type === "form") {
    let uniqueFieldLenght = fields.filter((t) => t.type === opts.type).length;
    if (uniqueFieldLenght > 0) {
      options.data.title += uniqueFieldLenght;
      options.data.key += uniqueFieldLenght;
    }
  }

  if (type === "grid") {
    options.data.left = (fields.length * 3) % 12;
  }
  return { components: fields.concat(options), fieldId: uniqueId };
}

/**
 * 获取当前组件配置项
 * @param {*} fields 所有组件配置项
 * @param {*} id 当前组件id
 */
export function getFieldConf(fields, id) {
  return fields.filter((o) => id === o.uniqueId)[0];
}

/**
 * 编译具有层级的数据结构
 * @param {*} flatTree
 * @param {*} deep
 */
export function setLevelPath(nodes, parentNode, key = "drillDownLevel") {
  if (nodes.length === 0) return nodes;
  for (let i = 0; i < nodes.length; i++) {
    if (!parentNode) {
      nodes[i].data[key] = 0;
    } else {
      nodes[i].data[key] = parentNode.data[key] + 1;
    }

    if (nodes[i].data.drillDown && nodes[i].data.drillDown.length > 0) {
      setLevelPath(nodes[i].data.drillDown, nodes[i], key);
    }
  }
}

/**
 * 数据处理 so we have always a relation parent/children of each node
 * @param {*} target
 * @param {*} key
 * @param {*} level
 */
function getLevelData(target, key, level, value) {
  for (let i = 0; i < target.length; i++) {
    if (target[i].data[key] && target[i].data[key] === level) {
      target[i].data = deepMergeObj(target[i].data, value);
      break;
    }
    if (!isEmpty(target[i].data.drillDown)) {
      getLevelData(target[i].data.drillDown, key, level, value);
    }
  }
}

/**
 * 合并组件配置项
 * @param {*} fields 所有组件配置项
 * @param {*} opts 当前组件id、需要合并后的属性值、数据层级
 */
export function mergeFieldConfig(fields, opts, value) {
  let objKey = "drillDownLevel";

  const { parentId, level = 0 } = opts;

  let newFiled = fields.map((n) => {
    if (n.uniqueId === parentId) {
      if (level > 0) {
        // TODO: 数据合并
        getLevelData(n.data.drillDown, objKey, level, value);
      } else {
        n.data = deepMergeObj(n.data, value);
      }
    }
    return n;
  });

  return newFiled;
}

/**
 * 调整顺序
 * @param {*} arr
 * @param {*} next 添加元素的位置
 * @param {*} prev 删除元素的位置
 */
export function orderBy(arr, next, prev) {
  arr[next] = arr.splice(prev, 1, arr[next])[0];
  return arr;
}

/**
 * 获取组件的索引值
 * @param {*} fields 所有组件配置项
 * @param {*} id 当前组件id
 */
export function getFieldOrderBy(fields, id) {
  if (isEmpty(fields)) return {};

  let newFiled = cloneDeep(fields);
  const index = newFiled.findIndex((o) => o.uniqueId === id);
  return { index, components: newFiled };
}

export function deleteItem(uniqueId, arr) {
  let fieldId;
  const { index, components } = getFieldOrderBy(arr, uniqueId);

  if (components.length === 1) {
    fieldId = "-";
  } else if (index > 0) {
    fieldId = components[index - 1].uniqueId;
  } else {
    fieldId = components[index + 1].uniqueId;
  }
  components.splice(index, 1);

  return {
    data: components,
    uniqueId: fieldId
  };
}
