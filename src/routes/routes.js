import MainLayout from "../layouts/MainLayout";
import Home from "../containers/Home";
import Profile from "../containers/Profile/Profile";
import Notifications from "../containers/Notifications/Notifications";
import PlainLayout from "../layouts/PlainLayout/PlainLayout";
import Signup from "../containers/Signup/Signup";
import Login from "../containers/Login";
import Logout from "../containers/Logout";
import NotFound from "../containers/NotFound";


const routes = [
  { path: '/', layout: MainLayout, component: Home, exact: true },
  { path: '/profile/:username', layout: MainLayout, component: Profile, exact: true },
  { path: '/notifications', layout: MainLayout, component: Notifications, exact: true },

  { path: '/signup', layout: PlainLayout, component: Signup, exact: true },
  { path: '/login', layout: PlainLayout, component: Login, exact: true },
  { path: '/logout', layout: PlainLayout, component: Logout, exact: true },

  { path: '/', layout: PlainLayout, component: NotFound, exact: false },
];


export default routes;