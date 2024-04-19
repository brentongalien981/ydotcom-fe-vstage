import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from './layouts/MainLayout';
import PlainLayout from "./layouts/PlainLayout";
import Profile from "./containers/Profile";
import Home from "./containers/Home";
import Signup from "./containers/Signup/Signup";
import NotFound from "./containers/NotFound";
import { AuthProvider } from "./context/AuthContext";
import Login from "./containers/Login";
import { AlertNotificationsProvider } from "./context/AlertNotificationsContext";
import Logout from "./containers/Logout";
import { Provider } from "react-redux";
import store from "./redux/store";
import { CreatePostModalProvider } from "./context/CreatePostModalContext";
import MyRouteGuard from "./layouts/MyRouteGuard";
import Notifications from "./containers/Notifications/Notifications";


function App() {

  return (
    <Provider store={store}>
      <AuthProvider>
        <AlertNotificationsProvider>
          <CreatePostModalProvider>

            <BrowserRouter>
              <MyRouteGuard>
                <Routes>

                  <Route element={<PlainLayout />}>
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="*" element={<NotFound />} />
                  </Route>

                  <Route path="/" element={<MainLayout />}>
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/notifications" element={<Notifications />} />
                    <Route index element={<Home />} />
                  </Route>

                </Routes>
              </MyRouteGuard>
            </BrowserRouter>

          </CreatePostModalProvider>
        </AlertNotificationsProvider>
      </AuthProvider>
    </Provider>
  );
}

export default App;
