import { AUTH, LOGOUT } from "../actionTypes";
import * as api from "../../api/auth";
import { message } from "antd";

export const signin =
  (
    formData,
    router,
    setLocalStorageUser,
    oldToken,
    setToken,
    setResend,
    setDisableLogin
  ) =>
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
      // window.location.reload();
      message.success("Login successfully!");
    } catch (error) {
      const code = error.response?.status;
      const data = error.response?.data;
      if (code === 401 || code === 404) {
        if (data.message === "Unactivated") {
          setDisableLogin(true);
          setResend(true);
          message.success("Please check your email to verify.");
        } else {
          setDisableLogin(false);
          message.error("Wrong username or password.");
        }
      } else {
        setDisableLogin(false);
        message.error("Something went wrong.");
      }
    }
  };

export const signup =
  (formData, setResend, setDisableReg) => async (dispatch) => {
    try {
      console.log("signup");
      await api.signUp(formData);
      // dispatch({ type: AUTH, data });
      setResend(true);
      message.success("Please check your email to verify.");
    } catch (error) {
      var errorMessage;
      switch (error.response?.status) {
        case 409:
          errorMessage = "User already exists.";
          setDisableReg(false);
          break;
        default:
          errorMessage = "Something went wrong.";
          setDisableReg(false);
      }
      message.error(errorMessage);
    }
  };

export const signout = (browserId) => async (dispatch) => {
  api.signOut(browserId);
};
// (setLocalStorageUser, oldToken, setToken) => async (dispatch) => {
// dispatch({ type: LOGOUT, setLocalStorageUser });
// setTimeout(() => {
//   setToken(JSON.parse(localStorage.getItem("user"))?.token);
//   // setToken(null);
// }, 2000);
// window.location.reload(); // this is to make force log out work :)
// forceGetNewLocalStorageToken(oldToken, setToken);
// };
