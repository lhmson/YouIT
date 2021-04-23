import API from "./index";

export const fetchComments = (id) => API.get(`/posts/${id}/comments`);
