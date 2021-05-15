import {
  FETCH_USER_NOTIFICATIONS,
  ADD_USER_NOTIFICATIONS,
} from "../actionTypes";

const notificationReducer = (notifications = [], action) => {
  switch (action.type) {
    case FETCH_USER_NOTIFICATIONS:
      return action.payload;
    case ADD_USER_NOTIFICATIONS:
      return [...notifications, action.payload];
    default:
      return notifications;
  }
};

export default notificationReducer;
