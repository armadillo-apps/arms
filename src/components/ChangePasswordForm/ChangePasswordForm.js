import React, { useState } from "react";
import { useToasts } from "react-toast-notifications";
import Input from "../Input/Input";
import { updatePassword } from "../../api/api";
import { useUserContext } from "../../context/UserContext";
import styles from "./ChangePasswordForm.module.css";

const ChangePasswordForm = () => {
  const {
    state: { email }
  } = useUserContext();
  const { addToast } = useToasts();

  const emptyForm = {
    loggedInUser: "",
    password: "",
    newPassword: ""
  };
  const [formInputs, setFormInputs] = useState(emptyForm);

  const onFormChange = event => {
    const { name, value } = event.target;
    setFormInputs({ ...formInputs, [name]: value });
  };

  const onFormSubmit = async event => {
    try {
      event.preventDefault();
      setFormInputs({ ...formInputs, loggedInUser: email });
      await updatePassword(email, formInputs.password, formInputs.newPassword);
      addToast("Success", {
        appearance: "success",
        autoDismiss: true
      });
      setFormInputs(emptyForm);
    } catch (err) {
      addToast("Unable to change password", {
        appearance: "error",
        autoDismiss: true
      });
    }
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
          isPassword={true}
          required
        />
        <Input
          id="newPassword"
          label="New Password*"
          name="newPassword"
          onChange={onFormChange}
          value={formInputs.newPassword}
          isPassword={true}
          required
        />
      </div>
      <input className={styles.createButton} value="Submit" type="submit" />
    </form>
  );
};

export default ChangePasswordForm;
