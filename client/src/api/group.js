import API from "./index";

export const createGroup = (newGroup) => API.post("/group", newGroup);
