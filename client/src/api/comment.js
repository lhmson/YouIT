import API from "./index";

export const fetchComments = (postId) => API.get(`/post/${postId}/comment`);
export const createComment = (postId, newComment) =>
  API.post(`post/${postId}/comment`, newComment);
