import API from "./index";

export const fetchComments = (postId) => API.get(`/post/${postId}/comment`);
export const createComment = (postId, newComment) =>
  API.post(`/post/${postId}/comment`, newComment);
export const replyComment = (postId, commentId, newComment) =>
  API.post(`/post/${postId}/comment/${commentId}`, newComment);
export const editComment = (commentId, newComment) =>
  API.put(`/comment/${commentId}`, newComment);
export const deleteComment = (commentId) => API.delete(`/comment/${commentId}`);

export const upvoteComment = (id, postId) =>
  API.put(`/comment/${id}/${postId}/upvote`);

export const unvoteComment = (id, postId) =>
  API.put(`/comment/${id}/${postId}/unvote`);

export const downvoteComment = (id, postId) =>
  API.put(`/comment/${id}/${postId}/downvote`);

export const getMyCommentInteractions = (id) =>
  API.get(`/comment/${id}/myInteractions`);
