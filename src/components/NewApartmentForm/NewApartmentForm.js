import React, { useState } from "react";
import Input from "../Input/Input";
import TextArea from "../Input/TextArea";
import "./NewApartmentForm.css";
import ConfirmationMessage from "../ConfirmationMessage/ConfirmationMessage";
import { createNewApartment } from "../../api/api";

const NewApartmentForm = props => {
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

  const [formInputs, setFormInputs] = useState(emptyForm);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);

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

      const output = await createNewApartment(data);

      setMessage(output);
      setSuccess(true);
      setSubmitted(true);
      setFormInputs(emptyForm);
      props.triggerRender();
      props.history.push(`/apartments`);
    } catch (err) {
      setMessage("Unable to create new apartment :(");
      setSuccess(false);
      setSubmitted(true);
    }
  };

  return (
    <form className="apartmentForm" onSubmit={onFormSubmit}>
      <div className="apartmentForm__div">
        <h1 className="apartmentForm__heading">Create New Apartment</h1>
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
        <div className="formDivide">
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
        <div className="formDivide">
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

        <div className="formDivide">
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
            <label htmlFor="currency" className="apartmentForm__currency">
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

        <div className="formDivide">
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
            <label htmlFor="country" className="apartmentForm__country">
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
            <label htmlFor="status" className="apartmentForm__status">
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
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </section>
        </div>
        <TextArea
          id="remarks"
          label="Remarks"
          name="Remarks"
          className="apartmentForm__remarks"
          onChange={onFormChange}
          value={formInputs.remarks}
          type="text"
        />
        {submitted ? (
          <ConfirmationMessage message={message} success={success} />
        ) : (
          ""
        )}
        <input
          className="apartmentForm__createButton"
          value="Create"
          type="submit"
        />
      </div>
    </form>
  );
};

export default NewApartmentForm;
