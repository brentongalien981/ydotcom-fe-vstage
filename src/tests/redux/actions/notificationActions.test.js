import configureMockStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';
import fetchMock from 'fetch-mock';
import { queryNumOfUnreadNotifications, readNotifications } from '../../../redux/actions/notificationActions';
import * as notificationActionTypes from '../../../redux/actionTypes/notificationActionTypes';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


describe('redux / actions / notificationActions', () => {


  afterEach(() => {
    fetchMock.restore();
  });


  describe("queryNumOfUnreadNotifications", () => {

    it('dispatches action QUERY_NUM_OF_UNREAD_NOTIFICATIONS_SUCCESS when fetching has succeeded', async () => {

      // Mock stuffs.
      const fakeNumUnreadNotifications = 5;
      const fakeStore = mockStore({});
      const fakeRequestUrl = `${process.env.REACT_APP_BACKEND_URL}/notifications/queryNumOfUnreadNotifications`;
      const fakeRequestResponse = { status: 201, body: { numUnreadNotifications: fakeNumUnreadNotifications } };

      fetchMock.postOnce(fakeRequestUrl, fakeRequestResponse);


      // Trigger action.
      await fakeStore.dispatch(queryNumOfUnreadNotifications());


      // Expect
      const expectedActions = [
        { type: notificationActionTypes.QUERY_NUM_OF_UNREAD_NOTIFICATIONS_SUCCESS, payload: fakeNumUnreadNotifications }
      ];

      expect(fakeStore.getActions()).toEqual(expectedActions);
    });

  });


  describe("readNotifications", () => {

    it("dispatches actions READ_NOTIFICATIONS_REQUEST and READ_NOTIFICATIONS_SUCCESS when reading notifications", async () => {

      // Mock stuffs.    
      const requestUrl = process.env.REACT_APP_BACKEND_URL + "/notifications";
      const fakeStore = mockStore({});
      const mockResponse = {
        notifications: [
          { id: 1, message: "mock-notification-message-1" },
          { id: 2, message: "mock-notification-message-2" }
        ]
      };

      fetchMock.getOnce(requestUrl, {
        status: 200,
        body: mockResponse
      });


      // Trigger action.    
      await fakeStore.dispatch(readNotifications());


      // Expect    
      const expectedActions = [
        { type: notificationActionTypes.READ_NOTIFICATIONS_REQUEST },
        { type: notificationActionTypes.READ_NOTIFICATIONS_SUCCESS, payload: mockResponse.notifications }
      ];

      expect(fakeStore.getActions()).toEqual(expectedActions);

    });


    it("dispatches action READ_NOTIFICATIONS_FAILURE when reading of notifications fails", async () => {

      // Mock stuffs.
      const errorMsg = "Error reading notifications";
      const requestUrl = process.env.REACT_APP_BACKEND_URL + "/notifications";
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
      await fakeStore.dispatch(readNotifications());


      // Expect
      const expectedActions = [
        { type: notificationActionTypes.READ_NOTIFICATIONS_REQUEST },
        { type: notificationActionTypes.READ_NOTIFICATIONS_FAILURE, error: errorMsg }
      ];

      expect(fakeStore.getActions()).toEqual(expectedActions);

    });

  });


});
