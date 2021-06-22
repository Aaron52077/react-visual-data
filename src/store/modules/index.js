import { combineReducers } from 'redux';

import app from './app';
import component from './component';
import form from './form';

const rootReducer = combineReducers({
  app,
  component,
  form
});

export default rootReducer;
