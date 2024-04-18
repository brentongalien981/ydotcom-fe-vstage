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