import { combineReducers } from "redux";
import createPostReducer from "./createPostReducer";
import readPostsReducer from "./readPostsReducer";
import notificationReducer from "./notificationReducer";
import profileReducer from "./profileReducer";
import recommendedUsersReducer from "./recommendedUsersReducer";



const rootReducer = combineReducers({
  createPost: createPostReducer,
  readPosts: readPostsReducer,
  notification: notificationReducer,
  profile: profileReducer,
  recommendedUsers: recommendedUsersReducer
});


export default rootReducer;