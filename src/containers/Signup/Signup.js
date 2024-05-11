import { Button, Col, Form, Image, Row } from "react-bootstrap";
import "./Signup.css";
import React, { useState } from "react";
import My from "../../utils/My";
import AlertNotification from "../../components/AlertNotification";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useAlertNotifications } from "../../context/AlertNotificationsContext";


function Signup() {

  const navigate = useNavigate();
  const { login } = useAuth();
  const { addAlertNotification } = useAlertNotifications();


  const [signupData, setSignupData] = useState({});
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [alertNotificationAttribs, setAlertNotificationAttribs] = useState({ isShown: false });


  const inputsData = [
    { label: "Username", type: "text", name: "username", placeholder: "Enter username" },
    { label: "Email", type: "email", name: "email", placeholder: "Enter email" },
    { label: "Password", type: "password", name: "password", placeholder: "Enter password" }
  ];


  const alertNotification = alertNotificationAttribs.isShown ? <AlertNotification {...alertNotificationAttribs} /> : null;


  const onInputChange = (e) => {
    const value = e.target.value;
    setSignupData({ ...signupData, [e.target.name]: value });
  };


  const onSignup = async () => {

    if (isSigningUp) { return; }
    setIsSigningUp(true);
    setAlertNotificationAttribs({ isShown: false });

    const url = process.env.REACT_APP_BACKEND_URL + "/auth/signup";


    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData)
      });

      const data = await response.json();

      // Handle multiple response status codes.
      if (response.status === 200 || response.status === 201) {

        setIsSigningUp(false);

        // Login on successful signup. Use context and localstorage.        
        login(data.username, data.token);

        // Set Redirection Notification attribs for successful signup when redirected to homepage.
        const alertNotification = {
          heading: "Hi " + data.username,
          message: "Yey, signup successful!"
        };

        addAlertNotification(alertNotification.heading, alertNotification.message);

        navigate("/");

      } else if (response.status === 400 || response.status === 401 || response.status === 403 || response.status === 422 || response.status === 500) {

        // Notify for a single error.
        if (data.error) {
          setAlertNotificationAttribs({ isShown: true, variant: "danger", message: data.error.friendlyErrorMessage });

        }

        // Notify for multiple validation errors.
        if (data.errors) {

          const errorMsgs = data.errors.map((e) => e.msg);

          setAlertNotificationAttribs({ isShown: true, variant: "danger", multipleMessages: errorMsgs });
        }

      } else {
        throw new Error("Unexpected Error");
      }


    } catch (e) {
      My.log("Error bruh...");
      My.log("e.message ===> " + e.message);
      My.log("error contents ===> ...");
      My.displayJsonContents(e);

      // Notify user about unforeseen errors.
      const msg = "Oops, unexpected error occured. Please try again later.";
      setAlertNotificationAttribs({ isShown: true, variant: "danger", message: msg });
    }


    setIsSigningUp(false);

  };


  const formInputs = inputsData.map((input, index) => (
    <Form.Group key={index} className="mb-3">
      <Form.Label>{input.label}</Form.Label>
      <Form.Control
        type={input.type}
        name={input.name}
        placeholder={input.placeholder}
        value={signupData[input.name] ?? ""}
        onChange={onInputChange}
      />
    </Form.Group>
  ));


  return (
    <Row id="auth">
      {alertNotification}

      <Col id="auth-content" className="d-flex justify-content-center" sm={{ span: 8, offset: 2 }}>

        <div id="imgContainer">
          <Image id="theImg" src="photos/nature3.jpg" />
        </div>

        <Form id="theForm">
          <h3>Signup</h3><br />

          {formInputs}

          <br />
          <Button disabled={isSigningUp} onClick={onSignup}>Submit</Button>
        </Form>
        
      </Col>
    </Row>
  );
}



export default Signup;