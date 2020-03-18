import React, { useState } from "react";
import PropTypes from "prop-types";
import Input from "../Input/Input";
import "./EditApartmentForm.css";
import moment from "moment";
import ConfirmationMessage from "../ConfirmationMessage/ConfirmationMessage";

const EditApartmentForm = ({
  apartment,
  currentOccupants,
  futureOccupants,
  closeModal,
  onSubmit,
  success,
  message
}) => {
  const [name, setName] = useState(apartment.name);
  const [address, setAddress] = useState(apartment.address);
  const [bedrooms, setBedrooms] = useState(apartment.bedrooms);
  const [capacity, setCapacity] = useState(apartment.capacity);
  const [country, setCountry] = useState(apartment.country);
  const [status, setStatus] = useState(apartment.status);
  const [error, setError] = useState("");
  const [landlordName, setLandlordName] = useState(apartment.landlord.name);
  const [remarks, setRemarks] = useState(apartment.remarks);
  const [accountNumber, setAccountNumber] = useState(
    apartment.landlord.accountNumber
  );

  const [leaseStart, setLeaseStart] = useState(apartment.leases[0].leaseStart);
  const [leaseEnd, setLeaseEnd] = useState(apartment.leases[0].leaseEnd);
  const [monthlyRent, setMonthlyRent] = useState(
    apartment.leases[0].monthlyRent
  );
  const [currency, setCurrency] = useState(apartment.leases[0].currency);
  const updatedApartment = {
    apartmentId: apartment._id,
    name,
    address,
    bedrooms,
    capacity,
    country,
    status,
    leases: [{ leaseStart, leaseEnd, monthlyRent, currency }],
    landlord: { name: landlordName, accountNumber },
    remarks
  };

  const leaseStartDate = new Date(leaseStart);
  const leaseStartFormat = moment(leaseStartDate).format("YYYY-MM-DD");

  const leaseEndDate = new Date(leaseEnd);
  const leaseEndFormat = moment(leaseEndDate).format("YYYY-MM-DD");

  return (
    <form
      className="editApartmentFormContainer"
      data-testid="editApartmentForm"
      onSubmit={event => onSubmit(event, updatedApartment)}
    >
      <h1 className="editApartmentForm__heading">Edit Apartment</h1>
      <div className="editApartmentForm">
        <Input
          id="name"
          label="Apartment Name"
          name="name"
          type="text"
          value={name}
          onChange={event => setName(event.target.value)}
        />
        <Input
          id="address"
          label="Address"
          name="address"
          type="text"
          value={address}
          onChange={event => {
            setAddress(event.target.value);
          }}
        />
        <div className="bedroomCapacity__wrapper">
          <Input
            id="bedrooms"
            label="Bedrooms"
            name="bedrooms"
            type="number"
            min="0"
            value={bedrooms}
            onChange={event => {
              setBedrooms(event.target.value);
            }}
          />
          <Input
            id="capacity"
            label="Capacity"
            name="capacity"
            type="number"
            min="0"
            value={capacity}
            onChange={event => {
              setCapacity(event.target.value);
            }}
          />
          <section className="editApartmentForm__country">
            <label htmlFor="country">Country</label>
            <select
              data-testid={"editApartment__country"}
              id="country"
              name="country"
              value={country}
              onChange={event => setCountry(event.target.value)}
            >
              <option value="">Select country</option>
              <option value="Singapore">Singapore</option>
              <option value="Thailand">Thailand</option>
            </select>
          </section>
          <section className="editApartmentForm__status">
            <label htmlFor="status">Status</label>
            <select
              data-testid="editApartment__status"
              id="status"
              name="status"
              value={status}
              onChange={event => {
                setStatus(event.target.value);
                if (
                  event.target.value === "inactive" &&
                  (currentOccupants.length > 0 || futureOccupants.length > 0)
                ) {
                  setError(
                    "Unable to change to inactive when there are current or future occupants"
                  );
                } else {
                  setError("");
                }
              }}
            >
              <option value="">Select status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            {error ? <p className="editApartmentForm__error">{error}</p> : ""}
          </section>
        </div>
        <div className="lease__wrapper">
          <Input
            id="leaseStart"
            label="Lease Start"
            name="leaseStart"
            type="date"
            value={leaseStartFormat}
            onChange={event => {
              setLeaseStart(event.target.value);
            }}
          />
          <Input
            id="leaseEnd"
            label="Lease End"
            name="leaseEnd"
            type="date"
            value={leaseEndFormat}
            onChange={event => {
              setLeaseEnd(event.target.value);
            }}
          />
        </div>
        <div className="monthlyRent__wrapper">
          <Input
            id="monthlyRent"
            label="Monthly Rent"
            name="monthlyRent"
            type="number"
            value={monthlyRent}
            onChange={event => {
              setMonthlyRent(event.target.value);
            }}
          />
          <section className="editApartmentForm__currency">
            <label htmlFor="currency">Currency</label>
            <select
              data-testid={"editApartment__currency"}
              id="currency"
              name="currency"
              value={currency}
              onChange={event => {
                setCurrency(event.target.value);
              }}
            >
              <option value="">Select currency</option>
              <option value="SGD">SGD</option>
              <option value="THB">THB</option>
            </select>
          </section>
        </div>
        <Input
          id="landlordName"
          label="Landlord Name"
          name="landlordName"
          type="text"
          value={landlordName}
          onChange={event => {
            setLandlordName(event.target.value);
          }}
        />
        <Input
          id="landlordAccountNumber"
          label="Landlord A/C Number"
          name="landlordAccountNumber"
          type="text"
          value={accountNumber}
          onChange={event => {
            setAccountNumber(event.target.value);
          }}
        />
        <div className="editApartmentForm__remarks">
          <label htmlFor="remarks">Remarks</label>
          <textarea
            id="remarks"
            name="remarks"
            rows="3"
            cols="40"
            value={remarks || ""}
            onChange={event => {
              setRemarks(event.target.value);
            }}
          />
        </div>
      </div>
      <div className="editApartmentForm__buttons">
        <input
          className="editApartmentForm__cancelButton"
          type="button"
          value="Cancel"
          onClick={closeModal}
        />
        <input
          className="editApartmentForm__updateButton"
          value="Update"
          type="submit"
          disabled={error !== "" ? true : false}
        />
        <ConfirmationMessage success={success} message={message} />
      </div>
    </form>
  );
};

EditApartmentForm.propTypes = {
  apartment: PropTypes.object.isRequired
};

EditApartmentForm.defaultProps = {
  apartment: {
    name: "",
    address: "",
    capacity: 1,
    bedrooms: 1,
    country: "",
    status: "",
    leases: [{}],
    remarks: "",
    landlord: {}
  }
};

export default EditApartmentForm;
