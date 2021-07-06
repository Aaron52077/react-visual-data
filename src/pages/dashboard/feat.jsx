import React, { useRef, useState, useLayoutEffect } from "react";
import { Divider, Card, Input, Row, Col, Switch } from "antd";
import { CustomToIframe, IFrameSimple, watermark } from "~components";

function IFrameBus() {
  const iframeToRef = useRef(null);
  const [keywords, setKeywords] = useState("");
  const [clear, setClear] = useState(false);

  useLayoutEffect(() => {
    watermark({ clear: !clear });
  }, [clear]);

  return (
    <div className="gc-page">
      <Divider orientation="left">watermark水印</Divider>
      <Card title="全局水印开关" bordered={false}>
        <Switch
          checkedChildren="开启"
          unCheckedChildren="关闭"
          checked={clear}
          onChange={(checked) => {
            setClear(checked);
          }}
        />
      </Card>
      <Divider orientation="left">iframe用法</Divider>
      <Card
        style={{
          width: "100%",
          height: 600
        }}
      >
        <IFrameSimple src="https://wuli-admin.gitee.io/vue-iview-dev/#/dashboard" />
      </Card>
      <Row gutter={10}>
        <Col span={12}>
          <Divider orientation="left">
            <Input.Search
              placeholder="百度搜索"
              onSearch={(value) => {
                setKeywords(value);
                // 刷新iframe
                iframeToRef.current.reload({ wd: "test" });
              }}
              enterButton
            />
          </Divider>
          <Card
            style={{
              width: "100%",
              height: 600
            }}
          >
            <CustomToIframe
              ref={iframeToRef}
              type="iframe:init"
              data={{ iframeId: keywords }}
              src={`https://www.baidu.com/s?wd=${keywords}`}
              events={{
                detail: {
                  title: "通信传值",
                  body: `iframe 传给 datav pro 的 id 是：${keywords}`
                }
              }}
              onAction={(event, action, data) => {
                console.log("action", action, "data", data);
              }}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Divider orientation="left">错误用法提示</Divider>
          <Card
            style={{
              width: "100%",
              height: 600
            }}
          >
            <IFrameSimple src="www.baidu.com" required={true} />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default IFrameBus;
