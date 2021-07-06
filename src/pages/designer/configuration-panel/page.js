import React from "react";
import SchemaRender from "@/form-render";
import { useDesigner } from "~hooks/useDesigner";
import { DIMENSION } from "../constants";

function PageSetting() {
  const { state, setState } = useDesigner();

  const onValueChange = (value) => {
    const { pageSize } = value.page;
    let realValue = { ...value.page };

    if (DIMENSION[pageSize]) {
      realValue = { ...realValue, ...DIMENSION[pageSize] };
    } else {
      realValue = { ...realValue, ...realValue.customPageSize };
    }
    setState({ page: realValue });
  };

  return (
    <SchemaRender
      schema={{
        type: "object",
        properties: {
          page: {
            type: "object",
            title: "控制面板",
            displayType: "column",
            description: "大屏页面整体配置(大屏的删除、目录结构调整等，请在管理中心的『大屏管理』中进行！)",
            properties: {
              name: {
                title: "大屏名称",
                type: "string",
                options: { allowClear: true, placeholder: "请输入名称" }
              },
              remark: {
                title: "大屏简介",
                type: "string",
                format: "textarea",
                options: { placeholder: "请输入简介" }
              },
              pageSize: {
                title: "屏幕大小",
                type: "select",
                enum: ["large", "middle", "small", "mobile", "custom"],
                enumNames: ["1920 x 1080", "1440 x 960", "1366 x 768", "750 x 1334", "自定义"],
                default: "custom",
                options: { placeholder: "请选择页面分辨率" }
              },
              customPageSize: {
                title: "自定义",
                type: "size",
                default: {},
                hidden: "{{rootValue.pageSize !== 'custom'}}"
              },
              zoom: {
                title: "缩放设置",
                component: "radio",
                enum: ["scaleY", "scaleX", "cover"],
                enumNames: ["等比例缩放高度铺满", "等比例缩放宽度铺满", "全屏铺满"]
              },
              backgroundMode: {
                title: "背景设置",
                component: "radio",
                enum: ["define", "custom", "none"],
                enumNames: ["内置背景", "自定义背景", "只使用背景色"]
              },
              backgroundColor: {
                title: "背景颜色(背景图片透明时可见)",
                component: "color",
                hidden: "{{rootValue.backgroundMode !== 'none'}}"
              },
              backgroundImage: {
                title: "背景图",
                type: "string",
                format: "upload",
                action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
                hidden: "{{rootValue.backgroundMode !== 'custom'}}",
                options: {
                  listType: "picture-card",
                  accept: ".bmp,.jpg,.png,.gif,.svg,.webp"
                }
              },
              backgroundDefine: {
                title: "内置图片",
                displayType: "row",
                component: "background",
                hidden: "{{rootValue.backgroundMode !== 'define'}}"
              },
              backgroundBlur: {
                title: "背景图片模糊度",
                component: "slider",
                min: 0,
                max: 20,
                options: { hideNumber: true }
              },
              backgroundOpacity: {
                title: "背景图片透明度",
                component: "slider",
                min: 0,
                max: 10,
                options: { hideNumber: true }
              }
            }
          }
        }
      }}
      formData={{ page: state.page }}
      onChange={onValueChange}
    />
  );
}

export default PageSetting;
