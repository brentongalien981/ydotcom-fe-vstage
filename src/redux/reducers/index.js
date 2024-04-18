import { combineReducers } from "redux";
import createPostReducer from "./createPostReducer";
import readPostsReducer from "./readPostsReducer";
import notificationReducer from "./notificationReducer";


const rootReducer = combineReducers({
  createPost: createPostReducer,
  readPosts: readPostsReducer,
  notification: notificationReducer
});


export default rootReducer;