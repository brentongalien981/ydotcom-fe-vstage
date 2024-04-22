import My from "../../utils/My";
import { myFetch } from "../../utils/myRequestUtils";
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


export const queryNumOfUnreadNotifications = () => async (dispatch) => {

  await myFetch({
    url: "/notifications/queryNumOfUnreadNotifications",
    method: "POST",
    onSuccess: (data) => {
      dispatch({
        type: notificationActionTypes.QUERY_NUM_OF_UNREAD_NOTIFICATIONS_SUCCESS,
        payload: data.numUnreadNotifications
      });
    }
  });


};


export const readNotifications = () => async (dispatch) => {

  dispatch({
    type: notificationActionTypes.READ_NOTIFICATIONS_REQUEST
  });


  await myFetch({
    url: "/notifications",
    onSuccess: (data) => {
      dispatch({
        type: notificationActionTypes.READ_NOTIFICATIONS_SUCCESS,
        payload: data.notifications
      });
    },
    onFailure: (errorMessage) => {
      dispatch({
        type: notificationActionTypes.READ_NOTIFICATIONS_FAILURE,
        error: errorMessage
      });
    }
  });

};