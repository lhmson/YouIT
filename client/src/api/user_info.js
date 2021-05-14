import API from "./index";

export const fetchUserInfo = (id) => API.get(`/userInfo/${id}`);
export const updateUserInfo = (updatedInfo) =>
  API.put(`/userInfo/${updatedInfo._id}`, updatedInfo);
export const addReceivingFriendRequest = (friendRequest) =>
  API.put(
    `/userInfo/${friendRequest.userConfirmId}/receiveFriendRequest/add`,
    friendRequest
  );
export const addSendingFriendRequest = (friendRequest) =>
  API.put(
    `/userInfo/${friendRequest.userSendRequestId}/sendFriendRequest/add`,
    friendRequest
  );

export const removeReceivingFriendRequest = (friendRequest) =>
  API.put(
    `/userInfo/${friendRequest.userConfirmId}/receiveFriendRequest/remove`,
    friendRequest
  );
export const removeSendingFriendRequest = (friendRequest) =>
  API.put(
    `/userInfo/${friendRequest.userSendRequestId}/sendFriendRequest/remove`,
    friendRequest
  );
export const addFriend = (user, friend) =>
  API.put(`/userInfo/${user._id}/addfriend`, friend);
