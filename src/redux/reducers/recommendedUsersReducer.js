import * as recommendedUsersActionTypes from '../actionTypes/recommendedUsersActionTypes';
import { getFakeRecommendedUsers } from "../../data/recommendedUsers";

const initialState = {
  recommendedUsers: [],
  isReading: false,
  error: null
};


const recommendedUsersReducer = (state = initialState, action) => {
  switch (action.type) {
    case recommendedUsersActionTypes.READ_RECOMMENDED_USERS_REQUEST: return { ...state, isReading: true, error: null };
    case recommendedUsersActionTypes.READ_RECOMMENDED_USERS_SUCCESS: return { ...state, isReading: false, recommendedUsers: action.payload };
    case recommendedUsersActionTypes.READ_RECOMMENDED_USERS_FAILURE: return { ...state, isReading: false, error: action.error };
    default: return state;
  }
};


export default recommendedUsersReducer;