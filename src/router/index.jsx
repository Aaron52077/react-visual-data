import React, { Component } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import history from "./history";
import AxureScreen from "@/pages/fullscreen";
import AxureGrid from "@/pages/report";
import FormRender from "@/pages/formRender";
import AxureScreenPanel from "@/pages/fullscreen/preview";
import AxureGridPanel from "@/pages/report/preview";

class CreateRouter extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/form-render" component={FormRender} />
          <Route path="/fullscreen/preview/:id" component={AxureScreenPanel} />
          <Route path="/report/preview/:id" component={AxureGridPanel} />
          <Route path="/workspace/fullscreen" component={AxureScreen} />
          <Route path="/workspace/report" component={AxureGrid} />
          <Redirect from="/" to="/workspace/fullscreen" />
        </Switch>
      </Router>
    );
  }
}

export default CreateRouter;
