import React from "react";
import "../ApartmentDetail/ApartmentDetail.css";

const ConfirmationMessage = ({ message, success }) => {
  return <p className={success ? "positive" : "inverted"}>{message}</p>;
};

module.exports = ConfirmationMessage;
