import { FETCH_USER, UPDATE_USER, UPDATE_RECEIVER } from "../actionTypes";

const userReducer = (user = null, action) => {
  switch (action.type) {
    case FETCH_USER:
      return action.payload;
    case UPDATE_USER:
      return action.payload;
    case UPDATE_RECEIVER:
      return action.payload;
    default:
      return user;
  }
};

export default userReducer;
