import React, { PureComponent } from "react";
import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import store, { persistor } from "./store";
import Router from "./router";

import "./styles/format.less";

class App extends PureComponent {
  render() {
    return (
      <ConfigProvider locale={zhCN}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Router />
          </PersistGate>
        </Provider>
      </ConfigProvider>
    );
  }
}

export default App;
