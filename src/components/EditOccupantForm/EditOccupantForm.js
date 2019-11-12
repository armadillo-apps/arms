import React from "react";
import Input from "../Input/Input.js";
import TextArea from "../Input/TextArea.js";
import "./EditOccupantForm.css";
import ConfirmationMessage from "../ConfirmationMessage/ConfirmationMessage";
import homeOfficeData from "../../assets/HomeOfficeData";

const EditOccupantForm = ({
  onSubmit,
  onChange,
  occupant,
  message,
  success,
  closeModal
}) => {
  const {
    name: defaultName,
    employeeId: defaultId,
    gender: defaultGender,
    remarks: defaultRemarks,
    homeOffice: defaultHomeOffice,
    status: defaultStatus
  } = occupant;
  return (
    <form className="editOccupantFormContainer" onSubmit={onSubmit}>
      <h1 className="editOccupantForm__heading">Edit Occupant</h1>
      <div className="editOccupantForm">
        <Input
          id="name"
          label="Name"
          name="name"
          onChange={onChange}
          defaultValue={defaultName}
          type="text"
          width="250px"
          editOccupantLabel="input__editOccupantLabel"
        />
        <section className="editOccupantForm__gender">
          <label htmlFor="gender" className="editOccupantForm__genderLabel">
            Gender{" "}
          </label>
          <select
            id="gender"
            name="gender"
            defaultValue={defaultGender}
            onChange={onChange}
            className="editOccupantForm__select"
          >
            <option value="">Select Gender...</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="neutral">Neutral</option>
          </select>
        </section>
        <div className="editOccupantForm__flex">
          <Input
            id="employeeId"
            label="Employee ID"
            name="employeeId"
            onChange={onChange}
            defaultValue={defaultId}
            type="text"
            width="250px"
            editOccupantLabel="input__editOccupantLabel"
          />
          <section className="editOccupantForm__homeOffice">
            <label
              htmlFor="homeOffice"
              className="editOccupantForm__homeOfficeLabel"
            >
              Home Office{" "}
            </label>
            <select
              id="homeOffice"
              name="homeOffice"
              defaultValue={defaultHomeOffice}
              onChange={onChange}
              className="editOccupantForm__select"
            >
              <option value="">Select Home Office...</option>
              {homeOfficeData.map(homeOffice => {
                const keys = Object.keys(homeOffice);
                const values = homeOffice[keys];
                return keys.map(country => {
                  return values.map(city => {
                    return (
                      <option key={city} value={`${country}, ${city}`}>
                        {country}, {city}
                      </option>
                    );
                  });
                });
              })}
            </select>
          </section>
        </div>
        <section className="editOccupantForm__status">
          <label htmlFor="status" className="editOccupantForm__statusLabel">
            Occupant Status:{" "}
          </label>
          <select
            id="status"
            name="status"
            defaultValue={defaultStatus}
            onChange={onChange}
            className="editOccupantForm__select"
          >
            <option value="">Select...</option>
            <option value="allocated">Allocated</option>
            <option value="unallocated">Unallocated</option>
            <option value="inactive">Inactive</option>
          </select>
        </section>
        <TextArea
          id="remarks"
          label="Remarks"
          name="remarks"
          className="editOccupantForm__remarks"
          onChange={onChange}
          defaultValue={defaultRemarks}
          type="text"
          editOccupantLabel="input__editOccupantLabel"
        />
      </div>
      <input
        className="editOccupantForm__cancelButton"
        type="button"
        value="Cancel"
        onClick={() => closeModal("editOccupantModal")}
      />
      <input
        className="editOccupantForm__updateButton"
        value="Update"
        type="submit"
      />
      <ConfirmationMessage success={success} message={message} />
    </form>
  );
};

export default EditOccupantForm;
