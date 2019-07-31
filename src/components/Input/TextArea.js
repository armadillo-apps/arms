import React from 'react';
import './Input.css';
const TextArea = ({
  id,
  label,
  height,
  name,
  width,
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
        style={{ width, height }}
        name={name}
        value={value}
        {...otherProps}
      />
    </section>
  );
};

export default TextArea;
