import * as actions from "../actionTypes/createPostActionTypes";


export const showCreatePostModal = () => ({
  type: actions.SHOW_CREATE_POST_MODAL
});


export const hideCreatePostModal = () => ({
  type: actions.HIDE_CREATE_POST_MODAL
});