import React from "react";
import "./Input.css";
const TextArea = ({ id, label, name, width, value, ...otherProps }) => {
  return (
    <section className="input">
      <label className="input__label" htmlFor={id}>
        {label}
      </label>
      <textarea
        id={id}
        className="input__text"
        style={{ width }}
        name={name}
        value={value}
        {...otherProps}
      />
    </section>
  );
};

export default TextArea;
