import React, { createContext, useState, useContext, useEffect } from "react";
import MyJsonLocalStorage from "../utils/MyJsonLocalStorage";


const AuthContext = createContext();


export const AuthProvider = ({ children }) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [token, setToken] = useState(null);
  const [profilePhotoSource, setProfilePhotoSource] = useState(null);


  useEffect(() => {
    // Check existing auth credentials from localStorage.
    const storedAuth = MyJsonLocalStorage.get("auth");

    if (storedAuth) {
      setIsLoggedIn(storedAuth.isLoggedIn);
      setUsername(storedAuth.username);
      setToken(storedAuth.token);
      setProfilePhotoSource(storedAuth.profilePhotoSource);
    }

  }, []);


  const login = (username, token, profilePhotoSource) => {
    setUsername(username);
    setToken(token);
    setIsLoggedIn(true);
    setProfilePhotoSource(profilePhotoSource);

    // Store auth credentials in localStorage.
    MyJsonLocalStorage.set("auth", { username, isLoggedIn: true, token, profilePhotoSource });
  };


  const logout = () => {
    setUsername("");
    setToken(null);
    setIsLoggedIn(false);
    setProfilePhotoSource(null);

    // Reset auth credentials in localStorage.
    MyJsonLocalStorage.set("auth", null);
  };


  return (
    <AuthContext.Provider value={{ isLoggedIn, username, token, profilePhotoSource, login, logout }}>
      {children}
    </AuthContext.Provider>
  );

};


export const useAuth = () => {
  return useContext(AuthContext);
};