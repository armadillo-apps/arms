import React, { Component } from "react";
import Input from "../Input/Input";
import { createNewApartment } from "../../api/api";
import "./NewApartmentForm.css";
import ConfirmationMessage from "../ConfirmationMessage/ConfirmationMessage";

export class NewApartmentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
      bedrooms: "",
      capacity: "",
      leaseStart: "",
      leaseEnd: "",
      rent: "",
      landLordName: "",
      landLordAccount: "",
      landLordMobile: "",
      landLordEmail: "",
      success: false,
      message: "",
      submitted: false
    };
  }

  onFormChange = event => {
    const { name, value } = event.target;
    const newName = name.split("")[0].toLowerCase() + name.substring(1);
    this.setState({
      [newName]: value
    });
  };

  onFormSubmit = async event => {
    event.preventDefault();
    try {
      const data = {
        name: this.state.name,
        address: this.state.address,
        bedrooms: this.state.bedrooms,
        capacity: this.state.capacity,
        leases: [
          {
            leaseStart: this.state.leaseStart,
            leaseEnd: this.state.leaseEnd,
            monthlyRent: this.state.rent
          }
        ],
        landlord: {
          name: this.state.landLordName,
          accountNumber: this.state.landLordAccount,
          mobile: this.state.landLordMobile,
          email: this.state.landLordEmail
        }
      };
      const output = await createNewApartment(data);
      this.setState({
        name: "",
        address: "",
        bedrooms: "",
        capacity: "",
        leaseStart: "",
        leaseEnd: "",
        rent: "",
        landLordName: "",
        landLordAccount: "",
        landLordMobile: "",
        landLordEmail: "",
        success: true,
        message: output,
        submitted: true
      });
    } catch (err) {
      this.setState({
        success: false,
        message: "Unable to create new apartment :(",
        submitted: true
      });
      return err;
    }
  };

  render() {
    return (
      <form onSubmit={this.onFormSubmit} className="apartmentForm">
        <div className="apartmentForm__div">
          <h1 className="apartmentForm__heading">Create New Apartment</h1>
          <Input
            id="apartment-name"
            label="Apartment name"
            name="Name"
            onChange={this.onFormChange}
            value={this.state.name}
            type="text"
            required
          />
          <Input
            id="address"
            label="Address"
            name="Address"
            onChange={this.onFormChange}
            value={this.state.address}
            type="text"
            required
          />
          <div className="formDivide">
            <Input
              id="landlord-name"
              label="LandLord name"
              name="LandLordName"
              onChange={this.onFormChange}
              value={this.state.landLordName}
              type="text"
              required
            />
            <Input
              id="landlord-account-number"
              label="Landlord A/C No"
              name="LandLordAccount"
              onChange={this.onFormChange}
              value={this.state.landLordAccount}
              type="text"
              width="196px"
              required
            />
          </div>
          <div className="formDivide">
            <Input
              id="landlord-email"
              label="LandLord Email"
              name="LandLordEmail"
              onChange={this.onFormChange}
              value={this.state.landLordEmail}
              type="text"
              required
            />

            <Input
              id="landlord-mobile-number"
              label="LandLord Mobile no"
              name="LandLordMobile"
              onChange={this.onFormChange}
              value={this.state.landLordMobile}
              type="text"
              required
              width="141px"
            />
          </div>
          <div className="formDivide">
            <Input
              id="lease-start"
              label="Lease Start"
              name="LeaseStart"
              onChange={this.onFormChange}
              value={this.state.leaseStart}
              type="date"
              required
              width="141px"
            />
            <Input
              id="lease-end"
              label="Lease End"
              name="LeaseEnd"
              onChange={this.onFormChange}
              value={this.state.leaseEnd}
              type="date"
              width="141px"
              required
            />
          </div>
          <Input
            id="rental-per-month"
            label="Rental per month"
            name="Rent"
            onChange={this.onFormChange}
            value={this.state.rent}
            type="number"
            required
          />
          <div className="formDivide">
            <Input
              id="capacity"
              label="Capacity"
              name="Capacity"
              onChange={this.onFormChange}
              value={this.state.capacity}
              type="number"
              required
              width="61px"
            />
            <Input
              id="bedrooms"
              label="Bedrooms"
              name="Bedrooms"
              onChange={this.onFormChange}
              value={this.state.bedrooms}
              type="number"
              required
              width="61px"
            />
          </div>
          <button
            className="apartmentForm__createButton"
            onClick={this.onFormSubmit}
          >
            Create
          </button>
          {this.state.submitted ? (
            <ConfirmationMessage
              message={this.state.message}
              success={this.state.success}
            />
          ) : (
            ""
          )}
        </div>
      </form>
    );
  }
}

export default NewApartmentForm;
