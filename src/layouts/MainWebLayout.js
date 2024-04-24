import { Col, Row } from "react-bootstrap";
import Header from "./Header";
import MainNavigation from "./MainNavigation";
import { Outlet } from "react-router-dom";
import AlertNotifications from "./AlertNotifications";
import CreatePost from "../components/CreatePost";


function MainWebLayout() {

  return (
    <div style={{ marginTop: "100px" }}>

      {<Header />}

      <Row style={{ width: "100%" }}>

        <Col xs={3} style={{ position: "fixed", top: "100px", left: "0" }}>
          <MainNavigation />
        </Col>

        <Col xs={{ span: 6, offset: 3 }} style={{ backgroundColor: "#EEE" }}>
          <Outlet />
        </Col>

        <Col xs={3} style={{ backgroundColor: "blue", position: "fixed", top: "100px", right: "0" }}>
          <div style={{ width: "100%", height: "600px", backgroundColor: "yellow" }}>
            <h3>Right Layout</h3>
          </div>
        </Col>

      </Row>

      <AlertNotifications />
      <CreatePost />

    </div>
  );
}


export default MainWebLayout;