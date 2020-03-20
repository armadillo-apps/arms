import React, { useState } from "react";
import { useToasts } from "react-toast-notifications";

import Input from "../Input/Input";

import { loginUser } from "../../api/api";
import { LOGIN_USER } from "../../reducer/userReducer";
import { useUserContext } from "../../context/UserContext";
import styles from "./LoginForm.module.css";

const LoginForm = () => {
  const { dispatch } = useUserContext();
  const [formInputs, setFormInputs] = useState({ email: "", password: "" });
  const { addToast } = useToasts();

  const onChange = event => {
    const { name, value } = event.target;
    setFormInputs({ ...formInputs, [name]: value });
  };

  const onSubmit = async event => {
    try {
      event.preventDefault();
      const user = await loginUser(formInputs.email, formInputs.password);
      addToast("Welcome back!", {
        appearance: "success",
        autoDismiss: true
      });
      dispatch({ type: LOGIN_USER, payload: user });
    } catch (err) {
      addToast("Invalid email or password", {
        appearance: "error",
        autoDismiss: true
      });
    }
  };

  return (
    <form
      className={styles.container}
      onSubmit={onSubmit}
      data-testid="loginForm"
    >
      <h1 className={styles.heading1}>ARMS</h1>
      <div className={styles.loginForm}>
        <Input
          id="email"
          label="email"
          name="email"
          type="text"
          placeholder="john@gmail.com"
          value={formInputs.email}
          onChange={onChange}
          required
        />
        <Input
          id="password"
          label="password"
          name="password"
          type="password"
          value={formInputs.password}
          onChange={onChange}
          required
        />
        <input className={styles.loginButton} value="LOGIN" type="submit" />
      </div>
    </form>
  );
};

export default LoginForm;
