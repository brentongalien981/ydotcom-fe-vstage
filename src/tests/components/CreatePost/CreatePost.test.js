import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ExampleComponent from "./ExampleComponent";
import { CreatePostModalProvider } from "../../../context/CreatePostModalContext";
import CreatePost from "../../../components/CreatePost";
import { AuthProvider } from "../../../context/AuthContext";
import { AlertNotificationsProvider } from "../../../context/AlertNotificationsContext";
import { bbdevcomVideoChunk } from "@bbdevcomVideo/bbdevcomVideoChunk";


beforeEach(() => {

});


afterEach(() => {
  jest.restoreAllMocks();
});



it("renders correctly", async () => {

  render(
    <AuthProvider>
      <AlertNotificationsProvider>
        <CreatePostModalProvider>
          <CreatePost />
          <ExampleComponent />
        </CreatePostModalProvider>
      </AlertNotificationsProvider>
    </AuthProvider>
  );


  const theBtn = screen.getByText("Create Post");

  expect(theBtn).toBeInTheDocument();
  expect(theBtn.tagName).toBe("BUTTON");

  act(() => {
    userEvent.click(theBtn);
  });

  act(() => {
    const createPostModalTitleElement = screen.getByTestId("create-post-modal-title");

    expect(createPostModalTitleElement).toBeInTheDocument();
    expect(createPostModalTitleElement.tagName).toBe("DIV");
  });

});


it("updates the textarea post-message when user types", async () => {

  render(
    <AuthProvider>
      <AlertNotificationsProvider>
        <CreatePostModalProvider>
          <CreatePost />
          <ExampleComponent />
        </CreatePostModalProvider>
      </AlertNotificationsProvider>
    </AuthProvider>
  );


  const fakeLoginBtn = screen.getByRole("button", { name: "Fake Login" });
  const showCreatePostBtn = screen.getByRole("button", { name: "Create Post" });


  act(() => {
    userEvent.click(fakeLoginBtn);
    userEvent.click(showCreatePostBtn);
  });


  const postMessageTextArea = screen.getByTestId("textarea-postMessage");


  act(() => {
    userEvent.type(postMessageTextArea, "This is a post's message content...");
  });


  expect(postMessageTextArea).toBeInTheDocument();
  expect(postMessageTextArea).toHaveTextContent("This is a post's message content...");

});



it("should create a post and notify user for success", async () => {

  // Mock stuffs.
  jest.spyOn(window, "alert").mockImplementation(() => { });
  jest.spyOn(window, "fetch").mockImplementation(mockFetch);

  bbdevcomVideoChunk.createUpload = jest.fn().mockImplementation(({ }) => {
    return {
      on: (eventName, callBackFunc) => {
        if (eventName === "success") {
          act(() => {
            callBackFunc();
          });
        }

      }
    };
  });



  render(
    <AuthProvider>
      <AlertNotificationsProvider>
        <CreatePostModalProvider>
          <CreatePost />
          <ExampleComponent />
        </CreatePostModalProvider>
      </AlertNotificationsProvider>
    </AuthProvider>
  );


  const fakeLoginBtn = screen.getByRole("button", { name: "Fake Login" });
  const showCreatePostBtn = screen.getByRole("button", { name: "Create Post" });


  act(() => {
    userEvent.click(fakeLoginBtn);
    userEvent.click(showCreatePostBtn);
  });


  const selectVideoFileInput = screen.getByPlaceholderText("Select Video File");
  const submitBtn = screen.getByText("Submit");

  expect(selectVideoFileInput).toBeInTheDocument();
  expect(submitBtn).toBeInTheDocument();
  expect(submitBtn.tagName).toBe("BUTTON");


  act(() => {
    // Create a sample video file
    const file = new File(['(⌐□_□)'], 'example.mp4', { type: 'video/mp4' });

    // Simulate the video-file-input's onchange event.
    userEvent.upload(selectVideoFileInput, file);

    userEvent.click(submitBtn);

  });


  const successAlertHeading = "Hooray!";
  const successAlertMsg = "Upload complete! We'll notify you once your video is ready to be viewed.";

  const successAlertHeadingComp = await screen.findByText(successAlertHeading);
  const successAlertMsgComp = await screen.findByText(successAlertMsg);


  expect(successAlertHeadingComp).toBeInTheDocument();
  expect(successAlertMsgComp).toBeInTheDocument();
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(alert).toHaveBeenCalledTimes(0);


});



async function mockFetch(url) {
  return Promise.resolve({
    ok: true,
    status: 201,
    json: async () => ({
      uploadUrl: "http://mocked-url.com"
    })
  });
}