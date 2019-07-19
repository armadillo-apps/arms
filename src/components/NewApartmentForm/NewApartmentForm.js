import React, { Component } from "react";
import Input from "../Input/Input";
import { createNewApartment } from "../../api/data";
import "./NewApartmentForm.css";

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
      landLordEmail: ""
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
      await createNewApartment(data);
    } catch (err) {
      return err;
    }
  };

  render() {
    return (
      <form onSubmit={this.onFormSubmit} className="apartmentForm">
        <div className="apartmentForm__div">
          <h1 className="apartmentForm__heading">Create New Apartment</h1>
          <Input
            label="Apartment name"
            name="Name"
            onChange={this.onFormChange}
            value={this.state.name}
            type="text"
            required
          />
          <Input
            label="Address"
            name="Address"
            onChange={this.onFormChange}
            value={this.state.address}
            type="text"
            required
          />
          <div className="formDivide">
            <Input
              label="LandLord name"
              name="LandLordName"
              onChange={this.onFormChange}
              value={this.state.landLordName}
              type="text"
              required
            />
            <Input
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
              label="LandLord Email"
              name="LandLordEmail"
              onChange={this.onFormChange}
              value={this.state.landLordEmail}
              type="text"
              required
            />

            <Input
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
              label="Lease Start"
              name="LeaseStart"
              onChange={this.onFormChange}
              value={this.state.leaseStart}
              type="date"
              required
              width="141px"
            />
            <Input
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
            label="Rental per month"
            name="Rent"
            onChange={this.onFormChange}
            value={this.state.rent}
            type="number"
            required
          />
          <div className="formDivide">
            <Input
              label="Capacity"
              name="Capacity"
              onChange={this.onFormChange}
              value={this.state.capacity}
              type="number"
              required
              width="61px"
            />
            <Input
              label="Bedrooms"
              name="Bedrooms"
              onChange={this.onFormChange}
              value={this.state.bedrooms}
              type="number"
              required
              width="61px"
            />
          </div>
          <input
            className="apartmentForm__createButton"
            value="Create"
            type="Submit"
            readOnly
          />
        </div>
      </form>
    );
  }
}

export default NewApartmentForm;
