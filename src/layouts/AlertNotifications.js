import { Alert } from "react-bootstrap";
import { useAlertNotifications } from "../context/AlertNotificationsContext";

const AlertNotifications = () => {

  const { alertNotifications, removeAlertNotification } = useAlertNotifications();

  return (
    <div style={myStyle}>
      {alertNotifications.map((notification, i) => (
        <Alert key={i} variant={notification.variant ?? "primary"} dismissible onClose={() => removeAlertNotification(notification.id)}>
          <Alert.Heading>{notification.heading ?? "Heads Up!"}</Alert.Heading>
          <p>{notification.message}</p>
        </Alert>
      ))}
    </div>
  );

};


const myStyle = {
  width: "640px",
  position: "fixed",
  bottom: "20px",
  right: "20px"
};


export default AlertNotifications;