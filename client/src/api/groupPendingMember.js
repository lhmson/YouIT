import API from "./index";

export const addGroupPendingMember = (pendingMember) =>
  API.post("/groupPendingMember", pendingMember);
