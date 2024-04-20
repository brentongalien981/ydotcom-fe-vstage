import * as notificationActionTypes from "../../../redux/actionTypes/notificationActionTypes";
import notificationReducer from "../../../redux/reducers/notificationReducer";


const defaultInitialState = {
  notifications: [],
  numUnreadNotifications: 0
};


describe("redux / reducers / notificationReducer", () => {

  it("should handle HANDLE_ON_POST_READY_NOTIFICATION_SUCCESS", () => {

    // Mock stuffs.
    const fakeInitialState = { ...defaultInitialState };
    const fakeNewNotification = { id: "fake-notification-id-1", message: "Fake notification message 1." };

    // Action to dispatch.
    const fakeAction = {
      type: notificationActionTypes.HANDLE_ON_POST_READY_NOTIFICATION_SUCCESS,
      payload: fakeNewNotification
    };


    // Trigger reducer.
    const newState = notificationReducer(fakeInitialState, fakeAction);


    // Expected new state.
    const expectedNewState = {
      ...defaultInitialState,
      notifications: [fakeNewNotification],
      numUnreadNotifications: 1
    };

    expect(newState).toEqual(expectedNewState);

  });


  it("should handle QUERY_NUM_OF_UNREAD_NOTIFICATIONS_SUCCESS", () => {

    // Mock stuffs.
    const fakeInitialState = { ...defaultInitialState };
    const fakeQueriedNumUnreadNotifications = 5;
    
    // Action to dispatch.
    const fakeAction = {
      type: notificationActionTypes.QUERY_NUM_OF_UNREAD_NOTIFICATIONS_SUCCESS,
      payload: fakeQueriedNumUnreadNotifications
    };


    // Trigger reducer.
    const newState = notificationReducer(fakeInitialState, fakeAction);


    // Expected new state.
    const expectedNewState = {
      ...defaultInitialState,
      numUnreadNotifications: fakeQueriedNumUnreadNotifications
    };

    expect(newState).toEqual(expectedNewState);

  });

});