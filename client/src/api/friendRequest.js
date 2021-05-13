import API from "./index";

export const createFriendRequest = (friendRequest) =>
  API.post(`/friendRequest/create`, friendRequest);
