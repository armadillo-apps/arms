import React from "react";
import Input from "../Input/Input.js";
import "./EditOccupantForm.css";
import ConfirmationMessage from "../ConfirmationMessage/ConfirmationMessage";

const EditOccupantForm = ({ onSubmit, onChange, occupant, message, success }) => {
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
        />
        <Input
          id="employeeId"
          label="Employee ID"
          name="employeeId"
          onChange={onChange}
          defaultValue={defaultId}
          type="text"
        />
        <Input
          id="gender"
          label="Gender"
          name="gender"
          onChange={onChange}
          defaultValue={defaultGender}
          type="text"
        />
        <Input
          id="remarks"
          label="Remarks"
          name="remarks"
          onChange={onChange}
          defaultValue={defaultRemarks}
          type="text"
        />
        <Input
          id="country"
          label="Country"
          name="country"
          onChange={onChange}
          defaultValue={defaultCountry}
          type="text"
          required
        />
        <section>
          <label htmlFor="status" className="editOccupantForm__statusLabel">
            Occupant Status:{" "}
          </label>
          <select
            id="status"
            name="status"
            defaultValue={defaultStatus}
            onChange={onChange}
          >
            <option value="">Select...</option>
            <option value="allocated">Allocated</option>
            <option value="unallocated">Unallocated</option>
            <option value="inactive">Inactive</option>
          </select>
        </section>
      </div>
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
