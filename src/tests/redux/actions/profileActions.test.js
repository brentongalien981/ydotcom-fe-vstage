import configureMockStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';
import fetchMock from 'fetch-mock';
import * as profileActionTypes from '../../../redux/actionTypes/profileActionTypes';
import { followUser, readProfile } from '../../../redux/actions/profileActions';


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


  describe("followUser", () => {

    it("dispatches actions FOLLOW_USER_REQUEST and FOLLOW_USER_SUCCESS when following a user", async () => {

      // Mock stuffs.          
      const requestUrl = `${process.env.REACT_APP_BACKEND_URL}/userRelationships/follow`;
      const fakeStore = mockStore({});

      const mockResponse = {
        status: 201,
        body: { isResultOk: true }
      };

      const mockUserId = "123";
      const mockAddAlertNotification = jest.fn();

      fetchMock.postOnce(requestUrl, mockResponse);


      // Trigger action.    
      await fakeStore.dispatch(followUser(mockUserId, mockAddAlertNotification));


      // Expect    
      const expectedActions = [
        { type: profileActionTypes.FOLLOW_USER_REQUEST },
        { type: profileActionTypes.FOLLOW_USER_SUCCESS }
      ];

      expect(fakeStore.getActions()).toEqual(expectedActions);

    });


    it("dispatches action FOLLOW_USER_FAILURE when following a user fails", async () => {

      // Mock stuffs.
      const requestUrl = `${process.env.REACT_APP_BACKEND_URL}/userRelationships/follow`;
      const fakeStore = mockStore({});
      const mockResponse = {
        status: 400,
        body: {
          error: {
            friendlyErrorMessage: "Error following user"
          }
        }
      };

      const mockUserId = "123";
      const mockAddAlertNotification = jest.fn();

      fetchMock.postOnce(requestUrl, mockResponse);


      // Trigger action.    
      await fakeStore.dispatch(followUser(mockUserId, mockAddAlertNotification));


      // Expect
      const expectedActions = [
        { type: profileActionTypes.FOLLOW_USER_REQUEST },
        { type: profileActionTypes.FOLLOW_USER_FAILURE }
      ];

      expect(fakeStore.getActions()).toEqual(expectedActions);

    });

  });


});
