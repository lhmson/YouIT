import React from "react";
import styles from "./App.module.css";
import { Switch, Route } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import AuthPage from "./pages/AuthPage/AuthPage";
import CreatePostPage from "./pages/CreatePostPage/CreatePostPage";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <div className={styles.App}>
      <Switch>
        <Route path="/" exact component={MainPage} />
        <Route path="/auth" component={AuthPage} />
        <Route path="/post/create" component={CreatePostPage} />
      </Switch>
    </div>
  );
}

export default App;
