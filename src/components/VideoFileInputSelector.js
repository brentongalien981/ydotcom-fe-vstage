import React from "react";
import { Form, ProgressBar } from "react-bootstrap";


const VideoFileInputSelector = ({ setInputRef, uploadProgress }) => {

  let uploadProgressComponent = null;

  if (uploadProgress > 0) {
    uploadProgressComponent = (
      <Form.Group className="mb-5">
        <ProgressBar now={uploadProgress} />
      </Form.Group>
    );
  }


  return (
    <>
      <Form.Group className={(uploadProgress > 0) ? "mb-2" : "mb-5"}>
        <Form.Label>Add Video</Form.Label>
        <Form.Control
          type="file"
          accept="video/*"
          name="videoFile"
          placeholder="Select Video File"
          onChange={(e) => setInputRef(e.target)}
        />
      </Form.Group>

      {uploadProgressComponent}
    </>
  );

};


export default VideoFileInputSelector;