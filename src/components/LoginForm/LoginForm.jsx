import React, { useState } from "react";
import { useToasts } from "react-toast-notifications";
import { useHistory } from "react-router-dom";
import Input from "../Input/Input";
import routes from "../../router/RouterPaths";
import { loginUser } from "../../api/api";
import { LOGIN_USER, LOGOUT_USER } from "../../reducer/userReducer";
import { useUserContext } from "../../context/UserContext";
import styles from "./LoginForm.module.css";
import { setToken } from "../../utils/token";

const LoginForm = () => {
  const history = useHistory();
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
      const { accessToken, user } = await loginUser(
        formInputs.email,
        formInputs.password
      );
      setToken(accessToken);
      addToast("Welcome back!", {
        appearance: "success",
        autoDismiss: true
      });
      dispatch({ type: LOGIN_USER, payload: user });
      history.push(routes.APARTMENTS);
    } catch (err) {
      dispatch({
        type: LOGOUT_USER
      });
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
