import React, { useState } from "react";
import Input from "../Input/Input";
import { updatePassword } from "../../api/api";
import ConfirmationMessage from "../ConfirmationMessage/ConfirmationMessage";
import { useUserContext } from "../../context/UserContext";
import styles from "./ChangePasswordForm.module.css";

const ChangePasswordForm = props => {
  const { state } = useUserContext();

  const emptyForm = {
    loggedInUser: "",
    password: "",
    newPassword: ""
  };
  const [formInputs, setFormInputs] = useState(emptyForm);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState({
    password: false,
    newPassword: false
  });

  const onFormChange = event => {
    const { name, value } = event.target;
    setFormInputs({ ...formInputs, [name]: value });
  };

  const onFormSubmit = async event => {
    try {
      event.preventDefault();
      setFormInputs({ ...formInputs, loggedInUser: state.email });
      await updatePassword(
        state.email,
        formInputs.password,
        formInputs.newPassword
      );
      setMessage("Success");
      setSubmitted(true);
      setSuccess(true);
      setFormInputs(emptyForm);
      props.triggerRender();
    } catch (err) {
      setSuccess(false);
      setMessage("Unable to change password ", err);
      setSubmitted(true);
    }
  };

  const handleShowPassword = field => {
    setShowPassword({ ...showPassword, [field]: !showPassword[field] });
  };

  return (
    <form className={styles.container} onSubmit={onFormSubmit}>
      <h1 className={styles.heading}>Change Password</h1>
      <div className={styles.changePasswordForm}>
        <Input
          id="password"
          label="Existing Password*"
          name="password"
          onChange={onFormChange}
          value={formInputs.password}
          type={showPassword.password ? "text" : "password"}
          required
        />
        <label htmlFor="showPassword">
          <input
            type="checkbox"
            id="showPassword"
            data-testid="showPassword"
            label="Show password"
            name="showPassword"
            className={styles.showPasswordLabel}
            onClick={() => handleShowPassword("password")}
          />
          Show Password
        </label>
        <Input
          id="newPassword"
          label="New Password*"
          name="newPassword"
          onChange={onFormChange}
          value={formInputs.newPassword}
          type={showPassword.newPassword ? "text" : "password"}
          required
        />
        <label htmlFor="showNewPassword">
          <input
            type="checkbox"
            id="showNewPassword"
            data-testid="showNewPassword"
            label="Show password"
            name="showNewPassword"
            className={styles.showPasswordLabel}
            onClick={() => handleShowPassword("newPassword")}
          />
          Show Password
        </label>
      </div>
      {submitted ? (
        <ConfirmationMessage success={success} message={message} />
      ) : (
        ""
      )}
      <input className={styles.createButton} value="Submit" type="submit" />
    </form>
  );
};

export default ChangePasswordForm;
