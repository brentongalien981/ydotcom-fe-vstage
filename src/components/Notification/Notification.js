import React from "react";
import "./Notification.css";
import "animate.css";
import { Button } from "react-bootstrap";


const Notification = (props) => {

  const n = props.notification;

  return (
    <div className="notification">
      <p key={n.id} className="animate__animated animate__fadeIn">{n.message}</p>
      <Button size="sm" onClick={() => { alert("This whill be implemented soon...") }}>Mark as read</Button>
      <Button size="sm" onClick={() => { alert("This whill be implemented soon...") }}>Mark as unread</Button>
      <Button size="sm" onClick={() => { alert("This whill be implemented soon...") }} variant="danger">Delete</Button>
    </div>
  );

};


export default Notification;