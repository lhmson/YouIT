import {
  FETCH_USER,
  UPDATE_USER,
  ADD_FRIEND_REQUEST,
  REMOVE_FRIEND_REQUEST,
} from "../actionTypes";

const userReducer = (user = null, action) => {
  switch (action.type) {
    case FETCH_USER:
      return action.payload;
    case UPDATE_USER:
      return action.payload;
    case ADD_FRIEND_REQUEST:
      return action.payload;
    case REMOVE_FRIEND_REQUEST:
      return action.payload;
    default:
      return user;
  }
};

export default userReducer;
