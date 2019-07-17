import React from "react";

const attributes = ["Name", "EmployeeId", "Remarks"];

const NewOccupantForm = ({ onChange, onSubmit }) => {
  const formAttributes = attributes.map((attribute, index) => {
    return (
      <div key={index} className={`occupantForm__${attribute.toLowerCase()}`}>
        <label
          htmlFor={`occupantForm${attribute}`}
          className="occupantForm__label"
        >
          {attribute}
        </label>
        <input
          type="text"
          id={`occupantForm${attribute}`}
          className="occupantForm__input"
          onChange={onChange}
        />
      </div>
    );
  });

  return (
    <div className="occupantFormContainer">
      <div className="occupantForm">{formAttributes}</div>
      <button className="occupantForm__createButton" onClick={onSubmit}>
        Create
      </button>
    </div>
  );
};

export default NewOccupantForm;
