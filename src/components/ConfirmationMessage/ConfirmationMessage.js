import React from "react";
import styles from "./ConfirmationMessage.module.css";

const ConfirmationMessage = ({ message, success }) => {
  return (
    <p className={success ? styles.positive : styles.inverted}>{message}</p>
  );
};

export default ConfirmationMessage;
