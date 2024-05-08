import * as profileActionTypes from "../actionTypes/profileActionTypes";
import dummyProfile from "../../data/dummyProfile.json";

const initialState = {
  profile: dummyProfile,
  isReadingProfile: false,
  readError: null
};


const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case profileActionTypes.READ_USER_PROFILE_REQUEST: return { ...state, isReadingProfile: true };
    case profileActionTypes.READ_USER_PROFILE_SUCCESS: return { ...state, isReadingProfile: false, profile: action.payload };
    case profileActionTypes.READ_USER_PROFILE_FAILURE: return { ...state, isReadingProfile: false, readError: action.error };
    default: return state;
  }
};


export default profileReducer;