import React, { useEffect } from "react";
import { Button, Image, Spinner } from "react-bootstrap";
import "./RecommendedUsers.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectorError, selectorIsReading, selectorRecommendedUsers } from "../../redux/selectors/recommendedUsersSelector";
import { readRecommendedUsers } from "../../redux/actions/recommendedUsersActions";


const RecommendedUsers = () => {

  // Use hooks.
  const dispatch = useDispatch();

  // Reference redux state.
  const recommendedUsers = useSelector(selectorRecommendedUsers);
  const isReading = useSelector(selectorIsReading);
  const error = useSelector(selectorError);


  // Do initial reading of recommended users.
  useEffect(() => {
    dispatch(readRecommendedUsers());
  }, []);



  // Set the component.
  const list = recommendedUsers.map((user) => {

    const profilePhotoSource = user.Profile?.photoSource ? `/photos/${user.Profile.photoSource}` : `/photos/penguin.jpg`;
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


  // Set error component.
  let errorComponent = null;
  if (error) {
    errorComponent = (<p>{error}</p>);
  }


  // Return the component.
  return (
    <div className="user-list" data-testid="recommendedUsersTestId">
      {list}
      {loaderComponent}
      {errorComponent}
    </div>
  )

};


export default RecommendedUsers;