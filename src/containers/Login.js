import { Button, Form, Image } from "react-bootstrap";
import "./Signup/Signup.css";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import AlertNotification from "../components/AlertNotification";
import { useAlertNotifications } from "../context/AlertNotificationsContext";


const Login = () => {

  const { login } = useAuth();
  const navigate = useNavigate();
  const { addAlertNotification } = useAlertNotifications();


  const [signupData, setSignupData] = useState({});
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [alertNotificationAttribs, setAlertNotificationAttribs] = useState({ isShown: false });


  const inputsData = [
    { label: "Email", type: "email", name: "email", placeholder: "Enter email" },
    { label: "Password", type: "password", name: "password", placeholder: "Enter password" }
  ];


  const onInputChange = (e) => {
    const value = e.target.value;
    setSignupData({ ...signupData, [e.target.name]: value });
  };


  const alertNotification = alertNotificationAttribs.isShown ? <AlertNotification {...alertNotificationAttribs} /> : null;


  const onLogin = async () => {

    if (isLoggingIn) { return; }
    setIsLoggingIn(true);
    setAlertNotificationAttribs({ isShown: false });

    const url = process.env.REACT_APP_BACKEND_URL + "/auth/login";


    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData)
      });

      const data = await response.json();

      // Handle multiple response status codes.
      if (response.status === 200 || response.status === 201) {

        setIsLoggingIn(false);

        // Login on successful signup. Use context and localstorage.        
        login(data.username, data.token, data.profilePhotoSource);

        // Set Redirection Notification attribs for successful signup when redirected to homepage.
        const alertNotification = {
          heading: "Hi " + data.username,
          message: "Welcome back!"
        };

        addAlertNotification(alertNotification.heading, alertNotification.message);

        navigate("/");

      } else if (response.status === 400 || response.status === 401 || response.status === 403 || response.status === 404 || response.status === 422 || response.status === 500) {

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
      // Notify user about unforeseen errors.
      const msg = "Oops, unexpected error occured. Please try again later.";
      setAlertNotificationAttribs({ isShown: true, variant: "danger", message: msg });
    }


    setIsLoggingIn(false);

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
    <>
      {alertNotification}

      <div id="auth" className="d-flex justify-content-center">

        <div id="imgContainer" className="w-50">
          <Image id="theImg" src="photos/nature3.jpg" />
        </div>

        <Form id="theForm" className="w-50">
          <h3>Login</h3><br />

          {formInputs}

          <br />
          <Button disabled={isLoggingIn} onClick={onLogin}>Submit</Button>
        </Form>

      </div>
    </>
  );

};


export default Login;