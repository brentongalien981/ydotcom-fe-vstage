import { useEffect } from "react";
import { useDispatch } from "react-redux";
import io from "socket.io-client";
import My from "./My";
import { handleOnPostReadyNotification, queryNumOfUnreadNotifications } from "../redux/actions/notificationActions";
import { useAuth } from "../context/AuthContext";


// Connect to backend socketio connection.
const socket = io(process.env.REACT_APP_BACKEND_SOCKET_URL, {
  transports: ['websocket'],
  upgrade: false
});


function joinRoom(token) {
  if (token) {
    // Join a specific room when component mounts
    const myRoomId = 'room:' + My.generateUuid4();
    socket.emit('joinRoom', myRoomId, token);
  }
}


function listenToOnPostReadyNotification(dispatch) {

  socket.on('onPostReadyNotification', (data) => {
    dispatch(handleOnPostReadyNotification(data));
  });
}


const NotificationManager = () => {

  const dispatch = useDispatch();
  const { isLoggedIn, token } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      joinRoom(token);
      listenToOnPostReadyNotification(dispatch);
      dispatch(queryNumOfUnreadNotifications(token));
    }
  }, [dispatch, isLoggedIn, token]);


  return null;

};


export default NotificationManager;