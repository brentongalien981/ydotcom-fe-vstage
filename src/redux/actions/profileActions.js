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
        payload: data.profile
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