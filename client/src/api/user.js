import API from "./index";

export const fetchNewUsers = (range, timeString) =>
  API.get(`/user/newUsers/${range}/${timeString}`);
