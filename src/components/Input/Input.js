import React from 'react';
import './Input.css';
const Input = ({ label, name, width, value, ...otherProps }) => {
  return (
    <section className="input">
      <label className="input__label">{label}:</label>
      <input
        className="input__text"
        style={{ width }}
        name={name}
        {...otherProps}
        value={value}
      />
    </section>
  );
};

export default Input;
