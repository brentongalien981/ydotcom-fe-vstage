import * as notificationActionTypes from "../actionTypes/notificationActionTypes";

const initialState = {
  notifications: [],
  numUnreadNotifications: 0
};


const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case notificationActionTypes.HANDLE_ON_POST_READY_NOTIFICATION_SUCCESS: return handleOnPostReadyNotificationSuccess(state, action);
    case notificationActionTypes.QUERY_NUM_OF_UNREAD_NOTIFICATIONS_SUCCESS: return { ...state, numUnreadNotifications: action.payload };
    default: return state;
  }
};


function handleOnPostReadyNotificationSuccess(state, action) {

  // Filter out repeated notifications.
  const oldNotifications = state.notifications;
  let updatedNotifications = [...oldNotifications];
  const newNotification = action.payload;
  let shouldIncludeNewNotification = true;
  let updatedNumUnreadNotifications = state.numUnreadNotifications;

  for (const n of oldNotifications) {
    if (n.id === newNotification.id) {
      shouldIncludeNewNotification = false;
      break;
    }
  }

  if (shouldIncludeNewNotification) {
    updatedNotifications = [newNotification, ...updatedNotifications];
    ++updatedNumUnreadNotifications;
  }


  return {
    ...state,
    notifications: updatedNotifications,
    numUnreadNotifications: updatedNumUnreadNotifications
  };
}


export default notificationReducer;