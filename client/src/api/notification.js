import API from "./index";

export const fetchUserNotifications = () => API.get("/notification/my/");
