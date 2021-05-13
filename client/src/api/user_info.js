import API from "./index";

export const fetchUserInfo = (id) => API.get(`/userInfo/${id}`);
export const updateUserInfo = (updatedInfo) =>
  API.put(`/userInfo/${updatedInfo._id}`, updatedInfo);
export const updateListReceivingFriendRequests = (friendRequest) =>
  API.put(
    `/userInfo/${friendRequest.userConfirmId}/receiveFriendRequest`,
    friendRequest
  );
export const updateListSendingFriendRequests = (friendRequest) =>
  API.put(
    `/userInfo/${friendRequest.userSendRequestId}/sendFriendRequest`,
    friendRequest
  );
