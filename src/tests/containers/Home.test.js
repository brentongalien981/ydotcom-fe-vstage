import React from 'react'
import { act, screen } from '@testing-library/react'

// We're using our own custom render function and not RTL's render.
import { renderWithProviders } from '../../utils/test-utils/renderWithProviders'

// BrowserRouter is necessary for renderWithProviders() func.
import { BrowserRouter } from 'react-router-dom';
import Home from '../../containers/Home'



// Mock the entire @bbdevcomVideo/bbdevcomVideo-player-react module
jest.mock('@bbdevcomVideo/bbdevcomVideo-player-react', () => () => <div></div>);


beforeEach(() => {

  jest.spyOn(window, "alert").mockImplementation(() => { });

});


afterEach(() => {
  jest.restoreAllMocks();
});



it('renders <Home />', async () => {

  // Mock API request.
  jest.spyOn(global, "fetch").mockResolvedValue(Promise.resolve({
    ok: true,
    status: 201,
    json: async () => ({
      msg: "success",
      posts: [
        {
          id: "post1",
          message: "message1",
          user: { username: "username1" },
          video: { id: "vid1", bbdevcomVideoPlaybackId: "b2umqofYtJoKqYdNGFAggk00revWA01jPnXLITiaYal02o" },
          userProfile: { photoSource: "fake-photo.jpg" }
        },
        {
          id: "post2",
          message: "message2",
          user: { username: "username2" },
          video: { id: "vid2", bbdevcomVideoPlaybackId: "b2umqofYtJoKqYdNGFAggk00revWA01jPnXLITiaYal02o" },
          userProfile: { photoSource: "fake-photo.jpg" }
        }
      ]
    })
  }));


  // Render with redux and the store.
  act(() => {
    renderWithProviders(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
  });


  // Initially, the spinner should be rendered.
  expect(screen.getByTestId("theSpinner")).toBeInTheDocument();


  expect(fetch).toHaveBeenCalledTimes(1);

  // After the backend request, the posts should be rendered containing their message.
  const postMsgNode = await screen.findByText("message1");
  expect(postMsgNode).toBeInTheDocument();

  const allPosts = screen.getAllByTestId("aPost");
  expect(allPosts.length).toBe(2);
});