import { FETCH_USER, UPDATE_USER, UPDATE_RECEIVER } from "../actionTypes";
import * as api from "../../api/user_info";

export const getUser = (uid) => async (dispatch) => {
  try {
    const { data } = await api.fetchUserInfo(uid);
    //console.log("data ", data);
    dispatch({ type: FETCH_USER, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = (updatedUser) => async (dispatch) => {
  try {
    const { data } = await api.updateUserInfo(updatedUser);
    //console.log(data);
    dispatch({ type: UPDATE_USER, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const addFriendRequest = (friendRequest) => async (dispatch) => {
  try {
    const { data } = await api.addReceivingFriendRequest(friendRequest);
    dispatch({ type: UPDATE_RECEIVER, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const removeFriendRequest = (friendRequest) => async (dispatch) => {
  try {
    const { data } = await api.removeReceivingFriendRequest(friendRequest);
    dispatch({ type: UPDATE_RECEIVER, payload: data });
  } catch (error) {
    console.log(error);
  }
};
