import { Image, Spinner, Tab, Tabs } from "react-bootstrap";
import "./Profile.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import My from "../../utils/My";
import { selectorIsReadingProfile, selectorProfile, selectorReadProfileError } from "../../redux/selectors/profileSelectors";
import "animate.css";
import { readProfile } from "../../redux/actions/profileActions";
import Bio from "../../components/Bio/Bio";


const Profile = () => {

  const dispatch = useDispatch();
  const { username } = useParams();
  const isReadingProfile = useSelector(selectorIsReadingProfile);
  const readError = useSelector(selectorReadProfileError);
  const profile = useSelector(selectorProfile);


  useEffect(() => {
    // TODO: Read user's bio.
    My.log(`username ==> ${username}`);
    dispatch(readProfile(username));

  }, [dispatch, username]);


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

    const profilePhotoSrc = `/photos/${profile.photo}`;

    profileComponent = (
      <div className="profile-container">

        {/* Profile Photo */}
        <div>
          <Image src={profilePhotoSrc} roundedCircle className="profile-photo" />
        </div>

        {/* Username */}
        <div>@{profile.username}</div>

        {/* Profile Tabs */}
        <Tabs
          defaultActiveKey="bio"
          className="mb-3"
          fill
        >
          <Tab eventKey="bio" title="Bio"><Bio /></Tab>
          <Tab eventKey="posts" title="Posts">Tab content for Posts</Tab>
          <Tab eventKey="followers" title="Followers">Tab content for Followers</Tab>
          <Tab eventKey="following" title="Following">Tab content for Following</Tab>
        </Tabs>

      </div>
    );
  }



  return (
    <div>
      <h3>Profile</h3>
      {loaderComponent}
      {errorComponent}
      {profileComponent}
    </div>
  );
};


export default Profile;