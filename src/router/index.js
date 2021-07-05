import React, { Component } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import history from "./history";
import AccountIn from "@/pages/account";
import AccountOAuthIn from "@/pages/account/oauth";
import BaseLayout from "@/layouts";
import Designer from "@/pages/designer";
import FormRender from "@/pages/dashboard/formRender";
import HtmlSpreadsheet from "@/pages/spreadsheet";
import DesignerPanel from "@/pages/designer/preview";
import { pathToParam } from "~utils";

class CreateRouter extends Component {
  render() {
    const { accessToken, dispatch } = this.props;
    return (
      <Router history={history}>
        <Switch>
          {/* exact 表示精准匹配，只有完全满足路径才会做相应操作 */}
          <Route exact path="/account" component={AccountIn} />
          <Route path="/oauth" component={AccountOAuthIn} />
          <Route path="/form-render" component={FormRender} />
          <Route path="/spreadsheet" component={HtmlSpreadsheet} />
          <Route path="/workspace/preview/:id" component={DesignerPanel} />
          <Route path="/workspace/design" component={Designer} />
          <Route
            path="/"
            render={() => {
              const { token } = pathToParam();
              if (token) {
                // TODO：优先清空存储的token
                dispatch({ type: "app/resetState" });
                return <Redirect to={"/oauth?token=" + token} />;
              }
              return !accessToken ? <Redirect from="/" to="/account" /> : <BaseLayout />;
            }}
          />
        </Switch>
      </Router>
    );
  }
}

export default connect((state) => ({ accessToken: state.app.accessToken }))(CreateRouter);
