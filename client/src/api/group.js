import API from "./index";

export const createGroup = (newGroup) => API.post("/group", newGroup);

export const fetchAGroup = (id) => API.get(`/group/${id}`);
export const fetchUserJoinedGroups = () => API.get(`/group/list/joinedByMe`);

export const getListMembers = (id) => API.get(`/group/${id}/members`);
export const getListPendingMembers = (id) =>
  API.get(`/group/${id}/pendingMembers`);
export const fetchUserPendingGroups = () => API.get(`/group/list/pendingByMe`);

export const addPendingMemberGroup = (groupId, userId) =>
  API.put(`/group/${groupId}/addPendingMember/${userId}`);
export const removePendingMember = (groupId, userId) =>
  API.put(`/group/${groupId}/removePendingMember/${userId}`);
export const deleteMember = (groupId, deletedUserId) =>
  API.put(`/group/${groupId}/deleteMember/${deletedUserId}`);
export const leaveGroup = (groupId, userId) =>
  API.put(`/group/${groupId}/leaveGroup/${userId}`);
export const addGroupMember = (groupId, memberId) =>
  API.put(`/group/${groupId}/leaveGroup/${memberId}`);

export const deleteGroup = (id) => API.delete(`/group/${id}`);
