import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { useCreatePostModal } from "../context/CreatePostModalContext";
import VideoFileInputSelector from "./VideoFileInputSelector";
import { bbdevcomVideoChunk } from "@bbdevcomVideo/bbdevcomVideoChunk";
import { useAlertNotifications } from "../context/AlertNotificationsContext";


const CreatePost = () => {


  const { isLoggedIn, token } = useAuth();
  const { isModalShown, hideCreatePostModal } = useCreatePostModal()
  const { addAlertNotification } = useAlertNotifications();

  const [postMessage, setPostMessage] = useState("");

  const [inputRef, setInputRef] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);


  function onModalHide() {
    if (isUploading) {
      alert("Please wait for the upload to finish.");
      return;
    }
    hideCreatePostModal();
  }


  async function onUpload() {

    // Check if there's newly selected video.
    if (!inputRef || inputRef?.files.length === 0) {
      alert("Please select a new video file...");
      return;
    }

    // Check
    if (isUploading) {
      alert("Upload in progress. Please wait to make another upload.");
      return;
    }

    // Flag.
    setIsUploading(true);


    try {

      // Prepare upload url.
      const uploadUrl = await fetchUploadUrl();
      if (!uploadUrl) {
        setIsUploading(false);
        return;
      }

      // Reset progress bar.
      // setUploadProgress(0);


      // Facilitate the video upload.    
      const upload = bbdevcomVideoChunk.createUpload({
        endpoint: uploadUrl,
        file: inputRef.files[0], // File object with your video file’s properties
        chunkSize: 30720, // Uploads the file in ~30 MB chunks
      });

      // Subscribe to upload events
      upload.on('error', error => {
        alert("Oops! " + error.detail);
        setIsUploading(false);
      });

      upload.on('progress', progress => {
        setUploadProgress(progress.detail);
      });

      upload.on('success', () => {

        // Success. Alert user.
        const alertNotification = {
          heading: "Hooray!",
          message: "Upload complete! We'll notify you once your video is ready to be viewed.",
          variant: "success"
        };

        addAlertNotification(alertNotification.heading, alertNotification.message, alertNotification.variant);

        // Reset relevant states.
        setInputRef(null);
        setIsUploading(false);
        setUploadProgress(0);
        
        hideCreatePostModal();
      });
    } catch (e) {
      setIsUploading(false);
      alert("YdotCom-Error: " + e.message);
    }
  }


  async function fetchUploadUrl() {

    const url = `${process.env.REACT_APP_BACKEND_URL}/posts`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ postMessage })
      });


      const data = await response.json();

      // For OK response.
      if (response.status === 200 || response.status === 201) {
        
        return data.uploadUrl;

      } else if (response.status === 400 || response.status === 401 || response.status === 403 || response.status === 404 || response.status === 422 || response.status === 500) {

        // For bad response, check for single or multiple errors.        

        // Notify for a single error.
        if (data.error) {
          alert(data.error.friendlyErrorMessage);
        }

        // Notify for multiple validation errors.
        if (data.errors) {

          let alertMsg = "";
          data.errors.forEach(e => {
            alertMsg += e.msg + "\n";
          });

          alert(alertMsg);
        }

      } else {
        throw new Error("Unexpected Error. Please try again later.");
      }

    } catch (e) {
      alert("YdotCom-Error: " + e.message);
    }

    return null;

  }


  function getModalBody() {

    const videoInputProps = {
      setInputRef,
      uploadProgress
    };


    if (isLoggedIn) {
      return (
        <Form className="m-4">

          <Form.Group className="mb-5">
            <Form.Control
              type="text"
              as="textarea"
              rows="5"
              data-testid="textarea-postMessage"
              placeholder="What's on your mind?"
              value={postMessage}
              onChange={(e) => setPostMessage(e.target.value)}
            />
          </Form.Group>

          <VideoFileInputSelector {...videoInputProps} />

          <Button disabled={isUploading} onClick={onUpload}>Submit</Button>
        </Form>
      );
    }

    return (
      <div>
        <h3>Please login to create a post.</h3>
      </div>
    );
  };


  return (
    <Modal
      size="lg"
      show={isModalShown}
      onHide={onModalHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton className="px-4">
        <Modal.Title data-testid="create-post-modal-title">
          Create Post
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {getModalBody()}
      </Modal.Body>
    </Modal>
  );

};


export default CreatePost;