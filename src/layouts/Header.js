import { Button, Col, Form, Image, InputGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";


function Header() {
  return (

    <Row
      className="d-flex justify-content-between align-content-center flex-wrap"
      style={{ backgroundColor: "black", width: "100%", top: "0", left: "0", height: "80px", position: "fixed", margin: "0", zIndex: "100" }}
    >

      <Col>
        <h3><Link to="/">YdotCom</Link></h3>
      </Col>

      <Col style={{ textAlign: "center" }}>
        <InputGroup>
          <Form.Control placeholder="Search anything..." />
          <Button variant="outline-secondary">Search</Button>
        </InputGroup>
      </Col>

      <Col style={{ textAlign: "right" }} >
        <Image style={{ height: "50px" }} src="logo192.png" rounded />
      </Col>

    </Row>
  );
}


export default Header;