import API from "./index";

export const fetchHashtags = () => API.get("/hashtag/list/all");
export const fetchAHashtag = (hashtagId) => API.get(`/hashtag/${hashtagId}`);

export const createHashtag = (hashtag) => API.post("/hashtag", hashtag);

export const deleteHashtag = (hashtagId) => API.delete(`/hashtag/${hashtagId}`);
