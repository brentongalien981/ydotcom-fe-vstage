import React from "react";
import { Button, Image, Spinner } from "react-bootstrap";
import "./RecommendedUsers.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectorIsReading, selectorRecommendedUsers } from "../../redux/selectors/recommendedUsersSelector";


const RecommendedUsers = () => {

  const recommendedUsers = useSelector(selectorRecommendedUsers);
  const isReading = useSelector(selectorIsReading);


  const list = recommendedUsers.map((user) => {

    const profilePhotoSource = user.photoSource ? `/photos/${user.photoSource}` : `/photos/penguin.jpg`;
    const profileLink = `/profile/${user.username}`;
    const displayedUsername = `@${user.username.substring(0, 12)}`;

    return (
      <div className="user-list-item d-flex align-items-center" key={user.username}>
        <Image className="profile-image" src={profilePhotoSource} roundedCircle />
        <Link to={profileLink} className="profile-link">{displayedUsername}</Link>
        <Button size="sm" className="ms-auto">Follow</Button>
      </div>
    );
  });


  // Set loader component.
  let loaderComponent = null;
  if (isReading) {
    loaderComponent = (
      <div className="d-flex justify-content-center" style={{ padding: "20px" }}>
        <Spinner animation="border" variant="primary" className="animate__animated animate__fadeIn" data-testid="recommendedUsersSpinner" />
      </div>
    );
  }


  return (
    <div className="user-list" data-testid="recommendedUsersTestId">
      {list}
      {loaderComponent}
    </div>
  )

};


export default RecommendedUsers;