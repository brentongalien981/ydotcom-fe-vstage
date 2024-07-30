import * as profileActionTypes from "../actionTypes/profileActionTypes";
import dummyProfile from "../../data/dummyProfile.json";

const initialState = {
  profile: dummyProfile,
  isAuthFollowingTheUser: false,
  isReadingProfile: false,
  readError: null,
  isFollowRequesting: false,
};



const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case profileActionTypes.READ_USER_PROFILE_REQUEST: return { ...state, isReadingProfile: true, readError: null };
    case profileActionTypes.READ_USER_PROFILE_SUCCESS: return { ...state, isReadingProfile: false, profile: action.payload.profile, isAuthFollowingTheUser: action.payload.isAuthFollowingTheUser };
    case profileActionTypes.READ_USER_PROFILE_FAILURE: return { ...state, isReadingProfile: false, readError: action.error };

    case profileActionTypes.FOLLOW_USER_REQUEST: return { ...state, isFollowRequesting: true };
    case profileActionTypes.FOLLOW_USER_SUCCESS: return { ...state, isFollowRequesting: false, isAuthFollowingTheUser: true };
    case profileActionTypes.FOLLOW_USER_FAILURE: return { ...state, isFollowRequesting: false };
    default: return state;
  }
};


export default profileReducer;