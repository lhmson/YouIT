import React from "react";
import styles from "./styles.js";
import { Switch, Route, Redirect } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";

import WallPage from "./pages/WallPage/WallPage";

import {
  CreatePostPage,
  FeedPage,
  UserInfoPage,
  SpecificPost,
  UserResultSearchPage,
  AboutPage,
  GroupPage,
  GroupAboutPage,
  RequestsInGroupsPage,
  CreateAGroupPage,
  LoginPage,
  RegisterPage,
  ErrorPage,
  HomePage,
} from "./pages/index";

import FriendMangementPage from "./pages/FriendMangementPage/FriendMangementPage";
import { CuteClientIOProvider } from "./socket/CuteClientIOProvider.js";
import { useLocalStorage } from "./hooks/useLocalStorage.js";
import DemoSocket from "./socket/DemoComponent/DemoSocket.js";
import { useToken } from "./context/TokenContext.js";
import PrivateRoute from "./utils/PrivateRoute.js";

const loggedIn = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user;
};

function App() {
  const [token, setToken] = useToken();

  return (
    <div className={styles.App}>
      {/* // <<<<<<< HEAD */}
      {/* //       <Switch>
//         <Route path="/" exact component={MainPage} />
//         <Route path="/feed" exact component={FeedPage} />
//         <Route path="/auth" component={AuthPage} />
//         <Route path="/post/create" component={CreatePostPage} />
//         <Route path="/userinfo" exact component={UserInfoPage} />
//         <Route path="/post/:id" component={SpecificPost} />
//         <Route path="/search" component={UserResultSearchPage} />
//         <Route path="/requests" component={RequestsInGroupsPage} />
//         <Route path="/wall" component={WallPage} />
//         <Route path="/userinfo/about" component={AboutPage} />
//         <Route path="/group" exact component={GroupPage} />
//         <Route path="/group/about" component={GroupAboutPage} />
//         <Route path="/friends" component={FriendMangementPage}></Route>
//         <Route path="/createagroup" component={CreateAGroupPage} />
//       </Switch>
// ======= */}
      <CuteClientIOProvider serverUri={"http://localhost:5000"} token={token}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login">
            {loggedIn() ? <Redirect to="/" /> : <LoginPage />}
          </Route>
          <Route exact path="/register">
            {loggedIn() ? <Redirect to="/" /> : <RegisterPage />}
          </Route>
          <PrivateRoute exact path="/feed" component={FeedPage} />
          <PrivateRoute exact path="/post/create" component={CreatePostPage} />
          <Route path="/userinfo/:id" exact component={UserInfoPage} />
          <Route exact path="/post/:id" component={SpecificPost} />
          <Route exact path="/search" component={UserResultSearchPage} />
          <Route exact path="/requests" component={RequestsInGroupsPage} />
          <Route exact path="/wall" component={WallPage} />
          <Route path="/userinfo/:id/about" component={AboutPage} />
          <Route exact path="/group" component={GroupPage} />
          <Route exact path="/group/about" component={GroupAboutPage} />
          <Route exact path="/friends" component={FriendMangementPage} />
          <Route path="/demoSocketIO" component={DemoSocket} />
          <Route path="/createagroup" component={CreateAGroupPage} />

          <Route>
            <ErrorPage code="404" />
          </Route>
        </Switch>
      </CuteClientIOProvider>
    </div>
  );
}

export default App;
