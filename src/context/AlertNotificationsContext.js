import React, { useState, createContext, useContext, useEffect } from 'react';
import MyJsonLocalStorage from '../utils/MyJsonLocalStorage';



const AlertNotificationsContext = createContext();


export const AlertNotificationsProvider = ({ children }) => {

  const [alertNotifications, setAlertNotifications] = useState([]);


  useEffect(() => {
    // Check existing alertNotifications from localStorage.
    const storedAlertNotifications = MyJsonLocalStorage.get("alertNotifications");

    if (storedAlertNotifications?.length > 0) {
      setAlertNotifications(storedAlertNotifications);
    }

  }, []);


  const addAlertNotification = (heading, message, variant) => {
    const id = Date.now().toString();
    const updatedAlertNotifications = [...alertNotifications, { id, heading, message, variant }];
    setAlertNotifications(updatedAlertNotifications);
    MyJsonLocalStorage.set("alertNotifications", updatedAlertNotifications);
  };


  const addAlertNotificationByProps = ({ heading, message, variant }) => {
        
    const id = Date.now().toString();
    const updatedAlertNotifications = [...alertNotifications, { id, heading, message, variant }];
    setAlertNotifications(updatedAlertNotifications);
    MyJsonLocalStorage.set("alertNotifications", updatedAlertNotifications);
  };




  const removeAlertNotification = (id) => {
    const updatedAlertNotifications = alertNotifications.filter((notification) => notification.id !== id);
    setAlertNotifications([...updatedAlertNotifications]);
    MyJsonLocalStorage.set("alertNotifications", updatedAlertNotifications);
  };


  return (
    <AlertNotificationsContext.Provider value={{ alertNotifications, addAlertNotification, addAlertNotificationByProps, removeAlertNotification }}>
      {children}
    </AlertNotificationsContext.Provider>
  );

};


export const useAlertNotifications = () => useContext(AlertNotificationsContext);
