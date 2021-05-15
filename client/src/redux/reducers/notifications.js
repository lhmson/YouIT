import {
  FETCH_USER_NOTIFICATIONS,
  ADD_USER_NOTIFICATIONS,
  REFRESH_NOTIFICATIONS,
} from "../actionTypes";

const notificationReducer = (notifications = [], action) => {
  switch (action.type) {
    case FETCH_USER_NOTIFICATIONS:
      return action.payload;
    case ADD_USER_NOTIFICATIONS:
      return [...notifications, action.payload];
    case REFRESH_NOTIFICATIONS:
      return [];
    default:
      return notifications;
  }
};

export default notificationReducer;
