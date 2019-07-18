import ApartmentDetail from "../ApartmentDetail/ApartmentDetail";
import React, { Component } from "react";
import "./Apartment.css";
import SearchBar from "../SearchBar/SearchBar";
import { fetchApartments } from "../../service/data";

class Apartment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apartments: []
    };
  }

  componentDidMount = async () => {
    try{
    const apartments = await fetchApartments();
    this.setState({ apartments })
    } catch (err){
      return err.message;
    }
  };

  tableDetails() {
    const {history} = this.props;
    return (
      <table className="fields" cellSpacing="0" cellPadding="0">
        <thead className="fields__th">
          <tr>
            <th>Vacancy</th>
            <th>Apartment Name</th>
            <th>Lease Start</th>
            <th>Lease End</th>
            <th>Rental Per Month</th>
          </tr>
        </thead>
        <tbody>
          {this.state.apartments.map((apartment, index) => {
            return <ApartmentDetail key={index} {...apartment} history={history} />;
          })}
        </tbody>
      </table>
    );
  }

  render() {
    return (
      <div className="apartment" data-testid="apartment">
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
