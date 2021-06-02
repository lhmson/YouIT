import {
  CREATE_GROUP,
  FETCH_USER_JOINED_GROUPS,
  FETCH_LIST_MEMBER_GROUP,
} from "../actionTypes";

import * as api from "../../api/group";

export const createGroup = (group) => async (dispatch) => {
  try {
    const { data } = await api.createGroup(group);
    // router.push("/group");
    dispatch({ type: CREATE_GROUP, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const fetchUserJoinedGroups = () => async (dispatch) => {
  try {
    const { data } = await api.fetchUserJoinedGroups();
    dispatch({ type: FETCH_USER_JOINED_GROUPS, payload: data });
  } catch (error) {
    console.error(error);
  }
};
