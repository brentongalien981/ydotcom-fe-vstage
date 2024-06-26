import * as profileActionTypes from "../../../redux/actionTypes/profileActionTypes";
import profileReducer from "../../../redux/reducers/profileReducer";


const defaultInitialState = {
  profile: {},
  isReadingProfile: false,
  readError: null
};


describe("redux / reducers / profileReducer", () => {

  it("should handle READ_USER_PROFILE_REQUEST", () => {

    // Mock stuffs.
    const mockInitialState = { ...defaultInitialState };


    // Action to dispatch.
    const action = {
      type: profileActionTypes.READ_USER_PROFILE_REQUEST
    };


    // Trigger reducer.
    const actualNewState = profileReducer(mockInitialState, action);


    // Expected new state.
    const expectedNewState = {
      ...mockInitialState,
      isReadingProfile: true
    };

    expect(actualNewState).toEqual(expectedNewState);

  });


  it("should handle READ_USER_PROFILE_SUCCESS", () => {

    // Mock stuffs.
    const mockInitialState = { ...defaultInitialState };
    const mockProfile = {
      username: "username1",
      email: "email@abc.com",
      hobby: "poker"
    };

    // Action to dispatch.
    const action = {
      type: profileActionTypes.READ_USER_PROFILE_SUCCESS,
      payload: mockProfile
    };


    // Trigger reducer.
    const actualNewState = profileReducer(mockInitialState, action);


    // Expected new state.
    const expectedNewState = {
      ...mockInitialState,
      profile: mockProfile,
      isReadingProfile: false
    };

    expect(actualNewState).toEqual(expectedNewState);

  });


  it("should handle READ_USER_PROFILE_FAILURE", () => {

    // Mock stuffs.
    const mockInitialState = { ...defaultInitialState };
    const mockError = "Error reading profile";


    // Action to dispatch.
    const action = {
      type: profileActionTypes.READ_USER_PROFILE_FAILURE,
      error: mockError
    };


    // Trigger reducer.
    const actualNewState = profileReducer(mockInitialState, action);


    // Expected new state.
    const expectedNewState = {
      ...mockInitialState,      
      isReadingProfile: false,
      readError: mockError
    };

    expect(actualNewState).toEqual(expectedNewState);

  });  

});