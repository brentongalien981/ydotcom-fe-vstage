import { Col, Row } from "react-bootstrap";

import { Outlet } from "react-router-dom";
import AlertNotifications from "../AlertNotifications";
import CreatePost from "../../components/CreatePost";
import "./MainPhoneLayout.css";
import HeaderPhone from "../HeaderPhone/HeaderPhone";
import TheRightSection from "../TheRightSection/TheRightSection";


function MainPhoneLayout() {

  return (
    <div id="main-phone-layout">

      <HeaderPhone />

      <Row id="phone-main-row">

        <Col xs="12">
          <Outlet />
        </Col>

        <Col xs="12" md={{ span: 6, offset: 3 }} lg={{ span: 4, offset: 4 }}>
          <TheRightSection />
        </Col>

      </Row>

      <AlertNotifications />
      <CreatePost />

    </div>
  );
}


export default MainPhoneLayout;