import React from "react";
import { useSelector } from "react-redux";
import { selectorNotifications } from "../../redux/selectors/notificationSelectors";
import "animate.css";


const Notifications = () => {

  const notifications = useSelector(selectorNotifications)

  return (
    <div>
      <h3>Notifications</h3>

      <ul>
        {
          notifications.map((n) => <li key={n.id} className="animate__animated animate__fadeIn">{n.message}</li>)
        }
      </ul>
    </div>
  );

};


export default Notifications;