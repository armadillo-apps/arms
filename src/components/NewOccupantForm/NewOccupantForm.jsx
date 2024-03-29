import React, { useState } from "react";
import { useToasts } from "react-toast-notifications";
import Input from "../Input/Input";
import TextArea from "../Input/TextArea";
import { createNewOccupant } from "../../api/api";
import homeOfficeData from "../../assets/HomeOfficeData";
import styles from "./NewOccupantForm.module.scss";
import { useHistory } from "react-router-dom";
import routes from "../../router/RouterPaths";

const NewOccupantForm = () => {
  const history = useHistory();
  const emptyForm = {
    name: "",
    employeeId: "",
    gender: "",
    remarks: "",
    homeOffice: "",
    status: ""
  };

  const [formInputs, setFormInputs] = useState(emptyForm);
  const { addToast } = useToasts();

  const onFormChange = event => {
    const { name, value } = event.target;
    setFormInputs({ ...formInputs, [name]: value });
  };

  const onFormSubmit = async event => {
    try {
      event.preventDefault();

      const response = await createNewOccupant(
        formInputs.name,
        formInputs.employeeId,
        formInputs.gender,
        formInputs.remarks,
        formInputs.homeOffice,
        formInputs.status
      );

      addToast(response, {
        appearance: "success",
        autoDismiss: true
      });
      setFormInputs(emptyForm);
    } catch (err) {
      addToast("Unable to create new occupant :(", {
        appearance: "error",
        autoDismiss: true
      });
    } finally {
      history.push(routes.OCCUPANTS);
    }
  };

  return (
    <form className={styles.formContainer} onSubmit={onFormSubmit}>
      <h1 className={styles.heading}>Create New Occupant</h1>
      <div className={styles.form}>
        <Input
          id="name"
          label="Name*"
          name="name"
          onChange={onFormChange}
          value={formInputs.name}
          type="text"
          required
        />
        <Input
          id="employee-id"
          label="Employee ID"
          name="employeeId"
          onChange={onFormChange}
          value={formInputs.employeeId}
          type="text"
        />
        <div className={styles.divided}>
          <section>
            <label htmlFor="gender" className={styles.label}>
              Gender
            </label>
            <select
              id="gender"
              label="Gender"
              name="gender"
              onChange={onFormChange}
              value={formInputs.gender}
              type="text"
            >
              <option value="">Select Gender...</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="neutral">Neutral</option>
            </select>
          </section>
          <section>
            <label htmlFor="homeOffice" className={styles.label}>
              Home Office
            </label>
            <select
              id="homeOffice"
              name="homeOffice"
              onChange={onFormChange}
              value={formInputs.homeOffice}
              type="text"
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
        <section>
          <label htmlFor="status" className={styles.label}>
            Occupant Status*
          </label>
          <select
            id="status"
            name="status"
            required
            value={formInputs.status}
            onChange={onFormChange}
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
          onChange={onFormChange}
          value={formInputs.remarks}
          type="text"
        />
      </div>
      <input className={styles.createButton} value="Create" type="submit" />
    </form>
  );
};

export default NewOccupantForm;
