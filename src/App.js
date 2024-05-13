import { AuthProvider } from "./context/AuthContext";
import { AlertNotificationsProvider } from "./context/AlertNotificationsContext";
import { Provider } from "react-redux";
import store from "./redux/store";
import { CreatePostModalProvider } from "./context/CreatePostModalContext";
import AppRouter from './routes/AppRouter';


function App() {

  return (
    <Provider store={store}>
      <AuthProvider>
        <AlertNotificationsProvider>
          <CreatePostModalProvider>
            <AppRouter />
          </CreatePostModalProvider>
        </AlertNotificationsProvider>
      </AuthProvider>
    </Provider>
  );
}

export default App;
