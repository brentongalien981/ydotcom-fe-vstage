import {
  READ_POSTS_REQUEST,
  READ_POSTS_SUCCESS,
  READ_POSTS_FAILURE
} from "../actionTypes/readPostsActionTypes";


const initialState = {
  posts: [],
  isLoading: false,
  error: null
};


const readPostsReducer = (state = initialState, action) => {
  switch (action.type) {
    case READ_POSTS_REQUEST: return { ...state, isLoading: true, error: null };
    case READ_POSTS_SUCCESS: return onReadPostsSuccess(state, action);
    case READ_POSTS_FAILURE: return { ...state, isLoading: false, error: action.payload };
    default: return state;
  }
};


/**
 * 
 * @param {Object} state 
 * @param {Object} action 
 * @returns {obj} : updated state 
 */
function onReadPostsSuccess(state, action) {
  const oldPosts = state.posts;
  const fetchedPosts = action.payload;
  let updatedPosts = [...oldPosts];


  // Filter out repeated posts.
  fetchedPosts.forEach(f => {

    let shouldIncludePost = true;

    for (let i = 0; i < oldPosts.length; i++) {
      const o = oldPosts[i];

      if (f.id === o.id) {
        shouldIncludePost = false;
        break;
      }      
    }

    if (shouldIncludePost) {
      updatedPosts.push(f);
    }

  });

  return { ...state, isLoading: false, posts: updatedPosts, error: null };
}

export default readPostsReducer;
