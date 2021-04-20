import React from "react";
import styles from "./styles.js";
import { Switch, Route } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import AuthPage from "./pages/AuthPage/AuthPage";
import FeedPage from "./pages/FeedPage/FeedPage";
import SpecificPost from "./pages/SpecificPost/SpecificPost";

function App() {
  return (
    <div className={styles.App}>
      <Switch>
        <Route path="/" exact component={MainPage} />
        <Route path="/feed" exact component={FeedPage} />
        <Route path="/auth" component={AuthPage} />
        <Route path="/posts/:id" component={SpecificPost} />
      </Switch>
    </div>
  );
}

export default App;
