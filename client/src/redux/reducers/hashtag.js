import { FETCH_ALL_HASHTAGS } from "../actionTypes";

const hashtagReducer = (hashtags = [], action) => {
  switch (action.type) {
    case FETCH_ALL_HASHTAGS:
      return action.payload;
    default:
      return hashtags;
  }
}

export default hashtagReducer;