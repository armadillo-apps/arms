import ApartmentDetail from '../ApartmentDetail/ApartmentDetail';
import api from '../../api/api';
import React, { Component } from 'react';
import './Apartment.css';
import SearchBar from '../SearchBar/SearchBar';

class Apartment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apartments: []
    };
  }

  componentDidMount = async () => {
    const response = await api.get('/apartments');
    this.setState(
      {
        apartments: response.data
      },
      () => {
        console.log(this.state.apartments);
      }
    );
  };

  tableDetails() {
    return (
      <table className="fields" cellSpacing="0" cellPadding="0">
        <thead className="fields__th">
          <tr>
            <th>Capacity</th>
            <th>Apartment Name</th>
            <th>Lease Start</th>
            <th>Lease End</th>
            <th>Rental Per Month</th>
          </tr>
        </thead>
        <tbody>
          {this.state.apartments.map((aptdetails, index) => {
            return <ApartmentDetail key={index} {...aptdetails} />;
          })}
        </tbody>
      </table>
    );
  }

  render() {
    return (
      <div className="apartment">
        <div className="apartment__div">
          <h1 className="apartment__heading">Apartments</h1>
          <SearchBar placeholder="Apartment" />
          {this.tableDetails()}
        </div>
      </div>
    );
  }
}

export default Apartment;
