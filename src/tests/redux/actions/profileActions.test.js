import configureMockStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';
import fetchMock from 'fetch-mock';
import * as profileActionTypes from '../../../redux/actionTypes/profileActionTypes';
import { readProfile } from '../../../redux/actions/profileActions';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


describe('redux / actions / profileActions', () => {


  afterEach(() => {
    fetchMock.restore();
  });


  describe("readProfile", () => {

    it("dispatches actions READ_USER_PROFILE_REQUEST and READ_USER_PROFILE_SUCCESS when reading profile", async () => {

      // Mock stuffs.    
      const mockProfile = {
        username: "username1",
        email: "email@abc.com",
        hobby: "poker"
      };
      const requestUrl = process.env.REACT_APP_BACKEND_URL + "/profiles/" + mockProfile.username;
      const fakeStore = mockStore({});
      const mockResponse = {
        profile: mockProfile
      };

      fetchMock.getOnce(requestUrl, {
        status: 200,
        body: mockResponse
      });


      // Trigger action.    
      await fakeStore.dispatch(readProfile(mockProfile.username));


      // Expect    
      const expectedActions = [
        { type: profileActionTypes.READ_USER_PROFILE_REQUEST },
        { type: profileActionTypes.READ_USER_PROFILE_SUCCESS, payload: mockResponse }
      ];

      expect(fakeStore.getActions()).toEqual(expectedActions);

    });


    it("dispatches action READ_USER_PROFILE_FAILURE when reading of profile fails", async () => {

      // Mock stuffs.
      const errorMsg = "Error reading profile";
      const requestUrl = process.env.REACT_APP_BACKEND_URL + "/profiles/nonUsername";
      const fakeStore = mockStore({});
      const mockResponse = {
        status: 500,
        body: {
          error: {
            friendlyErrorMessage: errorMsg
          }
        }
      };

      fetchMock.getOnce(requestUrl, mockResponse);


      // Trigger action.
      await fakeStore.dispatch(readProfile("nonUsername"));


      // Expect
      const expectedActions = [
        { type: profileActionTypes.READ_USER_PROFILE_REQUEST },
        { type: profileActionTypes.READ_USER_PROFILE_FAILURE, error: errorMsg }
      ];

      expect(fakeStore.getActions()).toEqual(expectedActions);

    });

  });


});
