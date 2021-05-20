import {
  FETCH_USER_NOTIFICATIONS,
  ADD_USER_NOTIFICATIONS,
  REFRESH_NOTIFICATIONS,
  SET_SEEN_NOTIFICATION,
} from "../actionTypes";

const notificationReducer = (notifications = [], action) => {
  switch (action.type) {
    case FETCH_USER_NOTIFICATIONS:
      return action.payload;
    case ADD_USER_NOTIFICATIONS:
      const newArr = [action.payload, ...notifications];
      return newArr;
    case SET_SEEN_NOTIFICATION:
      // alert(JSON.stringify(notifications));
      return notifications.map((notification) =>
        notification._id === action.payload._id ? action.payload : notification
      );
    case REFRESH_NOTIFICATIONS:
      return [];
    default:
      return notifications;
  }
};

export default notificationReducer;
