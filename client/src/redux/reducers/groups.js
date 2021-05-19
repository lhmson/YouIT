import { CREATE_GROUP } from "../actionTypes";

const groupReducer = (groups = [], action) => {
  switch (action.type) {
    case CREATE_GROUP:
      return [...groups, action.payload];

    default:
      return groups;
  }
};

export default groupReducer;
