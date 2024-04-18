import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button, Badge } from "react-bootstrap";
import { useCreatePostModal } from "../context/CreatePostModalContext";
import { useSelector } from "react-redux";
import { selectorNumUnreadNotifications } from "../redux/selectors/notificationSelectors";



function MainNavigation() {

  const { isLoggedIn, username } = useAuth();
  const { showCreatePostModal } = useCreatePostModal();
  let numUnreadNotifications = useSelector(selectorNumUnreadNotifications);
  if (numUnreadNotifications < 1) { numUnreadNotifications = ""; }


  const getLogInAndSignupLinks = () => {
    if (isLoggedIn) {
      return null;
    }

    return (
      <>
        <li><Link to="/signup"><ion-icon name="person-add"></ion-icon> Signup</Link></li>
        <li><Link to="/login"><ion-icon name="log-in"></ion-icon> Login</Link></li>
      </>
    );
  };


  const getUserGreetingComp = () => {

    if (isLoggedIn) {
      return (
        <div>
          <h3>{`Hi ${username}!`}</h3>
        </div>
      );
    }

    return null;

  };


  const getLoggedInUserLinks = () => {
    if (isLoggedIn) {
      return (
        <>
          <li><Link to="/profile"><ion-icon name="person"></ion-icon> Profile</Link></li>
          <li>
            <Link to="/notifications">
              <ion-icon name="notifications"></ion-icon> Notifications <Badge bg="danger">{numUnreadNotifications}</Badge>
            </Link>
          </li>
          <li><Link to="/logout"><ion-icon name="log-out"></ion-icon> Logout</Link></li>
        </>
      );
    }

    return null;
  };


  return (
    <>
      {getUserGreetingComp()}
      <nav style={myStyle.nav}>
        <ul>
          <li><Link to="/"><ion-icon name="home"></ion-icon> Home</Link></li>
          {getLogInAndSignupLinks()}
          {getLoggedInUserLinks()}
          <li><Button onClick={showCreatePostModal}><ion-icon name="pencil"></ion-icon> Create Post</Button></li>
        </ul>
      </nav>
    </>
  );
}


const myStyle = {
  nav: {
    border: "3px solid black",
    borderRadius: "10px"
  }
};


export default MainNavigation;