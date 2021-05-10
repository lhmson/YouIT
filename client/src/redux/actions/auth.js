import { AUTH, LOGOUT } from "../actionTypes";
import * as api from "../../api/auth";
import { message } from "antd";

export const signin = (formData, router, setLocalStorageUser) => async (
  dispatch
) => {
  try {
    console.log("signin");
    const { data } = await api.signIn(formData);
    dispatch({ type: AUTH, data, setLocalStorageUser });
    router.push("/");
    message.success("Login successfully!");
  } catch (error) {
    console.log(error);
    message.error("Wrong email or password, try again!");
  }
};

export const signup = (formData, router, setLocalStorageUser) => async (
  dispatch
) => {
  try {
    console.log("signup");
    const { data } = await api.signUp(formData);
    dispatch({ type: AUTH, data, setLocalStorageUser });
    router.push("/");
  } catch (error) {
    console.log(error);
  }
};

export const logout = () => async (dispatch, setLocalStorageUser) => {
  dispatch({ type: LOGOUT });
};
