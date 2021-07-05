import { ANIMATE_CSS } from "../constants";

export const BASE_CONF = {
  title: {
    title: "图层名称",
    type: "string",
    options: { allowClear: true, placeholder: "请输入标题" }
  },
  remark: {
    title: "图层简介",
    type: "string",
    format: "textarea",
    default: "",
    options: { placeholder: "请输入简介" }
  },
  width: { title: "宽度", type: "number", options: { placeholder: "请输入宽度" } },
  height: { title: "高度", type: "number", options: { placeholder: "请输入高度" } },
  left: {
    title: "坐标X",
    type: "number",
    options: { placeholder: "请输入X轴坐标" }
  },
  top: {
    title: "坐标Y",
    type: "number",
    options: { placeholder: "请输入Y轴坐标" }
  },
  background: { title: "背景颜色", component: "color" },
  isLock: {
    title: "锁定图层",
    type: "boolean",
    component: "switch",
    options: {
      checkedChildren: "开启",
      unCheckedChildren: "关闭"
    }
  },
  isHidden: {
    title: "隐藏图层",
    type: "boolean",
    component: "switch",
    options: {
      checkedChildren: "开启",
      unCheckedChildren: "关闭"
    }
  },
  animateType: {
    title: "动画效果",
    type: "select",
    enum: ANIMATE_CSS,
    options: { allowClear: true, placeholder: "请选择动画效果" }
  },
  animateTime: {
    title: "动画延迟(秒)",
    type: "select",
    enum: ["1", "2", "3", "4", "5"],
    options: { allowClear: true, placeholder: "请选择延迟时间" }
  },
  animateSpeed: {
    title: "动画速度",
    type: "select",
    enum: ["slow", "slower", "fast", "faster"],
    enumNames: ["慢", "极慢", "快", "极快"],
    options: { allowClear: true, placeholder: "请选择动画速度" }
  },
  animateRepeat: {
    title: "动画重复次数",
    type: "select",
    enum: ["1", "2", "3", "infinite"],
    enumNames: ["1", "2", "3", "循环"],
    options: { allowClear: true, placeholder: "请选择动画重复次数" }
  },
  isCustomStyle: {
    title: "开启自定义边框",
    type: "boolean",
    component: "switch",
    labelWidth: 100
  },
  borderColor: {
    title: "边框颜色",
    type: "string",
    hidden: "{{rootValue.isCustomStyle === false}}",
    component: "color"
  },
  borderWidth: {
    title: "边框宽度",
    type: "number",
    hidden: "{{rootValue.isCustomStyle === false}}",
    options: {
      placeholder: "请输入边框宽度"
    }
  },
  borderStyle: {
    title: "边框样式",
    type: "string",
    type: "select",
    hidden: "{{rootValue.isCustomStyle === false}}",
    enum: ["solid", "dotted", "double", "dashed"],
    enumNames: ["实线", "点状", "双线", "虚线"],
    options: {
      placeholder: "请选择边框样式",
      allowClear: true
    }
  },
  borderRadius: {
    title: "圆角宽度",
    type: "number",
    hidden: "{{rootValue.isCustomStyle === false}}",
    options: {
      placeholder: "请输入圆角宽度"
    }
  },
  shadowWidth: {
    title: "阴影宽度",
    type: "number",
    hidden: "{{rootValue.isCustomStyle === false}}",
    options: {
      placeholder: "请输入阴影宽度"
    }
  },
  shadowOffset: {
    title: "阴影偏移",
    type: "number",
    hidden: "{{rootValue.isCustomStyle === false}}",
    options: {
      placeholder: "请输入阴影偏移"
    }
  },
  shadowColor: {
    title: "阴影颜色",
    type: "string",
    component: "color",
    hidden: "{{rootValue.isCustomStyle === false}}"
  }
};
