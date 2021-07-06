import React, { useState, useRef, Fragment } from "react";
import { Divider, Button, Col, Row, Card, Tabs, notification } from "antd";
import { MonacoEditor, Scrollbar } from "~components";
import SchemaRender from "@/form-render";
import { useDocumentTitle } from "~hooks/useDocumentTitle";

const { TabPane } = Tabs;

const SCHEMA_JSON = {
  type: "object",
  properties: {
    case1: {
      title: "基础控件",
      type: "object",
      displayType: "column",
      labelWidth: 110,
      properties: {
        input: {
          title: "简单输入框",
          type: "string",
          displayType: "row",
          required: true,
          options: {
            placeholder: "请输入"
          }
        },
        email: {
          title: "邮箱输入",
          description: "邮箱格式验证",
          type: "string",
          displayType: "row",
          format: "email",
          required: true,
          pattern: "^[.a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$"
        },
        textarea: {
          title: "简单文本编辑框",
          type: "string",
          format: "textarea",
          required: true,
          displayType: "row"
        },
        color: {
          title: "颜色选择",
          type: "string",
          format: "color",
          displayType: "row"
        },
        date: {
          title: "日期选择",
          type: "string",
          format: "date",
          displayType: "row",
          required: true,
          default: "2020/09/20",
          options: {
            format: "YYYY/MM/DD"
          }
        },
        image: {
          title: "图片展示",
          type: "string",
          format: "image",
          displayType: "row",
          default: "http://placekitten.com/200/200"
        },
        num: {
          title: "数字输入框",
          type: "number",
          min: 0,
          max: 1000,
          default: 0,
          displayType: "row"
        },
        slider: {
          title: "带滑动条",
          component: "slider",
          displayType: "row",
          default: 0,
          options: {
            hideNumber: true
          }
        },
        switch: {
          title: "开关控制",
          type: "boolean",
          component: "switch",
          displayType: "row",
          default: true
        },
        dateRange: {
          title: "日期范围",
          type: "range",
          format: "dateTime",
          displayType: "row",
          default: null,
          options: {
            placeholder: ["开始时间", "结束时间"]
          }
        },
        showMore: {
          title: "显示更多",
          type: "boolean",
          component: "switch",
          displayType: "row",
          disabled: "{{rootValue.x1.length > 5}}",
          default: true,
          options: {
            checkedChildren: "开启",
            unCheckedChildren: "关闭"
          }
        },
        x1: {
          title: "输入框",
          type: "string",
          displayType: "row",
          options: {
            allowClear: true,
            placeholder: "尝试输入超过5个字符"
          },
          hidden: (formData, rootValue) => rootValue.showMore === false
        },
        radio1: {
          title: "单选1",
          component: "radio",
          displayType: "row",
          default: "a",
          enum: ["a", "b", "c"],
          enumNames: ["早", "中", "晚"]
        },
        radio2: {
          title: "单选2",
          component: "radio",
          displayType: "row",
          default: "a",
          enum: ["a", "b", "c"],
          enumNames: ["早", "中", "晚"],
          options: { optionType: "button", buttonStyle: "solid" }
        },
        select: {
          title: "带搜索的单选框",
          type: "select",
          displayType: "row",
          enum: ["a", "b", "c"],
          enumNames: ["jack", "steve", "david"],
          hidden: "{{rootValue.showMore === false}}",
          options: {
            filterOption: true,
            showSearch: true,
            optionFilterProp: "children"
          }
        },
        multipleSelect: {
          type: "multiple",
          format: "form",
          title: "标签模式",
          description: "除了可选的标签，还可输入自定义的标签",
          displayType: "column",
          default: ["旅行达人", "工作狂"],
          hidden: "{{rootValue.showMore === false}}",
          enum: ["旅行达人", "工作狂", "老司机", "小资"],
          options: {
            mode: "tags"
          }
        },
        boxes: {
          title: "多选",
          description: "checkbox",
          type: "array",
          displayType: "row",
          items: {
            type: "string"
          },
          enum: ["A", "B", "C", "D"],
          enumNames: ["杭州", "武汉", "湖州", "贵阳"]
        },
        backgroundImage1: {
          title: "普通上传",
          type: "string",
          format: "upload",
          displayType: "row",
          action: "https://www.mocky.io/v2/5cc8019d300000980a055e76"
        },
        backgroundImage2: {
          title: "裁剪上传",
          type: "string",
          format: "crop",
          displayType: "row",
          action: "https://www.mocky.io/v2/5cc8019d300000980a055e76"
        }
      }
    },
    modal: {
      title: "弹层隐藏部分配置",
      description: "目前支持modal/drawer",
      type: "object",
      displayType: "column",
      labelWidth: 120,
      properties: {
        obj1: {
          title: "object + modal",
          type: "object",
          displayType: "row",
          options: {
            modal: true
          },
          properties: {
            input1: {
              title: "输入框1",
              type: "string"
            },
            input2: {
              title: "输入框2",
              type: "string"
            }
          }
        },
        obj2: {
          title: "object + drawer",
          type: "object",
          displayType: "row",
          options: {
            drawer: {
              width: 350
            }
          },
          properties: {
            input3: {
              title: "输入框1",
              type: "string",
              labelWidth: 80
            },
            input4: {
              title: "输入框2",
              type: "string",
              labelWidth: 80
            }
          }
        }
      }
    },
    html: {
      title: "html元素的使用",
      type: "object",
      displayType: "column",
      options: {
        collapsed: true
      },
      properties: {
        html1: {
          title: "纯字符串",
          type: "html"
        },
        html2: {
          title: "使用formData",
          type: "html"
        },
        html3: {
          type: "html"
        }
      }
    }
  }
};

