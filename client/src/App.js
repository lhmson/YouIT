import React from "react";
import styles from "./styles.js";
import { Switch, Route } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import AuthPage from "./pages/AuthPage/AuthPage";
import UserInfoPage from "./pages/UserInfoPage/UserInfoPage";
import FeedPage from "./pages/FeedPage.js/FeedPage.js";
import SpecificPost from "./pages/SpecificPost/SpecificPost";

function App() {
  return (
    <div className={styles.App}>
      <Switch>
        <Route path="/" exact component={MainPage} />
        <Route path="/feed" exact component={FeedPage} />
        <Route path="/auth" component={AuthPage} />
        <Route path="/userinfo" component={UserInfoPage} />
        <Route path="/posts/:id" component={SpecificPost} />
      </Switch>
    </div>
  );
}

export default App;
