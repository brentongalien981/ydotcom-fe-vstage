import * as notificationActionTypes from "../actionTypes/notificationActionTypes";

const initialState = {
  notifications: [],
  numUnreadNotifications: 0,
  isReading: false,
  error: null
};


const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case notificationActionTypes.HANDLE_ON_POST_READY_NOTIFICATION_SUCCESS: return onHandleOnPostReadyNotificationSuccess(state, action);
    case notificationActionTypes.QUERY_NUM_OF_UNREAD_NOTIFICATIONS_SUCCESS: return { ...state, numUnreadNotifications: action.payload };
    case notificationActionTypes.READ_NOTIFICATIONS_REQUEST: return { ...state, isReading: true, error: null };
    case notificationActionTypes.READ_NOTIFICATIONS_SUCCESS: return onReadNotificationsSuccess(state, action);
    case notificationActionTypes.READ_NOTIFICATIONS_FAILURE: return { ...state, isReading: false, error: action.error };
    default: return state;
  }
};


function onReadNotificationsSuccess(state, action) {

  // Loop through the fetched notifications and update 
  // the numUnreadNotifications.
  const fetchedNotifications = action.payload ?? [];
  let updatedNumUnreadNotifications = 0;

  fetchedNotifications.forEach(n => {
    if (parseInt(n.isRead) === 0) {
      updatedNumUnreadNotifications++;
    }
  });

  return {
    ...state,
    notifications: fetchedNotifications,
    numUnreadNotifications: updatedNumUnreadNotifications,
    isReading: false
  };
}


function onHandleOnPostReadyNotificationSuccess(state, action) {

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