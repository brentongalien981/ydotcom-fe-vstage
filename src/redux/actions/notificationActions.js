import My from "../../utils/My";
import * as notificationActionTypes from "../actionTypes/notificationActionTypes";



export const handleOnPostReadyNotification = (data) => (dispatch) => {

  try {
    dispatch({
      type: notificationActionTypes.HANDLE_ON_POST_READY_NOTIFICATION_SUCCESS,
      payload: data.notification
    });

  } catch (e) {
    My.log("Oops, error handling onPostReadyNotification...");
  }
};


export const queryNumOfUnreadNotifications = (token) => async (dispatch) => {
  try {
    const url = process.env.REACT_APP_BACKEND_URL + "/notifications/queryNumOfUnreadNotifications";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });


    if (response.status === 200 || response.status === 201) {

      const data = await response.json();

      dispatch({
        type: notificationActionTypes.QUERY_NUM_OF_UNREAD_NOTIFICATIONS_SUCCESS,
        payload: data.numUnreadNotifications
      });
    } else {
      throw new Error();
    }

  } catch (e) {
    My.log("Oops, error in method queryNumOfUnreadNotifications()...");
  }
};