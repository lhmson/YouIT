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
  ErrorPage,
} from "./pages/index";

import FriendMangementPage from "./pages/FriendMangementPage/FriendMangementPage";
import { CuteClientIOProvider } from "./socket/CuteClientIOProvider.js";
import { useLocalStorage } from "./hooks/useLocalStorage.js";
import DemoSocket from "./socket/DemoComponent/DemoSocket.js";

const loggedIn = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.result?.name;
};

function App() {
  const [user, setUser] = useLocalStorage("user");

  return (
    <div className={styles.App}>
      <CuteClientIOProvider
        serverUri={"http://localhost:5000"}
        token={user?.token}
      >
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/login">
            {loggedIn() ? <Redirect to="/" /> : <LoginPage />}
          </Route>
          <Route exact path="/register">
            {loggedIn() ? <Redirect to="/" /> : <RegisterPage />}
          </Route>
          <Route exact path="/feed" component={FeedPage} />
          <Route exact path="/post/create" component={CreatePostPage} />
          <Route exact path="/userinfo" exct component={UserInfoPage} />
          <Route exact path="/post/:id" component={SpecificPost} />
          <Route exact path="/search" component={UserResultSearchPage} />
          <Route exact path="/requests" component={RequestsInGroupsPage} />
          <Route exact path="/wall" component={WallPage} />
          <Route exact path="/userinfo/about" component={AboutPage} />
          <Route exact path="/group" component={GroupPage} />
          <Route exact path="/group/about" component={GroupAboutPage} />
          <Route exact path="/friends" component={FriendMangementPage} />
          <Route path="/demoSocketIO" component={DemoSocket} />
          <Route>
            <ErrorPage code="500" />
          </Route>
        </Switch>
      </CuteClientIOProvider>
    </div>
  );
}

export default App;
