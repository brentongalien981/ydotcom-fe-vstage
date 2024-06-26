import { Col, Row } from "react-bootstrap";
import Header from "../Header/Header";
import MainNavigation from "../MainNavigation/MainNavigation";
import AlertNotifications from "../AlertNotifications";
import CreatePost from "../../components/CreatePost";
import "./MainWebLayout.css";
import TheRightSection from "../TheRightSection/TheRightSection";


function MainWebLayout({ children }) {

  return (
    <div className="main-web-layout">

      <Header />

      <Row className="main-row">

        <Col xs={3} id="the-left-col">
          <MainNavigation />
        </Col>

        <Col xs={{ span: 6, offset: 3 }} id="the-middle-col">
          {children}
        </Col>

        <Col xs={3} id="the-right-col">
          <TheRightSection />
        </Col>

      </Row>

      <AlertNotifications />
      <CreatePost />

    </div>
  );
}


export default MainWebLayout;