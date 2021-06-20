import {
  FETCH_USER,
  UPDATE_USER,
  ADD_FRIEND_REQUEST,
  REMOVE_FRIEND_REQUEST,
  UNFRIEND,
  FOLLOW_USER,
  UNFOLLOW_USER,
} from "../actionTypes";
import * as api from "../../api/user_info";

export const getUser = (uid, history) => async (dispatch) => {
  try {
    await api
      .fetchUserInfo(uid)
      .then((res) => dispatch({ type: FETCH_USER, payload: res.data }))
      .catch((error) => {
        if (error.response?.status === 404) history.push("/error404");
      });
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

export const followUser = (followedId) => async (dispatch) => {
  try {
    const { data } = await api.followUser(followedId);
    dispatch({ type: FOLLOW_USER, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const unfollowUser = (followedId) => async (dispatch) => {
  try {
    const { data } = await api.unfollowUser(followedId);
    dispatch({ type: UNFOLLOW_USER, payload: data });
  } catch (error) {
    console.log(error);
  }
};
