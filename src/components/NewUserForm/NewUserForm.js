import React, { useState } from "react";
import { useToasts } from "react-toast-notifications";
import Input from "../Input/Input";
import { createNewUser } from "../../api/api";
import styles from "./NewUserForm.module.css";

const NewUserForm = props => {
  const emptyForm = {
    name: "",
    email: "",
    password: "",
    role: ""
  };

  const [formInputs, setFormInputs] = useState(emptyForm);
  const { addToast } = useToasts();
  const [showPassword, setShowPassword] = useState(false);

  const onFormChange = event => {
    const { name, value } = event.target;
    setFormInputs({ ...formInputs, [name]: value });
  };

  const onFormSubmit = async event => {
    try {
      event.preventDefault();

      await createNewUser(
        formInputs.name,
        formInputs.email,
        formInputs.password,
        formInputs.role
      );

      addToast("Success", {
        appearance: "success",
        autoDismiss: true
      });
      setFormInputs(emptyForm);
      props.triggerRender();
    } catch (err) {
      addToast("Unable to create new user :(", {
        appearance: "error",
        autoDismiss: true
      });
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form className={styles.formContainer} onSubmit={onFormSubmit}>
      <h1 className={styles.heading}>Create New User</h1>
      <div className={styles.form}>
        <Input
          id="name"
          label="Name*"
          name="name"
          onChange={onFormChange}
          value={formInputs.name}
          type="text"
          required
        />
        <Input
          id="email"
          label="Email*"
          name="email"
          onChange={onFormChange}
          value={formInputs.email}
          type="text"
          required
        />
        <Input
          id="password"
          label="Password*"
          name="password"
          onChange={onFormChange}
          value={formInputs.password}
          type={showPassword ? "text" : "password"}
          required
        />
        <label htmlFor="showPassword">
          <input
            type="checkbox"
            id="showPassword"
            label="Show password"
            name="showPassword"
            className={styles.checkboxLabel}
            onClick={handleShowPassword}
          />
          Show Password
        </label>

        <section>
          <label htmlFor="role" className={styles.label}>
            User Role
          </label>
          <select
            id="role"
            name="role"
            onChange={onFormChange}
            value={formInputs.role}
            type="text"
          >
            <option value="">Select Role...</option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="guest">Guest</option>
          </select>
        </section>
      </div>
      <input className={styles.createButton} value="Create" type="submit" />
    </form>
  );
};

export default NewUserForm;
