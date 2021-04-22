import API from "./index";

export const fetchPosts = () => API.get("/post/list/all");
export const createPost = (newPost) => API.post("/post", newPost);
export const updatePost = (id, updatedPost) =>
  API.put(`/post/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/post/${id}`);
export const likePost = (id) => API.put(`/post/${id}/likePost`);
export const fetchAPost = (id) => API.get(`/post/${id}`);
