import { myFetch } from "../../utils/myRequestUtils";
import * as profileActionTypes from "../actionTypes/profileActionTypes";


export const readProfile = (username) => async (dispatch) => {

  dispatch({
    type: profileActionTypes.READ_USER_PROFILE_REQUEST
  });


  await myFetch({
    url: `/profiles/${username}`,
    onSuccess: (data) => {
      dispatch({
        type: profileActionTypes.READ_USER_PROFILE_SUCCESS,
        payload: data
      });
    },
    onFailure: (errorMessage) => {
      dispatch({
        type: profileActionTypes.READ_USER_PROFILE_FAILURE,
        error: errorMessage
      });
    }
  });

};


export const followUser = (userId, addAlertNotification) => async (dispatch) => {

  // TODO:
  dispatch({
    type: profileActionTypes.FOLLOW_USER_REQUEST
  });


  await myFetch({
    url: `/userRelationships/follow`,
    method: "POST",
    body: { userIdToFollow: userId },
    onSuccess: (data) => {
      dispatch({
        type: profileActionTypes.FOLLOW_USER_SUCCESS
      });
      addAlertNotification("", "User followed successfully.", "success");
    },
    onFailure: (errorMessage) => {
      dispatch({
        type: profileActionTypes.FOLLOW_USER_FAILURE
      });
      addAlertNotification("", `${errorMessage}`, "danger");
    }
  });

};