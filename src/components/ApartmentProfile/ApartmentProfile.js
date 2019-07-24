import React, { Component } from "react";
import "./ApartmentProfile.css";
import Lease from "../Lease/Lease";
import ApartmentAssign from "../ApartmentAssign/ApartmentAssign";
import { getApartmentProfileHistory } from "../../api/api";
import extractDate from "../../utils/ExtractDate"

class ApartmentProfile extends Component {
  constructor(props) {
    super(props);
    this.apartmentId = this.props.match.params.apartmentId;
    this.state = {
      occupantHistory: []
    };
  }

  componentDidMount = async () => {
    const occupantHistory = await getApartmentProfileHistory(this.apartmentId);
    this.setState({ occupantHistory });
  };

  render() {
    const apartmentId = this.props.match.params.apartmentId;
    if (!this.props.apartments || this.props.apartments.length < 1) {
      return <h1>Loading...</h1>;
    } else {
      const apartment = this.props.apartments.find(apartment => {
        return apartment._id === this.apartmentId;
      });
      return (
        <div className="apartmentProfileContainer">
          <div className="apartmentProfile">
            <div
              className="apartmentProfile__backButton"
              onClick={() => this.props.history.goBack()}
            >
              &lt; Back
            </div>
            <h1 className="apartmentProfile__heading">{apartment.name}</h1>
            <div className="apartmentProfile__details">
              <div className="occupantsNumber">
                <h2>No. of Occupants</h2>
                <p>0</p>
              </div>
              <div className="capacity">
                <h2>Capacity</h2>
                <p>{apartment.capacity}</p>
              </div>
              <div className="address">
                <h2>Address</h2>
                <p>{apartment.address}</p>
              </div>
              <div className="bedrooms">
                <h2>Bedrooms</h2>
                <p>{apartment.bedrooms}</p>
              </div>
            </div>
            <h2 className="apartmentProfile__header2">Occupants</h2>
            <ApartmentAssign
              handleChange={this.props.handleChange}
              filterByText={this.props.filterByText}
              apartmentId={apartmentId}
              handleClick={this.props.handleClick}
              dropdown={this.props.dropdown}
              addNewStay={this.props.addNewStay}
              occupantToAssign={this.props.occupantToAssign}
              success={this.props.success}
              message={this.props.message}
            />
            <table className="apartmentProfile__occupants">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Check-In</th>
                  <th>Check-Out</th>
                </tr>
              </thead>
              <tbody>
                {this.state.occupantHistory.length > 0 ? (
                  this.state.occupantHistory.map(occupant => {
                    const { _id, occupantName, checkInDate, checkOutDate } = occupant;
                    return (
                      <tr key={_id}>
                        <td>{occupantName}</td>
                        <td>{extractDate(checkInDate)}</td>
                        <td>{extractDate(checkOutDate)}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>No occupants yet!</tr>
                )}
              </tbody>
            </table>
            <h2 className="apartmentProfile__header2">Leases</h2>
            <table className="apartmentProfile__leases">
              <thead>
                <tr>
                  <th>Lease Start</th>
                  <th>Lease End</th>
                  <th>Monthly Rent</th>
                </tr>
              </thead>
              <tbody>
                {apartment.leases.length > 0 ? (
                  apartment.leases.map(lease => (
                    <Lease key={lease._id} leaseInfo={lease} />
                  ))
                ) : (
                  <tr>No Leases yet!</tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
  }
}

export default ApartmentProfile;
