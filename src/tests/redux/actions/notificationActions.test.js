import configureMockStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';
import fetchMock from 'fetch-mock';
import { queryNumOfUnreadNotifications } from '../../../redux/actions/notificationActions';
import * as notificationActionTypes from '../../../redux/actionTypes/notificationActionTypes';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


describe('redux / actions / queryNumOfUnreadNotifications', () => {

  afterEach(() => {
    fetchMock.restore();
  });


  it('dispatches QUERY_NUM_OF_UNREAD_NOTIFICATIONS_SUCCESS when fetching has succeeded', async () => {

    // Mock stuffs.
    const fakeToken = 'fake-token';
    const fakeNumUnreadNotifications = 5;
    const fakeStore = mockStore({});
    const fakeRequestUrl = `${process.env.REACT_APP_BACKEND_URL}/notifications/queryNumOfUnreadNotifications`;
    const fakeRequestResponse = { status: 201, body: { numUnreadNotifications: fakeNumUnreadNotifications } };

    fetchMock.postOnce(fakeRequestUrl, fakeRequestResponse);


    // Trigger action.
    await fakeStore.dispatch(queryNumOfUnreadNotifications(fakeToken));


    // Expect
    const expectedActions = [
      { type: notificationActionTypes.QUERY_NUM_OF_UNREAD_NOTIFICATIONS_SUCCESS, payload: fakeNumUnreadNotifications }
    ];

    expect(fakeStore.getActions()).toEqual(expectedActions);
  });
});
