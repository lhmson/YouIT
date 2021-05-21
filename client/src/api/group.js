import API from "./index";

export const createGroup = (newGroup) => API.post("/group", newGroup);
export const fetchAGroup = (id) => API.get(`/group/${id}`);
export const deleteGroup = (id) => API.delete(`/group/${id}`);
