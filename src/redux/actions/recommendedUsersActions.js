import { myFetch } from "../../utils/myRequestUtils";
import * as recommendedUsersActionTypes from "../actionTypes/recommendedUsersActionTypes";


export const readRecommendedUsers = () => async (dispatch) => {

  // Dispatch the request for loading.
  dispatch({
    type: recommendedUsersActionTypes.READ_RECOMMENDED_USERS_REQUEST
  });


  // Fetch the recommended users.
  await myFetch({
    url: "/users/getRecommendedUsers",
    onSuccess: (data) => {
      dispatch({
        type: recommendedUsersActionTypes.READ_RECOMMENDED_USERS_SUCCESS,
        payload: data.recommendedUsers
      });
    },
    onFailure: (errorMessage) => {
      dispatch({
        type: recommendedUsersActionTypes.READ_RECOMMENDED_USERS_FAILURE,
        error: errorMessage
      });
    }
  });

}


