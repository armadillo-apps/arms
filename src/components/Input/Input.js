import React from "react";

import styles from "./Input.module.css";

const Input = ({ id, label, name, width, value, ...otherProps }) => {
  return (
    <section className={styles.input}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        className={styles.inputText}
        style={{ width }}
        name={name}
        value={value}
        {...otherProps}
      />
    </section>
  );
};

export default Input;
