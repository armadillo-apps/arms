import React from "react";

import styles from "./Input.module.css";

const TextArea = ({ id, label, name, value, ...otherProps }) => {
  return (
    <section className={styles.input}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <textarea
        id={id}
        className={styles.inputText}
        name={name}
        value={value}
        {...otherProps}
      />
    </section>
  );
};

export default TextArea;
