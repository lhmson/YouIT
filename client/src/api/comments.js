import API from "./index";

export const fetchComments = (postId) => API.get(`/posts/${postId}/comments`);
export const createComment = (postId, newComment) =>
  API.post(`posts/${postId}/comments`, newComment);
