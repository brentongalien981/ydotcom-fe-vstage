import { Button, Image, Spinner, Tab, Tabs } from "react-bootstrap";
import "./Profile.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectorIsAuthFollowingTheUser, selectorIsReadingProfile, selectorProfile, selectorReadProfileError } from "../../redux/selectors/profileSelectors";
import "animate.css";
import { followUser, readProfile } from "../../redux/actions/profileActions";
import Bio from "../../components/Bio/Bio";
import { useAlertNotifications } from "../../context/AlertNotificationsContext";


const Profile = () => {

  const dispatch = useDispatch();
  const { username } = useParams();
  const isReadingProfile = useSelector(selectorIsReadingProfile);
  const readError = useSelector(selectorReadProfileError);
  const profile = useSelector(selectorProfile);
  const isAuthFollowingTheUser = useSelector(selectorIsAuthFollowingTheUser)
  const { addAlertNotification } = useAlertNotifications();


  useEffect(() => {
    dispatch(readProfile(username));

  }, [dispatch, username]);


  function handleFollowUser() {
    dispatch(followUser(profile.userId, addAlertNotification))
  }


  
  function getFollowOrUnfollowBtn() {

    const eventHandler = isAuthFollowingTheUser ? () => { alert("LATER: This feature is pending...") } : handleFollowUser;
    const btnText = isAuthFollowingTheUser ? "Unfollow" : "Follow";
    const btnVariant = isAuthFollowingTheUser ? "warning" : "primary";

    let btn = (
      <div className="profile-sections">
        <Button className={`btn btn-${btnVariant}`} onClick={eventHandler}>{btnText}</Button>
      </div>
    );

    return btn;
  }



  // Set loader component.
  let loaderComponent = null;
  if (isReadingProfile) {
    loaderComponent = (
      <div className="d-flex justify-content-center" style={{ padding: "20px" }}>
        <Spinner animation="border" variant="primary" className="animate__animated animate__fadeIn" data-testid="theSpinner" />
      </div>
    );
  }


  // Set error component.
  let errorComponent = null;
  if (readError) {
    errorComponent = (<p>{readError}</p>);
  }


  // Set profile component.
  let profileComponent = null;

  if (!isReadingProfile && !readError) {

    const profilePhotoSrc = profile.photoSource ? `/photos/${profile.photoSource}` : `/photos/penguin2.jpg`;

    profileComponent = (
      <>

        {/* Profile Photo */}
        <div className="profile-sections">
          <Image src={profilePhotoSrc} roundedCircle className="profile-photo" />
        </div>

        {/* Username */}
        <div className="profile-sections">@{profile.username}</div>

        {/* Follow Button */}
        {getFollowOrUnfollowBtn()}

        {/* Profile Tabs */}
        <Tabs
          defaultActiveKey="bio"
          className="mb-3 profile-sections"
          fill
        >
          <Tab eventKey="bio" title="Bio"><Bio /></Tab>
          <Tab eventKey="posts" title="Posts">Tab content for Posts</Tab>
          <Tab eventKey="followers" title="Followers">Tab content for Followers</Tab>
          <Tab eventKey="following" title="Following">Tab content for Following</Tab>
        </Tabs>

      </>
    );
  }



  return (
    <div className="profile-container">
      <h4 className="page-title">Profile</h4>
      {loaderComponent}
      {errorComponent}
      {profileComponent}
    </div>
  );
};


export default Profile;