import API from "./index";

export const fetchConversationsOfUser = () => API.get("/conversation/list/my");
export const fetchAConversation = (id, start, end) => API.get(`/conversation/${id}?msgStart=${start}&msgEnd=${end}`);

export const createConversation = (usersToAdd) => API.post(`/conversation/`, usersToAdd);
export const addMessage = (conversationId, newMessage) =>
  API.put(`/conversation/${conversationId}/addMessage`, newMessage);

export const fetchUnseenConversationId = () => API.get("/conversation/list/unseenIds")

