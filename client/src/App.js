import React from "react";
import styles from "./styles.js";
import { Switch, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";

import WallPage from "./pages/WallPage/WallPage";

import {
  MainPage,
  AuthPage,
  CreatePostPage,
  FeedPage,
  UserInfoPage,
  SpecificPost,
  UserResultSearchPage,
  AboutPage,
  GroupPage,
  GroupAboutPage,
  RequestsInGroupsPage,
} from "./pages/index";

import FriendMangementPage from "./pages/FriendMangementPage/FriendMangementPage";

function App() {
  return (
    <div className={styles.App}>
      <Switch>
        <Route path="/" exact component={MainPage} />
        <Route path="/feed" exact component={FeedPage} />
        <Route path="/auth" component={AuthPage} />
        <Route path="/post/create" component={CreatePostPage} />
        <Route path="/userinfo" exact component={UserInfoPage} />
        <Route path="/post/:id" component={SpecificPost} />
        <Route path="/search" component={UserResultSearchPage} />
        <Route path="/requests" component={RequestsInGroupsPage} />
        <Route path="/wall" component={WallPage} />
        <Route path="/userinfo/about" component={AboutPage} />
        <Route path="/group" exact component={GroupPage} />
        <Route path="/group/about" component={GroupAboutPage} />
        <Route path="/friends" component={FriendMangementPage}></Route>
      </Switch>
    </div>
  );
}

export default App;
