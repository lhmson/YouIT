import API from "./index";

export const fetchPosts = () => API.get("/post/list/all");
export const fetchAPost = (id) => API.get(`/post/${id}`);
export const fetchPostsPagination = (page, limit) =>
  API.get(`/post?_page=${page}&_limit=${limit}`);
export const fetchOtherPosts = (id) => API.get(`post/${id}/others`);

export const createPost = (newPost) => API.post("/post", newPost);

// owner action
export const updatePost = (id, updatedPost) =>
  API.put(`/post/${id}`, updatedPost);

export const deletePost = (id) => API.delete(`/post/${id}`);

// user interaction
export const likePost = (id) => API.put(`/post/${id}/likePost`);

export const upvotePost = (id) => API.put(`/post/${id}/upvote`);

export const unvotePost = (id) => API.put(`/post/${id}/unvote`);

export const downvotePost = (id) => API.put(`/post/${id}/downvote`);

export const getMyInteractions = (id) => API.get(`/post/${id}/myInteractions`);
