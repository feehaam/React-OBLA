import "../styles/console.css";
import React, { useEffect, useState } from "react";

const ConsolePanel = ({ notification, loading, setLoading }) => {
  const [visible, setVisible] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    setNotifications(notification);

    if (notification.length > 0) {
      setVisible(true);
      let duration = 3000;
      setTimeout(() => {
        setVisible(false);
      }, duration);
    }
  }, [notification]);

  const togglePanel = () => {
    setVisible(!visible);
  };

  return (
    <>
      <img
        src="/images/console.gif"
        alt="logs"
        className={`console-icon${visible ? "-toggled" : ""}`}
        onClick={togglePanel}
      />
      <div className={`console-panel ${visible ? "visible" : "hidden"}`}>
        <div className="console-panel-title">Tasks log</div>
        {notifications
          .slice()
          .reverse()
          .map((item, index) => (
            <div
              key={index}
              className={`console-item${item.type ? "-" + item.type : ""}`}
              style={{
                fontWeight: index === 0 ? "bold" : "normal",
              }}
            >
              {item.message}
            </div>
          ))}
      </div>
    </>
  );
};

export default ConsolePanel;
