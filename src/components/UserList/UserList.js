import React from "react";
import { Button, Image } from "react-bootstrap";
import "./UserList.css";
import { Link } from "react-router-dom";


const UserList = ({ data }) => {

  const list = data.map((user) => {

    const profilePhotoSource = user.photoSource ? `/photos/${user.photoSource}` : `/photos/penguin.jpg`;
    const profileLink = `/profile/${user.username}`;
    const displayedUsername = `@${user.username.substring(0, 12)}`;

    return (
      <div className="user-list-item" key={user.username}>
        <Image className="profile-image" src={profilePhotoSource} roundedCircle />
        <Link to={profileLink} className="profile-link">{displayedUsername}</Link>
        <Button size="sm">Follow</Button>
      </div>
    );
  });

  return (
    <div className="user-list">{list}</div>
  )

};


export default UserList;