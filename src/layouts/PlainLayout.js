import { Col, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Header from "./Header";



function PlainLayout() {

  return (

    <div style={{ marginTop: "100px" }}>

      {<Header />}

      <Row>

        {/* <Col style={{ backgroundColor: "#e6ffe6" }}>      */}
        <Col>
          <Outlet />
        </Col>

      </Row>
    </div>

  );
}


export default PlainLayout;