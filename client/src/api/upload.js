import API from "./index";

export const uploadImage = (content, type) =>
  API.post(`upload/img?type=${type}`, content);
