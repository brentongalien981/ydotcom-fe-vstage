import React, { useEffect, useState } from "react";
import "./TheRightSection.css";
import UserList from "../../components/UserList/UserList";
import { getFakeRecommendedUsers } from "../../data/recommendedUsers";


const TheRightSection = () => {

  const [recommendedUsers, setRecommendedUsers] = useState([]);

  useEffect(() => {
    // TODO: Read recommended users.
    setRecommendedUsers(getFakeRecommendedUsers());
  }, []);


  return (
    <div id="the-right-section">
      <h4 className="pb-2">Who to Follow</h4>
      <UserList data={recommendedUsers} />
    </div>
  );

}


export default TheRightSection;