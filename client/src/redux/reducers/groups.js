import { CREATE_GROUP, FETCH_USER_JOINED_GROUPS } from "../actionTypes";

const groupReducer = (groups = [], action) => {
  switch (action.type) {
    case CREATE_GROUP:
      return [...groups, action.payload];

    case (FETCH_USER_JOINED_GROUPS):
      return action.payload;

    default:
      return groups;
  }
};

export default groupReducer;
