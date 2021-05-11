import { FETCH_USER, UPDATE_USER } from "../actionTypes";

const userReducer = (user = null, action) => {
  switch (action.type) {
    case FETCH_USER:
      return action.payload;
    case UPDATE_USER:
      console.log("payload: ", action.payload);
      return action.payload;
    default:
      return user;
  }
};

export default userReducer;
