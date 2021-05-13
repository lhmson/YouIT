import API from "./index";

export const fetchAllFriendRequests = () => API.get(`/friendRequest/list/all`);

export const createFriendRequest = (friendRequest) =>
  API.post(`/friendRequest/create`, friendRequest);

export const deleteFriendRequest = (id) => API.delete(`/friendRequest/${id}`);
