import API from "./index";

export const fetchConversationsOfUser = () => API.get("/conversation/list/my");
export const fetchAConversation = (id, limit) => API.get(`/conversation/${id}?msgLimit=${limit}`);

export const createConversation = (usersToAdd) => API.post(`/conversation/`, usersToAdd);
export const addMessage = (conversationId, newMessage) =>
  API.put(`/conversation/${conversationId}/addMessage`, newMessage);

