import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./combile";
declare const window: any;
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
export const store = createStore(
  reducers,
  {},
  composeEnhancers(applyMiddleware(thunk))
);
