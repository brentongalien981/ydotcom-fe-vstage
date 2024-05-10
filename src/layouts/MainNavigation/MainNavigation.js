import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Button, Badge } from "react-bootstrap";
import { useCreatePostModal } from "../../context/CreatePostModalContext";
import { useSelector } from "react-redux";
import { selectorNumUnreadNotifications } from "../../redux/selectors/notificationSelectors";
import "./MainNavigation.css";



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
        <li><Link to="/signup"><ion-icon name="person-add" id="navbar-icons"></ion-icon> Signup</Link></li>
        <li><Link to="/login"><ion-icon name="log-in" id="navbar-icons"></ion-icon> Login</Link></li>
      </>
    );
  };


  const getUserGreetingComp = () => {

    if (isLoggedIn) {
      return (
        <div>
          <h5>{`What's up ${username}?!`}</h5>
        </div>
      );
    }

    return null;

  };


  const getLoggedInUserLinks = () => {
    if (isLoggedIn) {
      return (
        <>
          <li><Link to={`/profile/${username}`}><ion-icon id="navbar-icons" name="person"></ion-icon> Profile</Link></li>
          <li>
            <Link to="/notifications">
              <ion-icon id="navbar-icons" name="notifications"></ion-icon> Notifications <Badge bg="danger">{numUnreadNotifications}</Badge>
            </Link>
          </li>
        </>
      );
    }

    return null;
  };


  return (
    <div id="main-nav-container">
      {getUserGreetingComp()}
      <nav className="main-nav-section">
        <ul>
          <li><Link to="/"><ion-icon name="home" id="navbar-icons"></ion-icon> Home</Link></li>
          {getLogInAndSignupLinks()}
          {getLoggedInUserLinks()}
          <li><Button onClick={showCreatePostModal}><ion-icon name="pencil" id="navbar-icons"></ion-icon> Create Post</Button></li>
        </ul>
      </nav>
    </div>
  );
}


export default MainNavigation;