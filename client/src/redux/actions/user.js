import {
  FETCH_USER,
  UPDATE_USER,
  ADD_FRIEND_REQUEST,
  REMOVE_FRIEND_REQUEST,
  UNFRIEND,
} from "../actionTypes";
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
    console.log(data);
    dispatch({ type: UPDATE_USER, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const addFriendRequest = (friendRequest) => async (dispatch) => {
  try {
    const { data } = await api.addReceivingFriendRequest(friendRequest);
    dispatch({ type: ADD_FRIEND_REQUEST, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const removeFriendRequest =
  (friendRequest, user) => async (dispatch) => {
    try {
      // if page is loading receiver's data, update receiver
      if (user?._id === friendRequest?.userConfirmId) {
        const { data } = await api.removeReceivingFriendRequest(friendRequest);
        dispatch({ type: REMOVE_FRIEND_REQUEST, payload: data });
      } else if (user?._id === friendRequest?.userSendRequestId) {
        const { data } = await api.removeSendingFriendRequest(friendRequest);
        dispatch({ type: REMOVE_FRIEND_REQUEST, payload: data });
      }
    } catch (error) {
      console.log(error);
    }
  };

export const unfriend = (userId, friendId) => async (dispatch) => {
  try {
    const { data } = await api.unfriend(userId, friendId);
    dispatch({ type: UNFRIEND, payload: data });
  } catch (error) {
    console.log(error);
  }
};
