import React from "react";
import "./Post.css";
import bbdevcomVideoPlayer from "@bbdevcomVideo/bbdevcomVideo-player-react";
import { Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import MyDatePrettifier from "../../utils/MyDatePrettifier";
import "animate.css";


const Post = (props) => {

  const postOwnerUsername = props.post.user.username;
  const userProfileLink = `/profile/${postOwnerUsername}`;
  const timestamp = MyDatePrettifier.timePassed(props.post.createdAt, new Date());


  return (
    <div className="aPost animate__animated animate__fadeIn" data-testid="aPost">

      <div className="headerSection">

        <div className="d-flex justify-content-between">
          <div>
            <Image className="profilePic" src="photos/penguin3.png" roundedCircle />
            <h6 className="username"><Link to={userProfileLink}>@{postOwnerUsername}</Link></h6>
          </div>
          <h6 className="timestamp">{timestamp}</h6>
        </div>

        <p className="postMsgSection">{props.post.message}</p>

      </div>


      <div className="videoSection">
        <bbdevcomVideoPlayer
          streamType="on-demand"
          playbackId={props.post.video.bbdevcomVideoPlaybackId}
          // playbackId="b2umqofYtJoKqYdNGFAggk00revWA01jPnXLITiaYal02o"
          metadata={{
            video_id: props.post.video.id,
            // video_title: "Test video title",
            viewer_user_id: "GUEST",
          }}
        />
      </div>


      <div className="buttonSection">
        <Button><ion-icon name="chatbubble"></ion-icon> Comment</Button>
        <Button><ion-icon name="thumbs-up"></ion-icon> Like</Button>
      </div>

    </div>
  );

};


export default Post;