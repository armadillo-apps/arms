import React, { useState } from "react";
import Input from "../../../components/Input/Input.js";
import TextArea from "../../../components/Input/TextArea.js";
import homeOfficeData from "../../../assets/HomeOfficeData";
import styles from "./index.module.scss";
import { updateOccupant } from "../../../api/api";
import { useToasts } from "react-toast-notifications";
import useDeepCompareEffect from "use-deep-compare-effect";

const EditOccupantForm = ({ occupant, closeModal, fetchData }) => {
  const [formInputs, setFormInputs] = useState({});
  const { addToast } = useToasts();

  const { _id, ...attributes } = occupant;

  const onChange = event => {
    setFormInputs({
      ...formInputs,
      [event.target.id]: event.target.value
    });
  };

  const onSubmit = async event => {
    event.preventDefault();
    try {
      const response = await updateOccupant({ _id, ...formInputs });
      addToast(response, {
        appearance: "success",
        autoDismiss: true
      });
      closeModal();
      await fetchData();
    } catch (err) {
      addToast("Unable to update occupant", {
        appearance: "error",
        autoDismiss: true
      });
    }
  };

  useDeepCompareEffect(() => {
    setFormInputs(attributes);
  }, [attributes]);

  return (
    <form className={styles.container} onSubmit={onSubmit}>
      <h1 className={styles.heading}>Edit Occupant</h1>
      <div className="editOccupantForm">
        <Input
          id="name"
          label="Name"
          name="name"
          onChange={onChange}
          defaultValue={attributes.name}
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
            defaultValue={attributes.gender}
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
            defaultValue={attributes.employeeId}
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
              defaultValue={attributes.homeOffice}
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
            defaultValue={attributes.status}
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
          defaultValue={attributes.remarks}
          type="text"
        />
      </div>
      <input
        className={styles.cancelButton}
        type="button"
        value="Cancel"
        onClick={() => closeModal("editOccupantModal")}
      />
      <input
        className={styles.updateButton}
        data-testid="submitButton"
        value="Update"
        type="submit"
      />
    </form>
  );
};

export default EditOccupantForm;
