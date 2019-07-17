import React from "react";

const NewOccupantForm = () => {
  return (
    <div className="occupantFormContainer">
      <div className="occupantForm">
        <label htmlFor="name" className="occupantForm__label">
          Name
        </label>
        <input type="text" id="name" className="occupantForm__input" />
      </div>
    </div>
  );
};

export default NewOccupantForm;
