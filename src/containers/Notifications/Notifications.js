import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectorIsReadingNotifications, selectorNotifications, selectorReadNotificationsError } from "../../redux/selectors/notificationSelectors";
import "animate.css";
import { useDispatch } from "react-redux";
import { readNotifications } from "../../redux/actions/notificationActions";
import { Spinner } from "react-bootstrap";


const Notifications = () => {

  const notifications = useSelector(selectorNotifications);
  const isReading = useSelector(selectorIsReadingNotifications);
  const error = useSelector(selectorReadNotificationsError);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(readNotifications());
  }, [dispatch]);


  // Set loader component.
  let loaderComponent = null;
  if (isReading) {
    loaderComponent = (
      <div className="d-flex justify-content-center" style={{ padding: "20px" }}>
        <Spinner animation="border" variant="primary" className="animate__animated animate__fadeIn" data-testid="theSpinner" />
      </div>
    );
  }


  // Set error component.
  let errorComponent = null;
  if (error) {
    errorComponent = (<p>{error}</p>);
  }


  // Set notifications component.
  let notificationsComponent = null;
  if (notifications.length > 0) {
    notificationsComponent = (
      <div>
        {notifications.map((n) => <p key={n.id} className="animate__animated animate__fadeIn">{n.message}</p>)}
      </div>
    );
  }


  return (
    <div>
      <h3>Notifications</h3>
      {notificationsComponent}
      {loaderComponent}
      {errorComponent}
    </div>
  );

};


export default Notifications;