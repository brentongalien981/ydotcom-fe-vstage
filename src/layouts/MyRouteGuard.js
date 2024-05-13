import React, { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
import My from "../utils/My";
import MyJsonLocalStorage from "../utils/MyJsonLocalStorage";


const MyRouteGuard = ({ children }) => {

  const location = useLocation();
  const { pathname } = location;
  // const { isLoggedIn } = useAuth();

  const history = useHistory();


  useEffect(() => {

    const handleRouteAccess = () => {


      const storedAuth = MyJsonLocalStorage.get("auth");

      if (storedAuth?.isLoggedIn) {

        switch (pathname) {
          // Not allowed routes for logged-in user.
          case "/login":
          case "/signup":
            // Redirect
            My.log(`Logged-in user not allowed to pathname: ${pathname}`);
            My.log("Redirecting to /");
            history.push("/");
            break;
          default:
            // Everywhere else is allowed.
            My.log(`Logged-in user is allowed to pathname: ${pathname}`);
            break;
        }
      } else {
        switch (pathname) {
          // Not allowed routes for guest user.
          case "/logout":
            My.log(`Guest user not allowed to pathname: ${pathname}`);
            My.log("Redirecting to /");
            history.push("/");
            break;
          default:
            // All the rest of routes, guest user is allowed.
            My.log(`Guest user is allowed to pathname: ${pathname}`);
            break;
        }
      }

    };

    handleRouteAccess();

  }, [pathname, history]);


  return (
    <>{children}</>
  );

};


export default MyRouteGuard;