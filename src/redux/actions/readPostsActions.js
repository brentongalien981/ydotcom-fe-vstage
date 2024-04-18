import {
  READ_POSTS_REQUEST,
  READ_POSTS_SUCCESS,
  READ_POSTS_FAILURE
} from "../actionTypes/readPostsActionTypes";


export const readPosts = (numOldPosts = 0) => async (dispatch) => {
  
  dispatch({ type: READ_POSTS_REQUEST });

  try {
        
    // eslint-disable-next-line
    const url = process.env.REACT_APP_BACKEND_URL + "/posts" + "?numOldPosts=" + numOldPosts;

    const response = await fetch(url);
    const data = await response.json();

    if (response.status === 200 || response.status === 201) {

      dispatch({
        type: READ_POSTS_SUCCESS,
        payload: data.posts
      });

    } else {
      const errorMsg = data?.error?.friendlyErrorMessage ?? "";
      throw new Error(errorMsg);
    }

  } catch (e) {
    const msg = e.message ?? "Oops, error occured. Please try again later.";    

    dispatch({
      type: READ_POSTS_FAILURE,
      payload: msg
    });
  }
};