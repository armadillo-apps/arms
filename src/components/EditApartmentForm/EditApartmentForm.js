import React from "react";
import PropTypes from "prop-types";
import Input from "../Input/Input";

const EditApartmentForm = ({ apartment }) => {
  const {
    name,
    address,
    bedrooms,
    capacity,
    country,
    landlord: { name: landlordName, accountNumber },
    remarks
  } = apartment;

  return (
    <form
      className="editApartmentFormContainer"
      data-testid="editApartmentForm"
    >
      <h1 className="editApartmentForm__heading">Edit Apartment</h1>
      <div className="editApartmentForm">
        <Input
          id="name"
          label="Apartment Name"
          name="name"
          type="text"
          defaultValue={name}
        />
        <Input
          id="address"
          label="Address"
          name="address"
          type="text"
          defaultValue={address}
        />
        <Input
          id="bedrooms"
          label="Bedrooms"
          name="bedrooms"
          type="number"
          min="0"
          defaultValue={bedrooms}
        />
        <Input
          id="capacity"
          label="Capacity"
          name="capacity"
          type="number"
          min="0"
          defaultValue={capacity}
        />
        <Input
          id="country"
          label="Country"
          name="country"
          type="text"
          defaultValue={country}
        />
        <Input
          id="landlordName"
          label="Landlord Name"
          name="landlordName"
          type="text"
          defaultValue={landlordName}
        />
        <Input
          id="landlordAccountNumber"
          label="Landlord A/C Number"
          name="landlordAccountNumber"
          type="text"
          defaultValue={accountNumber}
        />
        <label htmlFor="remarks">Remarks</label>
        <textarea
          id="remarks"
          name="remarks"
          rows="3"
          cols="30"
          defaultValue={remarks}
        />
      </div>
      <input type="button" value="Cancel" />
      <input
        className="editApartmentForm__updateButton"
        value="Update"
        type="submit"
      />
    </form>
  );
};

EditApartmentForm.propTypes = {
  apartment: PropTypes.object.isRequired
};

EditApartmentForm.defaultProps = {
  apartment: { landlord: {} }
};

export default EditApartmentForm;
