import { Col, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import "./PlainLayout.css";



function PlainLayout() {

  return (

    <div style={{ marginTop: "100px" }}>

      {<Header />}

      <Row className="m-0">
        <Col id="the-main-col">
          <Outlet />
        </Col>

      </Row>
    </div>

  );
}


export default PlainLayout;