import React from "react";
import "./NewOccupantForm.css";
const attributes = ["Name", "EmployeeId", "Remarks"];

const NewOccupantForm = ({ onChange, onSubmit }) => {
  const formAttributes = attributes.map((attribute, index) => {
    const regex = /(?=[A-Z][a-z])/;
    return (
      <div key={index} className={`occupantForm__${attribute.toLowerCase()}`}>
        <label
          htmlFor={`occupantForm${attribute}`}
          className="occupantForm__label"
        >
          {attribute.split(regex).join(" ")}
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
      <h1 className="occupantForm__heading">Create New Occupant</h1>
      <div className="occupantForm">{formAttributes}</div>
      <button className="occupantForm__createButton" onClick={onSubmit}>
        Create
      </button>
    </div>
  );
};

export default NewOccupantForm;
