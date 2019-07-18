import React, { Component } from 'react';
import Input from '../Input/Input';

export class NewApartmentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      address: '',
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

  render() {
    return (
      <form style={{ display: 'flex', flexDirection: 'column' }}>
        <h1>Create New Apartment</h1>
        <Input
          name="Name"
          onChange={this.onFormChange}
          value={this.state.name}
          type="text"
        />
        <Input
          name="Address"
          onChange={this.onFormChange}
          value={this.state.address}
          type="text"
        />
        <Input
          name="Capacity"
          onChange={this.onFormChange}
          value={this.state.capacity}
          type="number"
        />
        <Input
          name="LeaseStart"
          onChange={this.onFormChange}
          value={this.state.leaseStart}
          type="date"
        />
        <Input
          name="LeaseEnd"
          onChange={this.onFormChange}
          value={this.state.leaseEnd}
          type="date"
        />
        <Input
          name="Rent"
          onChange={this.onFormChange}
          value={this.state.rent}
          type="number"
        />
        <Input
          name="LandLordName"
          onChange={this.onFormChange}
          value={this.state.landLordName}
          type="text"
        />
        <Input
          name="LandLordAccount"
          onChange={this.onFormChange}
          value={this.state.landLordAccount}
          type="text"
        />
        <Input
          name="LandLordMobile"
          onChange={this.onFormChange}
          value={this.state.landLordMobile}
          type="text"
        />
        <Input
          name="LandLordEmail"
          onChange={this.onFormChange}
          value={this.state.landLordEmail}
          type="text"
        />
        <Input type="Submit" />
      </form>
    );
  }
}

export default NewApartmentForm;
