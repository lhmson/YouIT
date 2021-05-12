import { FETCH_SEARCH_USER } from "../actionTypes";

const searchReducer = (user = null, action) => {
  switch (action.type) {
    case FETCH_SEARCH_USER:
      return action.payload;

    default:
      return user;
  }
};

export default searchReducer;
