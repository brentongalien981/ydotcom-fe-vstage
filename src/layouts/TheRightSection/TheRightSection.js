import React from "react";
import "./TheRightSection.css";
import RecommendedUsers from "../../components/RecommendedUsers/RecommendedUsers";



const TheRightSection = () => {

  return (
    <div id="the-right-section">
      <h4 className="pb-2">Who to Follow</h4>
      <RecommendedUsers />
    </div>
  );

}


export default TheRightSection;