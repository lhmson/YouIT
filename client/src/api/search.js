import API from "./index";

export const fetchSearchUser = (nameUser) =>
  API.get(`/search/user?q=${nameUser}`);

export const fetchSearchPost = (txtSearch) =>
  API.get(`/search/post?q=${txtSearch}`);

export const fetchSearchGroup = (txtSearch) =>
  API.get(`/search/group?q=${txtSearch}`);
