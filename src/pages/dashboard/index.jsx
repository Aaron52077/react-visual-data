import React from "react";
import { Link } from "react-router-dom";
import { Typography, Divider } from "antd";
import { Typing } from "~components";

const { Title, Paragraph } = Typography;
const { VERSION, TIMESTAMP } = window.appConfig;

const Dashboard = () => {
  return (
    <div className="gc-page">
      <div className="dashboard-banner">
        <video autoPlay={true} loop={true} poster="./static/banner.jpg" width="100%" height="100%">
          <source src="./static/banner-video.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="dashboard-typography">
        <Typography>
          <Divider />
          <Title>DataV Pro 数据可视化</Title>
          <Paragraph>
            <Typing
              delay={30}
              source="DataV
            Pro旨让更多的人看到数据可视化的魅力，帮助非专业的工程师通过图形化的界面轻松搭建专业水准的可视化应用，满足您会议展览、业务监控、风险预警、地理信息分析等多种业务的展示需求。"
            />
          </Paragraph>
          <Divider />
          <Title level={3}>专业级大数据可视化</Title>
          <Paragraph>
            <Typing
              delay={60}
              source="专精于地理信息与业务数据融合的可视化，提供丰富的行业模版和交互组件，支持自定义组件接入。"
            />
          </Paragraph>
          <Title level={3}>多种数据源支持</Title>
          <Paragraph>
            <Typing delay={60} source="支持接入在线API、mock数据库数据等，支持动态请求。" />
          </Paragraph>
          <Title level={3}>图形化编辑界面</Title>
          <Paragraph>
            <Typing delay={60} source="拖拽即可完成样式和数据配置，无需编程就能轻松搭建数据大屏。" />
          </Paragraph>
          <Title level={3}>灵活部署和发布</Title>
          <Paragraph>
            <Typing
              delay={60}
              source="专精于地理信息与业务数据融合的可视化，提供丰富的行业模版和交互组件，支持自定义组件接入。"
            />
          </Paragraph>

          <Paragraph>
            <ul>
              <li>
                <Link to="/form-render" target="_blank">
                  formRender 动态表单
                </Link>
              </li>
              <li>
                <Link to={`/workspace/design?v=${VERSION}&t=${TIMESTAMP}`} target="_blank">
                  大屏版本 立即前往
                </Link>
              </li>
            </ul>
          </Paragraph>
        </Typography>
      </div>
    </div>
  );
};

export default Dashboard;
