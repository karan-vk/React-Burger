import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";

import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import burgerBuilderReducer from "./store/reducers/burgerBuilder";
import orderReducer from "./store/reducers/order";
import auth from "./store/reducers/auth";

import createSagaMiddleware from "redux-saga";
import { watchAuth } from "./store/sagas/index";

const rootReducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  order: orderReducer,
  auth: auth,
});

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = compose;
// const middleware = () => console.log("middleware");

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, sagaMiddleware))
);
sagaMiddleware.run(watchAuth);
//
const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
