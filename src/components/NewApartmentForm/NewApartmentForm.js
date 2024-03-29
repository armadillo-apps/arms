import React, { useState } from "react";
import { useToasts } from "react-toast-notifications";
import Input from "../Input/Input";
import TextArea from "../Input/TextArea";
import { createNewApartment } from "../../api/api";
import styles from "./NewApartmentForm.module.css";
import { useHistory } from "react-router-dom";
import routes from "../../router/RouterPaths";

const NewApartmentForm = () => {
  const emptyForm = {
    name: "",
    address: "",
    bedrooms: 1,
    capacity: 1,
    leaseStart: "",
    leaseEnd: "",
    rent: "",
    currency: "",
    landLordName: "",
    landLordAccount: "",
    country: "",
    remarks: "",
    status: ""
  };

  const history = useHistory();
  const [formInputs, setFormInputs] = useState(emptyForm);
  const { addToast } = useToasts();

  const onFormChange = event => {
    const { name, value } = event.target;
    const newName = name.split("")[0].toLowerCase() + name.substring(1);
    setFormInputs({ ...formInputs, [newName]: value });
  };

  const onFormSubmit = async event => {
    try {
      event.preventDefault();
      const data = {
        name: formInputs.name,
        address: formInputs.address,
        bedrooms: formInputs.bedrooms,
        capacity: formInputs.capacity,
        status: formInputs.status,
        leases: [
          {
            leaseStart: formInputs.leaseStart,
            leaseEnd: formInputs.leaseEnd,
            monthlyRent: formInputs.rent,
            currency: formInputs.currency
          }
        ],
        landlord: {
          name: formInputs.landLordName,
          accountNumber: formInputs.landLordAccount,
          mobile: formInputs.landLordMobile,
          email: formInputs.landLordEmail
        },
        country: formInputs.country,
        remarks: formInputs.remarks
      };
      setFormInputs(emptyForm);
      const output = await createNewApartment(data);

      addToast(output, {
        appearance: "success",
        autoDismiss: true
      });
      history.push(routes.APARTMENTS);
    } catch (err) {
      addToast("Unable to create new apartment :(", {
        appearance: "error",
        autoDismiss: true
      });
    }
  };

  return (
    <form className={styles.formContainer} onSubmit={onFormSubmit}>
      <div className={styles.container}>
        <h1 className={styles.heading}>Create New Apartment</h1>
        <Input
          id="apartment-name"
          label="Apartment name*"
          name="Name"
          onChange={onFormChange}
          value={formInputs.name}
          type="text"
          required
        />
        <Input
          id="address"
          label="Address*"
          name="Address"
          onChange={onFormChange}
          value={formInputs.address}
          type="text"
          required
        />
        <div className={styles.divided}>
          <Input
            id="landlord-name"
            label="Landlord name*"
            name="LandLordName"
            onChange={onFormChange}
            value={formInputs.landLordName}
            type="text"
            width="20rem"
            required
          />
          <Input
            id="landlord-account-number"
            label="Landlord A/C number*"
            name="LandLordAccount"
            onChange={onFormChange}
            value={formInputs.landLordAccount}
            type="text"
            width="20rem"
            required
          />
        </div>
        <div className={styles.divided}>
          <Input
            id="lease-start"
            label="Lease start*"
            name="LeaseStart"
            onChange={onFormChange}
            value={formInputs.leaseStart}
            type="date"
            width="20rem"
            required
          />
          <Input
            id="lease-end"
            label="Lease end*"
            name="LeaseEnd"
            onChange={onFormChange}
            value={formInputs.leaseEnd}
            type="date"
            min={formInputs.leaseStart}
            width="20rem"
            required
          />
        </div>

        <div className={styles.divided}>
          <section>
            <Input
              id="rental-per-month"
              label="Rental per month*"
              name="Rent"
              onChange={onFormChange}
              value={formInputs.rent}
              type="number"
              min="0"
              width="20rem"
              required
            />
          </section>
          <section>
            <label htmlFor="currency" className={styles.label}>
              Currency*
            </label>
            <select
              id="currency"
              name="Currency"
              required
              onChange={onFormChange}
              value={formInputs.currency}
              width="20rem"
            >
              <option value="">Select currency</option>
              <option value="SGD">SGD</option>
              <option value="THB">THB</option>
            </select>
          </section>
        </div>

        <div className={styles.divided}>
          <Input
            id="capacity"
            label="Capacity*"
            name="Capacity"
            onChange={onFormChange}
            value={formInputs.capacity}
            type="number"
            min="0"
            width="61px"
            required
          />
          <Input
            id="bedrooms"
            label="Bedrooms*"
            name="Bedrooms"
            onChange={onFormChange}
            value={formInputs.bedrooms}
            type="number"
            min="0"
            width="61px"
            required
          />
          <section>
            <label htmlFor="country" className={styles.label}>
              Country*
            </label>
            <select
              id="country"
              name="Country"
              required
              value={formInputs.country}
              onChange={onFormChange}
            >
              <option value="">Select country</option>
              <option value="Singapore">Singapore</option>
              <option value="Thailand">Thailand</option>
            </select>
          </section>
          <section>
            <label htmlFor="status" className={styles.label}>
              Apartment Status*
            </label>
            <select
              id="status"
              name="status"
              required
              value={formInputs.status}
              onChange={onFormChange}
            >
              <option value="">Select status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </section>
        </div>
        <TextArea
          id="remarks"
          label="Remarks"
          name="Remarks"
          className={styles.remarks}
          onChange={onFormChange}
          value={formInputs.remarks}
          type="text"
        />

        <input className={styles.createButton} value="Create" type="submit" />
      </div>
    </form>
  );
};

export default NewApartmentForm;
