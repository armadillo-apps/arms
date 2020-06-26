import React, { useState } from "react";

import styles from "./Input.module.css";

const Input = ({
  id,
  label,
  name,
  width,
  value,
  type,
  isPassword = false,
  ...otherProps
}) => {
  const [showPassword, setShowPassword] = useState(isPassword);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section className={styles.input}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <div>
        <input
          id={id}
          className={styles.inputText}
          style={{ width }}
          name={name}
          value={value}
          type={showPassword ? "password" : type}
          {...otherProps}
        />
        {isPassword ? (
          <i
            className={showPassword ? "far fa-eye" : "far fa-eye-slash"}
            data-testid={`toggle-${id}`}
            id="showPassword"
            onClick={() => handleShowPassword()}
          ></i>
        ) : null}
      </div>
    </section>
  );
};

export default Input;
