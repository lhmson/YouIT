import API from "./index";

export const fetchFriendsStatus = () => API.get("/user/list/friendsStatus");
export const fetchMyStatus = () => API.get("/user/getStatus");

/**
 * @param {"busy"|"online"|"offline"} newStatus
 */
export const setMyStatus = (newStatus) =>
  API.put(`/user/setStatus/${newStatus}`);
