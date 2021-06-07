import API from "./index";

export const fetchConversationsOfUser = () => API.get("/conversation/list/my");
export const fetchAConversation = (id, start, end) =>
  API.get(`/conversation/${id}?msgStart=${start}&msgEnd=${end}`);

export const fetchUnseenConversationId = () =>
  API.get("/conversation/list/unseenIds");

export const createConversation = (usersToAdd) =>
  API.post(`/conversation/`, usersToAdd);

export const addMessage = (conversationId, newMessage) =>
  API.put(`/conversation/${conversationId}/addMessage`, newMessage);


/**
 * @param {string} conversationId 
 * @param {{title: string, listMembers: [string]}} newConversationData 
 * @returns 
 */
export const updateConversation = (conversationId, newConversationData) =>
  API.put(`/conversation/${conversationId}`, newConversationData);


export const deleteConversation = (conversationId) =>
  API.delete(`/conversation/${conversationId}`)