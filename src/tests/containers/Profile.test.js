import React from 'react'
import { act, fireEvent, screen } from '@testing-library/react'

// We're using our own custom render function and not RTL's render.
import { renderWithProviders } from '../../utils/test-utils/renderWithProviders'

import Profile from '../../containers/Profile/Profile';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { AlertNotificationsProvider } from '../../context/AlertNotificationsContext';

afterEach(() => {
  jest.restoreAllMocks();
});



it("renders <Profile />", async () => {

  // Mock the queried profile.
  const mockProfile = {
    username: "username1",
    email: "email@abc.com",
    hobby: "poker"
  };

  // Mock that the authenticated user is not following the queried user profile.
  jest.spyOn(global, "fetch").mockResolvedValue(Promise.resolve({
    ok: true,
    status: 200,
    json: async () => ({
      msg: "success",
      profile: mockProfile
    })
  }));


  // Render with redux and the store.
  act(() => {
    renderWithProviders(
      <AlertNotificationsProvider>
        <BrowserRouter>
          <Profile />
        </BrowserRouter>
      </AlertNotificationsProvider>
    );
  });


  // Initially, the spinner should be rendered.
  expect(screen.getByTestId("theSpinner")).toBeInTheDocument();

  expect(fetch).toHaveBeenCalledTimes(1);

  // After the backend request, the username and hobby elements should be rendered.
  const usernameElement = await screen.findByText(`@${mockProfile.username}`);
  expect(usernameElement).toBeInTheDocument();

  const hobbyElement = await screen.findByText(mockProfile.hobby);
  expect(hobbyElement).toBeInTheDocument();

});


it("renders <Profile /> container correctly", async () => {

  // Mock the queried profile.
  const mockProfile = {
    username: "username1",
    email: "email@abc.com",
    hobby: "poker"
  };

  // Mock that the authenticated user is not following the queried user profile.
  jest.spyOn(global, "fetch").mockResolvedValue(Promise.resolve({
    ok: true,
    status: 200,
    json: async () => ({
      msg: "success",
      profile: mockProfile
    })
  }));


  // Render with redux and the store.
  let container;
  act(() => {
    const { asFragment } = renderWithProviders(
      <AlertNotificationsProvider>
        <BrowserRouter>
          <Profile />
        </BrowserRouter>
      </AlertNotificationsProvider>
    );
    container = asFragment;
  });


  expect(fetch).toHaveBeenCalledTimes(1);

  // After the backend request, the username should be rendered.
  const usernameElement = await screen.findByText(`@${mockProfile.username}`);
  expect(usernameElement).toBeInTheDocument();


  // Expect that the rendered container matches the snapshot.
  expect(container()).toMatchSnapshot();

});


it("renders the follow button if the authenticated user is not already following the queried user profile", async () => {

  // Mock the queried profile.
  const mockProfile = {
    username: "username1",
    email: "email@abc.com",
    hobby: "poker"
  };

  // Mock that the authenticated user is not following the queried user profile.
  const isAuthFollowingTheUser = false;

  // Mock the querying of a user profile.
  jest.spyOn(global, "fetch").mockResolvedValue(Promise.resolve({
    ok: true,
    status: 200,
    json: async () => ({
      msg: "success",
      profile: mockProfile,
      isAuthFollowingTheUser
    })
  }));


  // Render the Profile component with redux, store, and other providers.
  act(() => {
    renderWithProviders(
      <AlertNotificationsProvider>
        <BrowserRouter>
          <Profile />
        </BrowserRouter>
      </AlertNotificationsProvider>
    );
  });


  // Reference the follow button.
  const followButton = await screen.findByText("Follow");

  // Assert
  expect(followButton).toBeInTheDocument();

});


it("renders the unfollow button if the authenticated user is following the queried user profile", async () => {

  // Mock the queried profile.
  const mockProfile = {
    username: "username1",
    email: "email@abc.com",
    hobby: "poker"
  };

  // Mock that the authenticated user is following the queried user profile.
  const isAuthFollowingTheUser = true;

  // Mock the querying of a user profile.
  jest.spyOn(global, "fetch").mockResolvedValue(Promise.resolve({
    ok: true,
    status: 200,
    json: async () => ({
      msg: "success",
      profile: mockProfile,
      isAuthFollowingTheUser
    })
  }));


  // Render the Profile component with redux, store, and other providers.
  act(() => {
    renderWithProviders(
      <AlertNotificationsProvider>
        <BrowserRouter>
          <Profile />
        </BrowserRouter>
      </AlertNotificationsProvider>
    );
  });


  // Reference the Unfollow button.
  const unfollowButton = await screen.findByText("Unfollow");

  // Assert
  expect(unfollowButton).toBeInTheDocument();

});


it("replaces the follow button with unfollow button once the authenticated user successfully follows another user", async () => {

  // Mock the queried profile.
  const mockProfile = {
    username: "username1",
    email: "email@abc.com",
    hobby: "poker"
  };

  // Mock that the authenticated user is initially not following the queried user profile.
  const isAuthFollowingTheUser = false;

  // Mock the querying of a user profile.
  jest.spyOn(global, "fetch").mockResolvedValueOnce(Promise.resolve({
    ok: true,
    status: 200,
    json: async () => ({
      msg: "success",
      profile: mockProfile,
      isAuthFollowingTheUser
    })
  }));


  // Mock the fetch request of the authenticated user following the queried user profile.
  jest.spyOn(global, "fetch").mockResolvedValueOnce(Promise.resolve({
    status: 201,
    json: async () => ({
      msg: "success"
    })
  }));


  // Render the Profile component with redux, store, and other providers.
  act(() => {
    renderWithProviders(
      <AlertNotificationsProvider>
        <BrowserRouter>
          <Profile />
        </BrowserRouter>
      </AlertNotificationsProvider>
    );
  });


  // On initial render of the page, reference the follow button.
  const followButton = await screen.findByText("Follow");

  // Assert
  expect(followButton).toBeInTheDocument();

  // Simulate the click event on the follow button.
  fireEvent.click(followButton);

  // Wait for the follow request to complete and then assert that the unfollow button is rendered.
  const unfollowButton = await screen.findByText("Unfollow");

  // Assert
  expect(unfollowButton).toBeInTheDocument();


});