import { Alert } from "react-bootstrap";

const FloatingAlertNotification = (props) => {

  return (
    <div style={myStyle}>
      <Alert variant={props.variant ?? "primary"} dismissible>
        <Alert.Heading>{props.heading ?? "Heads Up!"}</Alert.Heading>
        <p>{props.message}</p>
      </Alert>
    </div>
  );

};


const myStyle = {
  width: "640px",
  position: "fixed",
  bottom: "20px",
  right: "20px"
};


export default FloatingAlertNotification;