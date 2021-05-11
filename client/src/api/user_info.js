import API from "./index";

export const fetchUserInfo = (id) => API.get(`/userInfo/${id}`);
export const updateUserInfo = (updatedInfo) =>
  API.put(`/userInfo/${updatedInfo._id}`, updatedInfo);
