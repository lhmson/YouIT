import { CREATE_COMMENT, FETCH_COMMENTS } from "../actionTypes";

import * as api from "../../api/comments";

export const createComment = (postId, comment, onDone) => async (dispatch) => {
  try {
    const { data } = await api.createComment(postId, comment);

    dispatch({ type: CREATE_COMMENT, payload: data });
    onDone?.();
  } catch (error) {
    console.log(error);
  }
};

export const getComments = (postId) => async (dispatch) => {
  try {
    const { data } = await api.fetchComments(postId);

    dispatch({ type: FETCH_COMMENTS, payload: data });
  } catch (error) {
    console.log(error);
  }
};
