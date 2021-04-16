import React from "react";
import { Button, Result } from "antd";
import { withRouter } from "react-router-dom";

const notFound = (props) => {
  const { history } = props;
  return (
    <Result
      status={404}
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={() => history.replace("/dashboard")}>
          返回首页
        </Button>
      }
    />
  );
};

export default withRouter(notFound);
