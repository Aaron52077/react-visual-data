import { combineReducers } from "redux";

import component from "./component";
import form from "./form";
import tab from "./tab";

const rootReducer = combineReducers({
  component,
  form,
  tab
});

export default rootReducer;
