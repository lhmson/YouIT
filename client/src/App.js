import React from "react";
import styles from "./styles.js";
import { Switch, Route } from "react-router-dom";

import {
  MainPage,
  AuthPage,
  CreatePostPage,
  FeedPage,
  UserInfoPage,
  SpecificPost,
  UserResultSearchPage,
  AboutPage,
} from "./pages/index";

function App() {
  return (
    <div className={styles.App}>
      <Switch>
        <Route path="/" exact component={MainPage} />
        <Route path="/feed" exact component={FeedPage} />
        <Route path="/auth" component={AuthPage} />
        <Route path="/post/create" component={CreatePostPage} />
        <Route path="/userinfo" component={UserInfoPage} />
        <Route path="/posts/:id" component={SpecificPost} />
        <Route path="/search" component={UserResultSearchPage} />
        <Route path="/userinfo/about" component={AboutPage} />
      </Switch>
    </div>
  );
}

export default App;
