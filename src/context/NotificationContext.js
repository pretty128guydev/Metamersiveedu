import React, { createContext, useContext, useState } from "react";
import { notification } from "antd";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [api, contextHolder] = notification.useNotification();
  const [queuedNotification, setQueuedNotification] = useState(null);

  const showNotification = (config) => {
    if (!config.persistent) {
      api[config.type || "info"](config);
    } else {
      setQueuedNotification(config);
    }
  };

  const flushNotification = () => {
    if (queuedNotification) {
      api[queuedNotification.type || "info"](queuedNotification);
      setQueuedNotification(null);
    }
  };

  return (
    <NotificationContext.Provider value={{ showNotification, flushNotification }}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotificationContext() {
  return useContext(NotificationContext);
}
