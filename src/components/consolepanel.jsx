import "./styles/console.css";
import React, { useState } from "react";

const ConsolePanel = () => {
  const [visible, setVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const togglePanel = () => {
    setVisible(!visible);
  };

  const handleLoading = (loadingMessage) => {
    setMessage(loadingMessage);
    setLoading(true);
    setTimeout(() => {
      setSuccess(true);
      setLoading(false);
      setTimeout(() => {
        setMessage("");
        setSuccess(false);
        setVisible(false);
      }, 2000);
    }, 3000);
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
          <div className="console-item">
            Your account has been created succesfully.
          </div>
          <div className="console-item">Account register succesfull</div>
          <div className="console-item">Post reacted.</div>
          <div className="console-item">
            Permission denied! You do not have the permission to process the
            item. Only an admin can access those contents.
          </div>
          <div className="console-item">
            Your account has been created succesfully.
          </div>
          <div className="console-item">Account register succesfull</div>
          <div className="console-item">Post reacted.</div>
          <div className="console-item">
            Permission denied! You do not have the permission to process the
            item. Only an admin can access those contents.
          </div>
        </div>
      </div>
    </>
  );
};

export default ConsolePanel;
