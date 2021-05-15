import {
  FETCH_USER_NOTIFICATIONS,
  ADD_USER_NOTIFICATIONS,
} from "../actionTypes";

// import * as api from "../../api/notifications";

export const getUserNotifications = () => async (dispatch) => {
  try {
    const data = "test";
    //   const { data } = await api.fetchUserNotifications();
    dispatch({ type: FETCH_USER_NOTIFICATIONS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const addUserNotifications = (noti) => async (dispatch) => {
  try {
    const data = "test";
    //   const { data } = await api.fetchUserNotifications();
    dispatch({ type: ADD_USER_NOTIFICATIONS, payload: data });
  } catch (error) {
    console.log(error);
  }
};
