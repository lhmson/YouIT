import React, { useEffect } from "react";
import styles from "./styles.js";
import { Switch, Route, Redirect } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";

import {
  CreatePostPage,
  FeedPage,
  UserInfoPage,
  SpecificPostPage,
  UserResultSearchPage,
  AboutPage,
  GroupPage,
  CreateGroupPage,
  LoginPage,
  RegisterPage,
  ErrorPage,
  HomePage,
  MessagePage,
  FriendManagementPage,
  MutualFriendPage,
  GroupManagementPage,
  AuthAdminPage,
  StatisticsPage,
  ReportUserPage,
  ReportGroupPage,
} from "./pages/index";

import { CuteClientIOProvider } from "./socket/CuteClientIOProvider.js";
import { useLocalStorage } from "./hooks/useLocalStorage.js";
import DemoSocket from "./socket/DemoComponent/DemoSocket.js";
import { useToken } from "./context/TokenContext.js";
import PrivateRoute from "./utils/PrivateRoute.js";
import { handleNewIOConnection } from "./notifications/index.js";
import SettingsPage from "./pages/SettingsPage/SettingsPage.js";
import ActivationPage from "./pages/ActivationPage/ActivationPage.js";
import AdminDashboardPage from "./pages/SystemAdmin/AdminDashboardPage/AdminDashboardPage.js";
import { FriendsStatusProvider } from "./context/FriendsStatusContext.js";
import { BACKEND_URL } from "./constants/config.js";
import { useDispatch } from "react-redux";
import { getUser } from "./redux/actions/user.js";

const loggedIn = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user;
};

const isAdmin = () => {
  return true; //TODO: handle set login admin
};

function App() {
  const [token, setToken] = useToken();
  const [user] = useLocalStorage("user");

  const dispatch = useDispatch();

  useEffect(() => {
    //console.log("start fetching user");
    dispatch(getUser(user?.result?._id));
  }, []);

  return (
    <div className={styles.App}>
      <CuteClientIOProvider
        serverUri={BACKEND_URL} //TODO: change all localhost to deploy link
        token={token}
        onNewConnection={handleNewIOConnection}
      >
        <FriendsStatusProvider userId={user?.result?._id}>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/login">
              {loggedIn() ? <Redirect to="/" /> : <LoginPage />}
            </Route>
            <Route exact path="/register">
              {loggedIn() ? <Redirect to="/" /> : <RegisterPage />}
            </Route>
            <PrivateRoute exact path="/feed" component={FeedPage} />
            <PrivateRoute
              exact
              path="/post/create"
              component={CreatePostPage}
            />
            <PrivateRoute path="/userinfo/my">
              <Redirect to={`/userinfo/${loggedIn()?.result?._id}`} />
            </PrivateRoute>
            <PrivateRoute path="/userinfo/:id" exact component={UserInfoPage} />
            <Route exact path="/post/:id" component={SpecificPostPage} />
            <Route path="/post/:id/:commentId" component={SpecificPostPage} />
            <Route exact path="/search" component={UserResultSearchPage} />
            {/* <PrivateRoute
              exact
              path="/group/:id/requests"
              component={GroupPage}
            /> */}
            <Route path="/userinfo/:id/about" component={AboutPage} />
            <PrivateRoute
              exact
              path="/friends"
              component={FriendManagementPage}
            />
            <PrivateRoute
              exact
              path="/mutualFriends/:id"
              component={MutualFriendPage}
            />
            <Route exact path="/groups" component={GroupManagementPage} />
            <Route path="/demoSocketIO" component={DemoSocket} />
            <PrivateRoute
              exact
              path="/group/create"
              component={CreateGroupPage}
            />
            <Route exact path="/group/:id/:menu" component={GroupPage} />
            <Route exact path="/group/:id">
              <Redirect to="/group/:id/main" />
            </Route>
            <Route exact path="/settings" component={SettingsPage} />
            <Route exact path="/activate/:token" component={ActivationPage} />
            <PrivateRoute exact path="/message" component={MessagePage} />
            {/* <Route path="/group/:id/about" component={GroupPage} />
            <Route path="/group/:id/members" component={GroupPage} /> */}
            <PrivateRoute exact path="/admin">
              {isAdmin() ? (
                <Redirect to="/admin/dashboard" />
              ) : (
                <AuthAdminPage />
              )}
            </PrivateRoute>
            <PrivateRoute exact path="/admin/dashboard">
              {isAdmin() ? <AdminDashboardPage /> : <Redirect to="/admin" />}
            </PrivateRoute>
            <Route exact path="/statistics" component={StatisticsPage} />
            <Route exact path="/admin/user" component={ReportUserPage} />
            <Route path="/admin/group" component={ReportGroupPage} />
            <Route exact path="/error403">
              <ErrorPage code="403" />
            </Route>
            <Route>
              <ErrorPage code="404" />
            </Route>
          </Switch>
        </FriendsStatusProvider>
      </CuteClientIOProvider>
    </div>
  );
}

export default App;
