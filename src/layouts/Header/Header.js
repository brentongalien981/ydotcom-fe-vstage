import { Button, Col, Dropdown, Form, Image, InputGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Header.css";


function Header() {

  const { isLoggedIn, profilePhotoSource } = useAuth();
  const usedProfilePhotoSource = profilePhotoSource ? `/photos/${profilePhotoSource}` : `/photos/penguin.jpg`;


  let profilePicDropdown = null;
  if (isLoggedIn) {
    profilePicDropdown = (
      <Dropdown>
        <Dropdown.Toggle variant="outline-secondary" id="profile-pic-btn">
          <Image className="profile-pic" src={usedProfilePhotoSource} roundedCircle />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item>
            <Link to="/logout" className="navbar-links"><ion-icon name="log-out" id="navbar-icons"></ion-icon> Logout</Link>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }


  return (

    <Row id="header-bar" className="d-flex justify-content-between align-content-center flex-wrap">

      <Col>
        <Link to="/" className="logo-link">YdotCom</Link>
      </Col>

      <Col xs="4" style={{ textAlign: "center" }}>
        <InputGroup>
          <Form.Control placeholder="Search anything..." />
          <Button variant="outline-secondary">Search</Button>
        </InputGroup>
      </Col>

      <Col style={{ textAlign: "right" }} >
        {profilePicDropdown}
      </Col>

    </Row>
  );
}


export default Header;