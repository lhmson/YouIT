import { AUTH, LOGOUT } from "../actionTypes";
import * as api from "../../api/auth";
import { message } from "antd";
import { forceGetNewLocalStorageToken } from "../../utils/forceGetNewLocalStorageToken";

export const signin =
  (formData, router, setLocalStorageUser, oldToken, setToken) =>
    async (dispatch) => {
      try {
        console.log("signin");
        const { data } = await api.signIn(formData);
        dispatch({ type: AUTH, data, setLocalStorageUser });
        // dirty code to force sign in
        // setTimeout(() => {
        //   setToken(JSON.parse(localStorage.getItem("user"))?.token);
        // }, 2000);
        // forceGetNewLocalStorageToken(oldToken, setToken);

        // router.push("/");
        window.location.reload(); // this is to make force log out work :)
        message.success("Login successfully!");
      } catch (error) {
        console.log("Error sign in", error);
        message.error("Something went wrong, please try again.");
      }
    };

export const signup = (formData, router) => async (dispatch) => {
  try {
    console.log("signup");
    await api.signUp(formData);
    // dispatch({ type: AUTH, data });
    router.push("/login");
    message.success("Register successfully!");
  } catch (error) {
    console.log(error);
    message.error("This email has already been used.");
  }
};

export const logout =
  (setLocalStorageUser, oldToken, setToken) => async (dispatch) => {
    dispatch({ type: LOGOUT, setLocalStorageUser });
    // setTimeout(() => {
    //   setToken(JSON.parse(localStorage.getItem("user"))?.token);
    //   // setToken(null);
    // }, 2000);
    forceGetNewLocalStorageToken(oldToken, setToken);
  };
