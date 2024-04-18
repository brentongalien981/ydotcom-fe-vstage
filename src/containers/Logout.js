import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useAlertNotifications } from "../context/AlertNotificationsContext";


const Logout = () => {

  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const { addAlertNotification } = useAlertNotifications();


  // AuthGuard
  useEffect(() => {
    if (isLoggedIn) {
      logout();

      const alertNotification = {
        heading: "Bye!",
        message: "See you soon..."
      };


      addAlertNotification(alertNotification.heading, alertNotification.message);

      navigate("/");
    }
  }, [isLoggedIn, logout, navigate, addAlertNotification]);

  return (
    <div>
      <h2>Logging out...</h2>
    </div>
  );

};


export default Logout;