import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas/rootSaga";
import rootReducer from "../reducers/index";

/* Hot Module Reload */

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/* Hot Module Reload Ends */

const sagaMiddleware = createSagaMiddleware();

const store: any = createStore(
  rootReducer,
  reduxDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

/* Hot Module Reload */

if (process.env.NODE_ENV !== "production" && module.hot) {
  module.hot.accept("../reducers", () => store.replaceReducer(rootReducer));
}

/* Hot Module Reload Ends */
export default store;
