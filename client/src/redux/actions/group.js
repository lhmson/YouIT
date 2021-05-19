import { CREATE_GROUP } from "../actionTypes";

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
