import API from "./index";

export const fetchUserInfo = (id) => API.get(`/userInfo/${id}`);

export const updateUserInfo = (updatedInfo) =>
  API.put(`/userInfo`, updatedInfo);
export const addReceivingFriendRequest = (friendRequest) =>
  API.put(
    `/userInfo/${friendRequest?.userConfirmId}/receiveFriendRequest/add`,
    friendRequest
  );
export const addSendingFriendRequest = (friendRequest) =>
  API.put(
    `/userInfo/${friendRequest?.userSendRequestId}/sendFriendRequest/add`,
    friendRequest
  );

export const removeReceivingFriendRequest = (friendRequest) =>
  API.put(
    `/userInfo/${friendRequest?.userConfirmId}/receiveFriendRequest/remove`,
    friendRequest
  );
export const removeSendingFriendRequest = (friendRequest) =>
  API.put(
    `/userInfo/${friendRequest?.userSendRequestId}/sendFriendRequest/remove`,
    friendRequest
  );
export const addFriend = (friendRequest) =>
  API.put(`/userInfo/addfriend`, friendRequest);
export const unfriend = (userId, friendId) =>
  API.put(`/userInfo/${userId}/unfriend/${friendId}`);
export const followUser = (followedId) =>
  API.put(`/userInfo/${followedId}/follow`);
export const unfollowUser = (followedId) =>
  API.put(`/userInfo/${followedId}/unfollow`);
export const addProgrammingHashtag = (hashtagId) =>
  API.put(`/userInfo/addProgrammingHashtag/${hashtagId}`);
export const removeProgrammingHashtag = (hashtagId) =>
  API.put(`/userInfo/removeProgrammingHashtag/${hashtagId}`);
export const editImage = (image) => API.put("/userInfo/editImage", image);
