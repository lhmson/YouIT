import { combineReducers } from "redux";

import posts from "./posts";
import auth from "./auth";

import user from "./user";
import notifications from "./notifications";
import groups from "./groups";

export const reducers = combineReducers({
  posts,
  auth,
  user,
  notifications,
  groups,
});
