import React, { Component } from "react";
import Input from "../Input/Input";
import TextArea from "../Input/TextArea";
import "./NewApartmentForm.css";
import ConfirmationMessage from "../ConfirmationMessage/ConfirmationMessage";
import { createNewApartment } from "../../api/api";

class NewApartmentForm extends Component {
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
      country: "",
      remarks: "",
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
    try {
      event.preventDefault();
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
        },
        country: this.state.country,
        remarks: this.state.remarks
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
        country: "",
        remarks: "",
        success: true,
        message: output,
        submitted: true
      });
      this.props.triggerRender();
    } catch (err) {
      this.setState({
        success: false,
        message: "Unable to create new apartment :(",
        submitted: true
      });
    }
  };

  render() {
    return (
      <form className="apartmentForm" onSubmit={this.onFormSubmit}>
        <div className="apartmentForm__div">
          <h1 className="apartmentForm__heading">Create New Apartment</h1>
          <Input
            id="apartment-name"
            label="Apartment name*"
            name="Name"
            onChange={this.onFormChange}
            value={this.state.name}
            type="text"
            required
          />
          <Input
            id="address"
            label="Address*"
            name="Address"
            onChange={this.onFormChange}
            value={this.state.address}
            type="text"
            required
          />
          <div className="formDivide">
            <Input
              id="landlord-name"
              label="Landlord name"
              name="LandLordName"
              onChange={this.onFormChange}
              value={this.state.landLordName}
              type="text"
              required
            />
            <Input
              id="landlord-account-number"
              label="Landlord A/C number"
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
              id="lease-start"
              label="Lease start*"
              name="LeaseStart"
              onChange={this.onFormChange}
              value={this.state.leaseStart}
              type="date"
              width="170px"
              required
            />
            <Input
              id="lease-end"
              label="Lease end*"
              name="LeaseEnd"
              onChange={this.onFormChange}
              value={this.state.leaseEnd}
              type="date"
              min={this.state.leaseStart}
              width="170px"
              required
            />
          </div>
          <Input
            id="rental-per-month"
            label="Rental per month*"
            name="Rent"
            onChange={this.onFormChange}
            value={this.state.rent}
            type="number"
            min="0"
            required
          />
          <div className="formDivide">
            <Input
              id="capacity"
              label="Capacity*"
              name="Capacity"
              onChange={this.onFormChange}
              value={this.state.capacity}
              type="number"
              min="0"
              width="61px"
              required
            />
            <Input
              id="bedrooms"
              label="Bedrooms"
              name="Bedrooms"
              onChange={this.onFormChange}
              value={this.state.bedrooms}
              type="number"
              min="0"
              width="61px"
              required
            />
          </div>
          <Input
            id="country"
            label="Country"
            name="Country"
            onChange={this.onFormChange}
            value={this.state.country}
            type="text"
          />
          <TextArea
            id="remarks"
            label="Remarks"
            name="Remarks"
            onChange={this.onFormChange}
            value={this.state.remarks}
            type="text"
          />
          <input
            className="apartmentForm__createButton"
            value="Create"
            type="submit"
          />
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
