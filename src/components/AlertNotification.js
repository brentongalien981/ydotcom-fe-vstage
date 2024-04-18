import { Alert } from "react-bootstrap";

const AlertNotification = (props) => {

  const messageComponent = props.message ? <p>{props.message}</p> : null;

  let multipleMessagesComponent = null;

  if (props.multipleMessages) {
    multipleMessagesComponent = (
      <ul>
        {props.multipleMessages.map((msg, i) => (
          <li key={"errorMsg" + i}>{msg}</li>
        ))}
      </ul>
    );

  }


  return (
    <Alert variant={props.variant ?? "primary"} dismissible>
      <Alert.Heading>{props.heading ?? "Heads Up!"}</Alert.Heading>
      {messageComponent}
      {multipleMessagesComponent}
    </Alert>
  );

};


export default AlertNotification;