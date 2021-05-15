import {
  FETCH_USER_NOTIFICATIONS,
  ADD_USER_NOTIFICATIONS,
  REFRESH_NOTIFICATIONS,
} from "../actionTypes";

import * as api from "../../api/notification";

export const getUserNotifications = () => async (dispatch) => {
  try {
    const { data } = await api.fetchUserNotifications();
    dispatch({ type: FETCH_USER_NOTIFICATIONS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const addUserNotifications = (data) => async (dispatch) => {
  try {
    //   const { data } = await api.fetchUserNotifications();
    dispatch({ type: ADD_USER_NOTIFICATIONS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const refreshNotifications = () => async (dispatch) => {
  try {
    dispatch({ type: REFRESH_NOTIFICATIONS });
  } catch (error) {
    console.log(error);
  }
};
