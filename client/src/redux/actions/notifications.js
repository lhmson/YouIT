import {
  FETCH_USER_NOTIFICATIONS,
  ADD_USER_NOTIFICATIONS,
  REFRESH_NOTIFICATIONS,
  SET_SEEN_NOTIFICATION,
} from "../actionTypes";

import * as api from "../../api/notification";

export const getUserNotifications = () => async (dispatch) => {
  try {
    const { data } = await api.fetchAllNotifications();
    dispatch({ type: FETCH_USER_NOTIFICATIONS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

// export const getUserUnseenNotifications = () => async (dispatch) => {
//   try {
//     const { data } = await api.fetchUnseenNotifications();
//     dispatch({ type: FETCH_USER_NOTIFICATIONS, payload: data });
//   } catch (error) {
//     console.log(error);
//   }
// };

export const addUserNotifications = (data) => async (dispatch) => {
  try {
    //   const { data } = await api.fetchAllNotifications();
    dispatch({ type: ADD_USER_NOTIFICATIONS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const setSeenNotification =
  (id, seen, history, url) => async (dispatch) => {
    try {
      const { data } = await api.setSeenNotifications(id, seen);
      dispatch({ type: SET_SEEN_NOTIFICATION, payload: data });
      if (history && url) history.push(url);
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
