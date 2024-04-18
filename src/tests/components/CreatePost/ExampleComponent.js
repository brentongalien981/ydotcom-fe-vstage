import React from "react";
import { useCreatePostModal } from "../../../context/CreatePostModalContext";
import { useAuth } from "../../../context/AuthContext";
import AlertNotifications from "../../../layouts/AlertNotifications";



const ExampleComponent = () => {

  const { showCreatePostModal } = useCreatePostModal();
  const { login } = useAuth();

  const handleClick = () => {
    showCreatePostModal();
  };


  const fakeLogin = () => {
    login("fake-username", "fake-token");
  };


  return (
    <div>
      <button onClick={handleClick}>Create Post</button>
      <button onClick={fakeLogin}>Fake Login</button>
      <AlertNotifications />
    </div>
  );

};


export default ExampleComponent;