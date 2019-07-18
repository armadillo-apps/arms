import React, { Component } from 'react';
import Input from '../Input/Input';
import api from '../../api/api';

export class NewApartmentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      address: '',
      bedrooms: '',
      capacity: '',
      leaseStart: '',
      leaseEnd: '',
      rent: '',
      landLordName: '',
      landLordAccount: '',
      landLordMobile: '',
      landLordEmail: ''
    };
  }

  onFormChange = (event) => {
    const { name, value } = event.target;
    const newName = name.split('')[0].toLowerCase() + name.substring(1);
    this.setState({
      [newName]: value
    });
  };

  onFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post('/apartments', {
        name: this.state.name,
        address: this.state.address,
        bedrooms: this.state.bedrooms,
        capacity: this.state.capacity,
        leases: [
          {
            leaseStart: this.state.leaseStart,
            leaseEnd: this.state.leaseEnd,
            monthlyRent: this.state.monthlyRent
          }
        ],
        landlord: {
          name: this.state.landLordName,
          accountNumber: this.state.landLordAccount,
          mobile: this.state.landLordMobile,
          email: this.state.landLordEmail
        }
      });
    } catch (err) {
        return err
    }
  };

  render() {
    return (
      <form
        onSubmit={this.onFormSubmit}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <h1>Create New Apartment</h1>
        <Input
          name="Name"
          onChange={this.onFormChange}
          value={this.state.name}
          type="text"
          required
        />
        <Input
          name="Address"
          onChange={this.onFormChange}
          value={this.state.address}
          type="text"
          required
        />
        <Input
          name="Bedrooms"
          onChange={this.onFormChange}
          value={this.state.bedrooms}
          type="number"
          required
        />
        <Input
          name="Capacity"
          onChange={this.onFormChange}
          value={this.state.capacity}
          type="number"
          required
        />
        <Input
          name="LeaseStart"
          onChange={this.onFormChange}
          value={this.state.leaseStart}
          type="date"
          required
        />
        <Input
          name="LeaseEnd"
          onChange={this.onFormChange}
          value={this.state.leaseEnd}
          type="date"
          required
        />
        <Input
          name="Rent"
          onChange={this.onFormChange}
          value={this.state.rent}
          type="number"
          required
        />
        <Input
          name="LandLordName"
          onChange={this.onFormChange}
          value={this.state.landLordName}
          type="text"
          required
        />
        <Input
          name="LandLordAccount"
          onChange={this.onFormChange}
          value={this.state.landLordAccount}
          type="text"
          required
        />
        <Input
          name="LandLordMobile"
          onChange={this.onFormChange}
          value={this.state.landLordMobile}
          type="text"
          required
        />
        <Input
          name="LandLordEmail"
          onChange={this.onFormChange}
          value={this.state.landLordEmail}
          type="text"
          required
        />
        <Input type="Submit" />
      </form>
    );
  }
}

export default NewApartmentForm;
