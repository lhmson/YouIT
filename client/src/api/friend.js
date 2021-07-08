import API from "./index";

export const fetchListMyFriends = (id) => API.get(`/friend/${id}/listFriends`);
export const fetchListMutualFriends = (userId1, userId2) =>
  API.get(`/friend/listMutualFriends/${userId1}/${userId2}`);

export const fetchCountListMyFriends = (id) =>
  API.get(`/friend/${id}/countFriends`);

export const fetchCountMutualFriends = (userId1, userId2) =>
  API.get(`/friend/countMutualFriends/${userId1}/${userId2}`);

export const fetchListRequestFriends = (userId) =>
  API.get(`/friend/${userId}/listRequestFriends`);

export const checkFriends = (userId1, userId2) =>
  API.get(`/friend/checkFriends/${userId1}/${userId2}`);

export const getSuggestion = (userId) =>
  API.get(`/friend/${userId}/getSuggestion`);
