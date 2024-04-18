import React, { createContext, useState, useContext, useEffect } from "react";
import MyJsonLocalStorage from "../utils/MyJsonLocalStorage";


const AuthContext = createContext();


export const AuthProvider = ({ children }) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [token, setToken] = useState(null);


  useEffect(() => {
    // Check existing auth credentials from localStorage.
    const storedAuth = MyJsonLocalStorage.get("auth");

    if (storedAuth) {
      setIsLoggedIn(storedAuth.isLoggedIn);
      setUsername(storedAuth.username);
      setToken(storedAuth.token);
    }

  }, []);


  const login = (username, token) => {
    setUsername(username);
    setToken(token);
    setIsLoggedIn(true);

    // Store auth credentials in localStorage.
    MyJsonLocalStorage.set("auth", { username, isLoggedIn: true, token });
  };


  const logout = () => {
    setUsername("");
    setToken(null);
    setIsLoggedIn(false);

    // Reset auth credentials in localStorage.
    MyJsonLocalStorage.set("auth", null);
  };


  return (
    <AuthContext.Provider value={{ isLoggedIn, username, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );

};


export const useAuth = () => {
  return useContext(AuthContext);
};