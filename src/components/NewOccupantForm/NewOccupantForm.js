import React from "react";

const attributes = ["Name", "Employee ID", "Remarks"];

const NewOccupantForm = () => {
  const formAttributes = attributes.map((occupant, idx) => {
    return (
      <div key={idx} className={`occupantForm__${occupant}`}>
        <label htmlFor={occupant.toLowerCase()} className="occupantForm__label">
          {occupant}
        </label>
        <input
          type="text"
          id={occupant.toLowerCase()}
          className="occupantForm__input"
        />
      </div>
    );
  });

  return (
    <div className="occupantFormContainer">
      <div className="occupantForm">{formAttributes}</div>
      <button className="occupantForm__createButton">Create</button>
    </div>
  );
};

export default NewOccupantForm;
