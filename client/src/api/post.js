import API from "./index";

export const fetchPosts = () => API.get("/post/list/all");
export const fetchAPost = (id) => API.get(`/post/${id}`);
export const fetchPostsPagination = (page, limit) =>
  API.get(`/post?_page=${page}&_limit=${limit}`);
export const fetchOtherPosts = (id) => API.get(`post/${id}/others`);

export const createPost = (newPost) => API.post("/post", newPost);

export const updatePost = (id, updatedPost) =>
  API.put(`/post/${id}`, updatedPost);
export const likePost = (id) => API.put(`/post/${id}/likePost`);

export const deletePost = (id) => API.delete(`/post/${id}`);
