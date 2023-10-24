import "../styles/console.css";
import React, { useEffect, useState } from "react";

const ConsolePanel = ({ notification }) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // When the notification prop changes, update the notifications state.
    setNotifications(notification);

    // Show the panel when there are notifications
    if (notification.length > 0) {
      setVisible(true);

      // Calculate the duration based on the message length

      // const totalMessageLength = notifications[notifications.length - 1].length;

      let duration = 3000; // Default duration in milliseconds

      // duration = duration + totalMessageLength * 100;

      // console.log(
      //   "message length: " +
      //     totalMessageLength +
      //     " Notification duration: " +
      //     duration
      // );

      // Hide the panel after the calculated duration
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
        <div className={`content ${loading ? "loading" : ""}`}>
          {notifications
            .slice() // Create a copy of the notifications array
            .reverse() // Reverse the order
            .map((item, index) => (
              <div
                key={index}
                className={`console-item${item.type ? "-" + item.type : ""}`}
                style={{
                  fontWeight: index === 0 ? "bold" : "normal", // Set the latest notification text in bold
                }}
              >
                {item.message}
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default ConsolePanel;
