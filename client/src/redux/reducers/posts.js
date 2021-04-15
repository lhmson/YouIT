import {
  FETCH_ALL_POSTS,
  FETCH_A_POST,
  CREATE_POST,
  UPDATE_POST,
  DELETE_POST,
  LIKE_POST,
} from "../actionTypes";

const postReducer = (posts = [], action) => {
  switch (action.type) {
    case FETCH_ALL_POSTS:
      return action.payload;
    case FETCH_A_POST:
      return action.payload;
    case CREATE_POST:
      return [...posts, action.payload];
    case UPDATE_POST:
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case LIKE_POST:
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case DELETE_POST:
      return posts.filter((post) => post._id !== action.payload);
    default:
      return posts;
  }
};

export default postReducer;
