import React from 'react';
import './Input.css';
const TextArea = ({
  id,
  label,
  name,
  editOccupantLabel,
  value,
  ...otherProps
}) => {
  return (
    <section className="input">
      <label className={`input__label ${editOccupantLabel}`} htmlFor={id}>
        {label}
      </label>
      <textarea
        id={id}
        className="input__text"
        name={name}
        value={value}
        {...otherProps}
      />
    </section>
  );
};

export default TextArea;
