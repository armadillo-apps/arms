import React, { Fragment } from 'react';

const Input = ({ name, ...otherProps }) => {
  return (
    <Fragment>
      <label>{name}:</label>
      <input name={name} {...otherProps} />
    </Fragment>
  );
};

export default Input;
