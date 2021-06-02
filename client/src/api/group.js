import API from "./index";

export const createGroup = (newGroup) => API.post("/group", newGroup);

export const fetchAGroup = (id) => API.get(`/group/${id}`);
export const fetchUserJoinedGroups = () => API.get(`/group/list/joinedByMe`);
export const getListMembers = (id) => API.get(`/group/${id}/members`);

export const addPendingMemberGroup = (groupId, userId) =>
  API.put(`/group/${groupId}/addPendingMember/${userId}`);

export const deleteMember = (groupId, userId) =>
  API.put(`/group/${groupId}/deleteMember/${userId}`);
export const deleteGroup = (id) => API.delete(`/group/${id}`);
