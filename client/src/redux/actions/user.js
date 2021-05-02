import { FETCH_USER } from "../actionTypes";
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
