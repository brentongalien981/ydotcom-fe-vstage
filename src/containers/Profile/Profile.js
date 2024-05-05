import { Image, Tab, Tabs } from "react-bootstrap";
import "./Profile.css";
import dummyProfile from "../../data/dummyProfile.json";


const Profile = () => {

  return (
    <div>
      <h3>Profile</h3>

      <div className="profile-container">

        <div>
          <Image src={"photos/" + dummyProfile.photo} roundedCircle className="profile-photo" />
        </div>

        <div>@{dummyProfile.username}</div>

        <Tabs
          defaultActiveKey="bio"
          className="mb-3"
          fill
        >
          <Tab eventKey="bio" title="Bio">Tab content for Bio</Tab>
          <Tab eventKey="posts" title="Posts">Tab content for Posts</Tab>
          <Tab eventKey="followers" title="Followers">Tab content for Followers</Tab>
          <Tab eventKey="following" title="Following">Tab content for Following</Tab>
        </Tabs>


      </div>
    </div>
  );
};


export default Profile;