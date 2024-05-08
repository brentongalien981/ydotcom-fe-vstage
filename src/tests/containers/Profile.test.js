import React from 'react'
import { act, screen } from '@testing-library/react'

// We're using our own custom render function and not RTL's render.
import { renderWithProviders } from '../../utils/test-utils/renderWithProviders'

import Profile from '../../containers/Profile/Profile';

afterEach(() => {
  jest.restoreAllMocks();
});



it('renders <Profile />', async () => {

  // Mock the queried profile.
  const mockProfile = {
    username: "username1",
    email: "email@abc.com",
    hobby: "poker"
  };

  // Mock API request.
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
    renderWithProviders(<Profile />);
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