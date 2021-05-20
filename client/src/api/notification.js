import API from "./index";

export const fetchAllNotifications = () => API.get("/notification/my");
export const fetchSeenNotifications = () =>
  API.get("/notification/my?opt=seen");
export const fetchUnseenNotifications = () =>
  API.get("/notification/my?opt=unseen");

export const setSeenNotifications = (id, seen) =>
  API.put(`/notification/setSeen/${id}/${seen}`);
