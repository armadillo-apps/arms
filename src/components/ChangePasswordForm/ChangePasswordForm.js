import React, { useState } from "react";
import { useToasts } from "react-toast-notifications";
import Input from "../Input/Input";
import { updatePassword } from "../../api/api";
import { useUserContext } from "../../context/UserContext";
import styles from "./ChangePasswordForm.module.css";

const ChangePasswordForm = props => {
  const { state } = useUserContext();
  const { addToast } = useToasts();

  const emptyForm = {
    loggedInUser: "",
    password: "",
    newPassword: ""
  };
  const [formInputs, setFormInputs] = useState(emptyForm);
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
      addToast("Success", {
        appearance: "success",
        autoDismiss: true
      });
      setFormInputs(emptyForm);
      props.triggerRender();
    } catch (err) {
      addToast("Unable to change password", {
        appearance: "error",
        autoDismiss: true
      });
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
      <input className={styles.createButton} value="Submit" type="submit" />
    </form>
  );
};

export default ChangePasswordForm;
