import React from "react";
import Input from "../../../components/Input/Input.js";
import TextArea from "../../../components/Input/TextArea.js";
import homeOfficeData from "../../../assets/HomeOfficeData";
import styles from "./index.module.scss";

const EditOccupantForm = ({
  onSubmit,
  onChange,
  occupant,
  closeModal,
  fetchData
}) => {
  const onSubmitWithFetch = async event => {
    event.preventDefault();
    await onSubmit();
    await fetchData();
  };

  const {
    name: defaultName,
    employeeId: defaultId,
    gender: defaultGender,
    remarks: defaultRemarks,
    homeOffice: defaultHomeOffice,
    status: defaultStatus
  } = occupant;

  return (
    <form className={styles.container} onSubmit={onSubmitWithFetch}>
      <h1 className={styles.heading}>Edit Occupant</h1>
      <div className="editOccupantForm">
        <Input
          id="name"
          label="Name"
          name="name"
          onChange={onChange}
          defaultValue={defaultName}
          type="text"
          width="250px"
        />
        <section className={styles.gender}>
          <label htmlFor="gender" className={styles.genderLabel}>
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
        <div className={styles.flex}>
          <Input
            id="employeeId"
            label="Employee ID"
            name="employeeId"
            onChange={onChange}
            defaultValue={defaultId}
            type="text"
            width="250px"
          />
          <section className={styles.homeOffice}>
            <label htmlFor="homeOffice" className={styles.homeOfficeLabel}>
              Home Office{" "}
            </label>
            <select
              id="homeOffice"
              name="homeOffice"
              defaultValue={defaultHomeOffice}
              onChange={onChange}
              className={styles.selection}
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
        <section className={styles.status}>
          <label htmlFor="status" className={styles.statusLabel}>
            Occupant Status:{" "}
          </label>
          <select
            id="status"
            name="status"
            defaultValue={defaultStatus}
            onChange={onChange}
            className={styles.selection}
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
          className={styles.remarks}
          onChange={onChange}
          defaultValue={defaultRemarks}
          type="text"
        />
      </div>
      <input
        className={styles.cancelButton}
        type="button"
        value="Cancel"
        onClick={() => closeModal("editOccupantModal")}
      />
      <input className={styles.updateButton} value="Update" type="submit" />
    </form>
  );
};

export default EditOccupantForm;
