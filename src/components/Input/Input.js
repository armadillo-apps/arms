import React, { Fragment } from 'react';
import './input.css';

const Input = ({ label, name, width, value, ...otherProps }) => {
  return (
    <section className="inputSection">
      <label className="inputSection__label">{label}:</label>
      <input
        className="input"
        style={{ width }}
        name={name}
        {...otherProps}
        value={value}
      />
    </section>
  );
};

export default Input;
