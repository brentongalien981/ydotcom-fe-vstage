import { useState } from "react";
import { Button, Col, Image, Offcanvas, Row } from "react-bootstrap";
import { List } from "react-bootstrap-icons";
import { Link, Outlet } from "react-router-dom";
import MainNavigation from "./MainNavigation/MainNavigation";
import AlertNotifications from "./AlertNotifications";
import CreatePost from "../components/CreatePost";


function MainPhoneLayout() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <div style={{ marginTop: "100px" }}>

      <Row
        className="d-flex justify-content-between align-content-center flex-wrap"
        style={{ backgroundColor: "black", width: "100%", top: "0", left: "0", height: "80px", position: "fixed", margin: "0" }}
      >
        <Col>
          <Button onClick={handleShow}><List /></Button>
        </Col>

        <Col style={{ textAlign: "center" }} >
          <h3><Link to="/">Y</Link></h3>
        </Col>

        <Col style={{ textAlign: "right" }} >
          <Image style={{ height: "50px" }} src="logo192.png" rounded />
        </Col>

      </Row>

      <Row style={{ width: "100%", margin: "0" }}>
        <Col style={{ backgroundColor: "yellowgreen" }}>
          <Outlet />
        </Col>
      </Row>

      <AlertNotifications />
      <CreatePost />


      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <MainNavigation />
        </Offcanvas.Body>
      </Offcanvas>

    </div>
  );
}


export default MainPhoneLayout;