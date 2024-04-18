import * as actions from "../actionTypes/createPostActionTypes";


const initialState = {
  isCreatePostModalShown: false
};


const createPostReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SHOW_CREATE_POST_MODAL: return { ...state, isCreatePostModalShown: true };
    case actions.HIDE_CREATE_POST_MODAL: return { ...state, isCreatePostModalShown: false };
    default: return state;
  }
};


export default createPostReducer;