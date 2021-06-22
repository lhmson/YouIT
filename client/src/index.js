import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import { reducers } from "./redux/reducers";

import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { TokenProvider } from "./context/TokenContext";
import { CurrentUserProvider } from "./context/CurrentUserContext";
import { GroupsOfUserProvider } from "./context/GroupsOfUserContext";
import ScrollToTop from "./utils/ScrollTopAuto";

const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <TokenProvider>
          <CurrentUserProvider>
            <GroupsOfUserProvider>
              <ScrollToTop />
              <App />
            </GroupsOfUserProvider>
          </CurrentUserProvider>
        </TokenProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
