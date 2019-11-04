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
              <option value="Brisbane, Australia">Brisbane, Australia</option>
              <option value="Melbourne, Australia">Melbourne, Australia</option>
              <option value="Sydney, Australia">Sydney, Australia</option>
              <option value="Belo Horizonte, Brazil">
                Belo Horizonte, Brazil
              </option>
              <option value="Porto Alegre, Brazil">Porto Alegre, Brazil</option>
              <option value="Recife, Brazil">Recife, Brazil</option>
              <option value="São Paulo, Brazil">São Paulo, Brazil</option>
              <option value="Santiago, Chile">Santiago, Chile</option>
              <option value="Beijing, China">Beijing, China</option>
              <option value="Chengdu, China">Chengdu, China</option>
              <option value="Hong Kong, China">Hong Kong, China</option>
              <option value="Shanghai, China">Shanghai, China</option>
              <option value="Shenzhen, China">Shenzhen, China</option>
              <option value="Wuhan, China">Wuhan, China</option>
              <option value="Xi'an, China">Xi'an, China</option>
              <option value="Quito, Ecuador">Quito, Ecuador</option>
              <option value="Berlin, Germany">Berlin, Germany</option>
              <option value="Cologne, Germany">Cologne, Germany</option>
              <option value="Hamburg, Germany">Hamburg, Germany</option>
              <option value="Munich, Germany">Munich, Germany</option>
              <option value="Stuttgart, Germany">Stuttgart, Germany</option>
              <option value="Bangalore, India">Bangalore, India</option>
              <option value="Chennai, India">Chennai, India</option>
              <option value="Coimbatore, India">Coimbatore, India</option>
              <option value="Gurgaon, India">Gurgaon, India</option>
              <option value="Hyderabad, India">Hyderabad, India</option>
              <option value="Mumbai, India">Mumbai, India</option>
              <option value="Pune, India">Pune, India</option>
              <option value="Milan, Italy">Milan, Italy</option>
              <option value="Atlanta, North America">
                Atlanta, North America
              </option>
              <option value="Chicago, North America">
                Chicago, North America
              </option>
              <option value="Dallas, North America">
                Dallas, North America
              </option>
              <option value="Denver, North America">
                Denver, North America
              </option>
              <option value="New York, North America">
                New York, North America
              </option>
              <option value="San Francisco, North America">
                San Francisco, North America
              </option>
              <option value="Toronto, North America">
                Toronto, North America
              </option>
              <option value="Singapore, Singapore">Singapore, Singapore</option>
              <option value="Barcelona, Spain">Barcelona, Spain</option>
              <option value="Madrid, Spain">Madrid, Spain</option>
              <option value="Bangkok, Thailand">Bangkok, Thailand</option>
              <option value="London, United Kingdom">
                London, United Kingdom
              </option>
              <option value="Manchester, United Kingdom">
                Manchester, United Kingdom
              </option>
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
