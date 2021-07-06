import { combineReducers } from "redux";

import app from "./app";
import component from "./component";
import form from "./form";
import tab from "./tab";

const rootReducer = combineReducers({
  app,
  component,
  form,
  tab
});

export default rootReducer;
