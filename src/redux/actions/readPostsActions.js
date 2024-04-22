import { myFetch } from "../../utils/myRequestUtils";
import {
  READ_POSTS_REQUEST,
  READ_POSTS_SUCCESS,
  READ_POSTS_FAILURE
} from "../actionTypes/readPostsActionTypes";


export const readPosts = (numOldPosts = 0) => async (dispatch) => {

  dispatch({ type: READ_POSTS_REQUEST });
  

  const url = `/posts?numOldPosts=${numOldPosts}`;

  await myFetch({
    url: url,
    onSuccess: (data) => {
      dispatch({
        type: READ_POSTS_SUCCESS,
        payload: data.posts
      });
    },
    onFailure: (errorMsg) => {
      dispatch({
        type: READ_POSTS_FAILURE,
        payload: errorMsg
      });
    }
  });
};