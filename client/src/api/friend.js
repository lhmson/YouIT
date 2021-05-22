import API from "./index";

export const fetchListMyFriends = (id) => API.get(`/friend/${id}/listFriends`);
export const fetchCountListMyFriends = (id) =>
  API.get(`/friend/${id}/countFriends`);
