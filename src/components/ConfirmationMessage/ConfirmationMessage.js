import React from "react";
import "./ConfirmationMessage.css";

const ConfirmationMessage = ({ message, success }) => {
  return <p className={success ? "positive" : "inverted"}>{message}</p>;
};

export default ConfirmationMessage;
