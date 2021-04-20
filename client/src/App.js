import React from "react";
import styles from "./App.module.css";
import { Switch, Route } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import AuthPage from "./pages/AuthPage/AuthPage";
import UserInfoPage from "./pages/UserInfoPage/UserInfoPage";

function App() {
  return (
    <div className={styles.App}>
      <Switch>
        <Route path="/" exact component={MainPage} />
        <Route path="/auth" component={AuthPage} />
        <Route path="/userinfo" component={UserInfoPage} />
      </Switch>
    </div>
  );
}

export default App;
