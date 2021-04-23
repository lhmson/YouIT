import React from "react";
import styles from "./styles.js";
import { Switch, Route } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import AuthPage from "./pages/AuthPage/AuthPage";
import CreatePostPage from "./pages/CreatePostPage/CreatePostPage";
import Navbar from "./components/Navbar/Navbar";
import FeedPage from "./pages/FeedPage/FeedPage";
import UserInfoPage from "./pages/UserInfoPage/UserInfoPage";
import SpecificPost from "./pages/SpecificPost/SpecificPost";
import UserResultSearchPage from "./pages/UserResultSearch/UserResultSearchPage";
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
        <Route path="/search" component={UserResultSearchPage}/>
      </Switch>
    </div>
  );
}

export default App;
