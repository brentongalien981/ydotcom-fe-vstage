import { useEffect } from "react";
import { useDispatch } from "react-redux";
import io from "socket.io-client";
import My from "./My";
import MyJsonLocalStorage from "./MyJsonLocalStorage";
import { handleOnPostReadyNotification } from "../redux/actions/notificationActions";


// Connect to backend socketio connection.
const socket = io(process.env.REACT_APP_BACKEND_SOCKET_URL, { 
  transports: ['websocket'], 
  upgrade: false 
});


function joinRoom() {

  const storedAuth = MyJsonLocalStorage.get("auth");
  const userToken = storedAuth?.token;

  if (userToken) {
    // Join a specific room when component mounts
    const myRoomId = 'room:' + My.generateUuid4();
    socket.emit('joinRoom', myRoomId, userToken);
  }
}


function listenToOnPostReadyNotification(dispatch) {

  socket.on('onPostReadyNotification', (data) => {
    dispatch(handleOnPostReadyNotification(data));
  });
}


const NotificationManager = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    joinRoom();
    listenToOnPostReadyNotification(dispatch);
  }, [dispatch]);


  return null;

};


export default NotificationManager;