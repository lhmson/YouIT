import { AUTH, LOGOUT } from "../actionTypes";
import * as api from "../../api/auth";

export const signin = (formData, router) => async (dispatch) => {
  try {
    console.log("signin");
    const { data } = await api.signIn(formData);
    dispatch({ type: AUTH, data });
    router.push("/feed");
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, router) => async (dispatch) => {
  try {
    console.log("signup");
    const { data } = await api.signUp(formData);
    dispatch({ type: AUTH, data });
    router.push("/");
  } catch (error) {
    console.log(error);
  }
};

export const logout = () => async (dispatch) => {
  dispatch({ type: LOGOUT });
};
