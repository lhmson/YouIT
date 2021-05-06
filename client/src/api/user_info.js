import API from "./index";

export const fetchUserInfo = (id) => API.get(`/userInfo/${id}`);
export const updateUserInfo = (id, updatedInfo) =>
  API.put(`/userInfo/${id}`, updatedInfo);
