import React from "react";
import "./Input.css";
const Input = ({
  id,
  label,
  name,
  width,
  value,
  editOccupantLabel,
  ...otherProps
}) => {
  return (
    <section className="input">
      <label className={`input__label ${editOccupantLabel}`} htmlFor={id}>
        {label}
      </label>
      <input
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

export default Input;
