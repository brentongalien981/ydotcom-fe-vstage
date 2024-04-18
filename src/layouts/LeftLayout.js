import { Link } from "react-router-dom";



function LeftLayout() {

  return (
    <nav style={myStyle.nav}>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/auth">Auth</Link></li>
      </ul>
    </nav>
  );
}


const myStyle = {
  nav: {
    border: "3px solid black",
    borderRadius: "10px"
  }
};


export default LeftLayout;