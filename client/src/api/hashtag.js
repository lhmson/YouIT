import API from "./index";

export const fetchHashtags = () => API.get("/hashtag/list/all");
export const fetchAHashtag = (hashtagId) => API.get(`/hashtag/${hashtagId}`);
export const fetchProgrammingHashtags = (userId) =>
  API.get(`/hashtag/${userId}/programmingHashtags`);
export const fetchHashtagsTop = (number) =>
  API.get(`/hashtag/list/top?number=${number}`);

export const createHashtag = (hashtag) => API.post("/hashtag", hashtag);

export const deleteHashtag = (hashtagId) => API.delete(`/hashtag/${hashtagId}`);
