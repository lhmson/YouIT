import API from "./index";

export const fetchComments = (postId) =>
  API.get(`/posts/${postId}/comment/list/all`);
export const createComment = (postId, newComment) =>
  API.post(`posts/${postId}/comment`, newComment);
