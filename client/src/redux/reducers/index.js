import { combineReducers } from "redux";

import posts from "./posts";
import auth from "./auth";

import user from "./user";

export const reducers = combineReducers({ posts, auth, user });
