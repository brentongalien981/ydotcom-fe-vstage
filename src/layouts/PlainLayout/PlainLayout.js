import { Col, Row } from "react-bootstrap";
import Header from "../Header/Header";
import "./PlainLayout.css";
import HeaderPhone from "../HeaderPhone/HeaderPhone";
import { useEffect, useState } from "react";
import My from "../../utils/My";


const PlainLayout = ({ children }) => {

  const largeWidthBreakpoint = 1200;
  const [isMobile, setIsMobile] = useState(window.innerWidth < largeWidthBreakpoint);

  const handleResize = () => {
    setIsMobile(window.innerWidth < largeWidthBreakpoint);
    My.log(window.innerWidth);
  };


  useEffect(() => {
    // Attach the event listener when the component mounts
    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);



  return (
    <div id="the-plain-layout">

      {isMobile ? <HeaderPhone /> : <Header />}

      <Row className="m-0">
        <Col id="the-main-col">
          {children}
        </Col>

      </Row>
    </div>
  );
}


export default PlainLayout;