function FormRenderers() {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    case1: {
      input: "",
      email: "",
      textarea: "",
      color: "",
      date: "2020/09/20",
      image: "http://placekitten.com/200/200",
      num: 0,
      slider: 0,
      switch: true,
      dateRange: null,
      showMore: true,
      x1: "",
      radio1: "a",
      radio2: "a",
      multipleSelect: ["旅行达人", "工作狂"],
      boxes: [],
      backgroundImage1: "",
      backgroundImage2: ""
    },
    modal: {
      obj1: {
        input1: "",
        input2: ""
      },
      obj2: {
        input3: "",
        input4: ""
      }
    },
    html: {
      html1: "hello world1",
      html2: "hello world2",
      html3: "<a>注意事项</a>"
    }
  });
  const [verify, setVerify] = useState(false);
  useDocumentTitle("动态表单schema");

  const handleReset = () => {
    formRef.current.resetData({}).then((res) => {
      setVerify(false);
    });
  };

  const handleSubmit = () => {
    // valid 是校验判断的数组，valid 长度为 0 代表校验全部通过
    setVerify(true);
    notification.destroy();

    const valid = formRef.current.validate();

    if (valid.length > 0) {
      valid.forEach((item) => {
        notification.error({
          top: 70,
          duration: 2,
          message: `校验字段：${item.label}`,
          description: item.message
        });
      });
    }
  };

  const onFromChange = (data) => {
    setFormData(data);
  };

  return (
    <div className="gc-page">
      <Divider orientation="left">
        <Button
          type="link"
          target="_blank"
          href="https://x-render.gitee.io/form-render/suide/design#%E6%9E%81%E7%AE%80-api"
        >
          设计理念
        </Button>
      </Divider>
      <Row gutter={16} style={{ height: "100%" }}>
        <Col span={12}>
          <Scrollbar>
            <Card title="渲染层">
              <SchemaRender
                ref={formRef}
                cname="form-demo"
                schema={SCHEMA_JSON}
                formData={formData}
                verify={verify}
                onChange={onFromChange}
              />
            </Card>
          </Scrollbar>
        </Col>
        <Col span={12}>
          <Card title="数据层">
            <Tabs
              defaultActiveKey="1"
              tabBarExtraContent={
                <Fragment>
                  <Button onClick={handleReset}>重置</Button>
                  <Button onClick={handleSubmit}>提交</Button>
                </Fragment>
              }
            >
              <TabPane tab="配置" key="config">
                <MonacoEditor height={770} language="json" value={SCHEMA_JSON} readOnly />
              </TabPane>
              <TabPane tab="数据" key="data">
                <MonacoEditor height={770} language="json" value={formData} readOnly />
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default FormRenderers;
