import { FETCH_SEARCH_USER } from "../actionTypes";
import * as api from "../../api/search";

export const searchUser = (nameUser) => async (dispatch) => {
  try {
    const { data } = await api.fetchSearchUser(uid);
    console.log("data search", data);
    dispatch({ type: FETCH_SEARCH_USER, payload: data });
  } catch (error) {
    console.log(error);
  }
};
