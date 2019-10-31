import React from "react";
import Input from "../Input/Input.js";
import TextArea from "../Input/TextArea.js";
import "./EditOccupantForm.css";
import ConfirmationMessage from "../ConfirmationMessage/ConfirmationMessage";

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
    country: defaultCountry,
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
        <Input
          id="gender"
          label="Gender"
          name="gender"
          onChange={onChange}
          defaultValue={defaultGender}
          type="text"
          width="100px"
          editOccupantLabel="input__editOccupantLabel"
        />
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
          <Input
            id="country"
            label="Country"
            name="country"
            onChange={onChange}
            defaultValue={defaultCountry}
            type="text"
            width="100px"
            editOccupantLabel="input__editOccupantLabel"
          />
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
