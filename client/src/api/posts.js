import API from "./index";

export const fetchPosts = () => API.get("/posts");
export const fetchPostsPagination = (page, limit) =>
  API.get(`/posts?_page=${page}&_limit=${limit}`);
export const createPost = (newPost) => API.post("/posts", newPost);
export const updatePost = (id, updatedPost) =>
  API.put(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.put(`/posts/${id}/likePost`);
export const fetchAPost = (id) => API.get(`/posts/${id}`);
