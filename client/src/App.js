import React, { useEffect } from "react";
import styles from "./styles.js";
import { Switch, Route, Redirect } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";

import WallPage from "./pages/WallPage/WallPage";

import {
  CreatePostPage,
  FeedPage,
  UserInfoPage,
  SpecificPostPage,
  UserResultSearchPage,
  AboutPage,
  GroupPage,
  GroupAboutPage,
  CreateGroupPage,
  LoginPage,
  RegisterPage,
  ErrorPage,
  HomePage,
  MessagePage,
  FriendMangementPage,
  MutualFriendPage,
  GroupManagementPage,
  ReportUserPage,
} from "./pages/index";

import { CuteClientIOProvider } from "./socket/CuteClientIOProvider.js";
import { useLocalStorage } from "./hooks/useLocalStorage.js";
import DemoSocket from "./socket/DemoComponent/DemoSocket.js";
import { useToken } from "./context/TokenContext.js";
import PrivateRoute from "./utils/PrivateRoute.js";
import { handleNewIOConnection } from "./notifications/index.js";
import SettingsPage from "./pages/SettingsPage/SettingsPage.js";
import ActivationPage from "./pages/ActivationPage/ActivationPage.js";

const loggedIn = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user;
};

function App() {
  const [token, setToken] = useToken();

  return (
    <div className={styles.App}>
      <CuteClientIOProvider
        serverUri={"http://localhost:5000"}
        token={token}
        onNewConnection={handleNewIOConnection}
      >
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
          <PrivateRoute path="/userinfo/my">
            <Redirect to={`/userinfo/${loggedIn()?.result?._id}`} />
          </PrivateRoute>
          <PrivateRoute path="/userinfo/:id" exact component={UserInfoPage} />
          <Route exact path="/post/:id" component={SpecificPostPage} />
          <Route path="/post/:id/:commentId" component={SpecificPostPage} />
          <Route exact path="/search" component={UserResultSearchPage} />
          <PrivateRoute
            exact
            path="/group/:id/requests"
            component={GroupPage}
          />
          <Route exact path="/wall" component={WallPage} />
          <Route path="/userinfo/:id/about" component={AboutPage} />
          <PrivateRoute exact path="/friends" component={FriendMangementPage} />
          <PrivateRoute
            exact
            path="/mutualFriends/:id"
            component={MutualFriendPage}
          />
          <Route exact path="/groups/" component={GroupManagementPage} />
          <Route path="/demoSocketIO" component={DemoSocket} />
          <PrivateRoute
            exact
            path="/group/create"
            component={CreateGroupPage}
          />
          <Route exact path="/group/:id" component={GroupPage} />
          <Route exact path="/settings" component={SettingsPage} />
          <Route exact path="/activate/:token" component={ActivationPage} />
          <PrivateRoute exact path="/message" component={MessagePage} />
          <Route path="/group/:id/about" component={GroupPage} />
          <Route path="/group/:id/members" component={GroupPage} />
          <Route path="/reports/user" component={ReportUserPage} />
          <Route>
            <ErrorPage code="404" />
          </Route>
        </Switch>
      </CuteClientIOProvider>
    </div>
  );
}

export default App;
