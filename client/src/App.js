import React from "react";
import styles from "./styles.js";
import { Switch, Route, Redirect } from "react-router-dom";

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
  LoginPage,
  RegisterPage,
} from "./pages/index";

import FriendMangementPage from "./pages/FriendMangementPage/FriendMangementPage";

const loggedIn = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.result?.name;
};

function App() {
  return (
    <div className={styles.App}>
      <Switch>
        <Route exact path="/">
          {loggedIn() ? <Redirect to="/feed" /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/login">
          {loggedIn() ? <Redirect to="/feed" /> : <LoginPage />}
        </Route>
        <Route exact path="/feed" component={FeedPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/post/create" component={CreatePostPage} />
        <Route exact path="/userinfo" exct component={UserInfoPage} />
        <Route exact path="/post/:id" component={SpecificPost} />
        <Route exact path="/search" component={UserResultSearchPage} />
        <Route exact path="/requests" component={RequestsInGroupsPage} />
        <Route exact path="/wall" component={WallPage} />
        <Route exact path="/userinfo/about" component={AboutPage} />
        <Route exact path="/group" component={GroupPage} />
        <Route exact path="/group/about" component={GroupAboutPage} />
        <Route exact path="/friends" component={FriendMangementPage}></Route>
      </Switch>
    </div>
  );
}

export default App;
