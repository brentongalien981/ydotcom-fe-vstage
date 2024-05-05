import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import My from "../utils/My";


const MyRouteGuard = ({ children }) => {

  const location = useLocation();

  const { pathname } = location;
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();


  useEffect(() => {

    const handleRouteAccess = () => {

      if (isLoggedIn) {
        switch (pathname) {
          // Not allowed routes for logged-in user.
          case "/login":
          case "/signup":
            // Redirect
            My.log(`Logged-in user not allowed to pathname: ${pathname}`);
            My.log("Redirecting to /");
            navigate("/");
            break;
          default:
            // Everywhere else is allowed.
            My.log(`Logged-in user is allowed to pathname: ${pathname}`);
            break;
        }
      } else {
        switch (pathname) {
          // Allowed routes for guest user.
          case "/":
          case "/login":
          case "/signup":
          case "/profile":
            My.log(`Guest user is allowed to pathname: ${pathname}`);
            break;
          // All the rest of routes, guest user is not allowed.
          default:
            My.log(`Guest user not allowed to pathname: ${pathname}`);
            My.log("Redirecting to /login");
            navigate("/login");
            break;
        }
      }

    };

    handleRouteAccess();

  });


  return (
    <>{children}</>
  );

};


export default MyRouteGuard;