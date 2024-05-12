import { useEffect, useState } from "react";
import My from "../utils/My";
import MainPhoneLayout from "./MainPhoneLayout/MainPhoneLayout";
import MainWebLayout from "./MainWebLayout/MainWebLayout";
import NotificationManager from "../utils/NotificationManager";


function MainLayout() {

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
    <>
      {isMobile ? <MainPhoneLayout /> : <MainWebLayout />}
      <NotificationManager />
    </>
  );
}


export default MainLayout;