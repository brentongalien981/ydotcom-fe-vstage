import { combineReducers } from "redux";
import createPostReducer from "./createPostReducer";
import readPostsReducer from "./readPostsReducer";
import notificationReducer from "./notificationReducer";
import profileReducer from "./profileReducer";


const rootReducer = combineReducers({
  createPost: createPostReducer,
  readPosts: readPostsReducer,
  notification: notificationReducer,
  profile: profileReducer
});


export default rootReducer;