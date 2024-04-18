import React, { createContext, useContext, useState } from "react";


const CreatePostModalContext = createContext();


export const CreatePostModalProvider = ({ children }) => {

  const [isModalShown, setIsModalShown] = useState(false);


  const hideCreatePostModal = () => {
    setIsModalShown(false);
  };


  const showCreatePostModal = () => {
    setIsModalShown(true);
  };


  return (
    <CreatePostModalContext.Provider value={{ isModalShown, hideCreatePostModal, showCreatePostModal }}>
      {children}
    </CreatePostModalContext.Provider>
  );

};


export const useCreatePostModal = () => {
  return useContext(CreatePostModalContext);
};