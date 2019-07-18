import React from "react";
import { Link } from "react-router-dom";
import "./ApartmentProfile.css";

const ApartmentProfile = props => {
  if (!props.apartments || props.apartments.length < 1) {
    return <h1>Loading...</h1>;
  } else {
    const apartmentId = props.match.params.apartmentId;
    const filteredApartment = props.apartments.filter(apartment => {
      return apartment._id === apartmentId;
    });
    return (
      <div className="apartmentProfileContainer">
        <div className="apartmentProfile">
          <Link className="apartmentProfile__backButton" to="/">
            &lt; Back
          </Link>
          <h1 className="apartmentProfile__heading">{filteredApartment[0].name}</h1>
            <div className="gridContainer">
              <div className="occupantsNumber">
                <h2>No. of Occupants</h2>
                <p>0</p>
              </div>
              <div className="capacity">
                <h2>Capacity</h2>
                <p>{filteredApartment[0].capacity}</p>
              </div>
              <div className="address">
                <h2>Address</h2>
                <p>{filteredApartment[0].address}</p>
              </div>
              <div className="bedrooms">
                <h2>Bedrooms</h2>
                <p>{filteredApartment[0].bedrooms}</p>
              </div>
            </div>
          <table className="apartmentProfile__occupants">
            <thead>
            <h2>Occupants</h2>
              <tr>
                <th>Name</th>
                <th>Check-In</th>
                <th>Check-Out</th>
              </tr>
            </thead>
          </table>
          <table className="apartmentProfile__leases">
            <thead>
              <h2>Leases</h2>
              <tr>
                <th>Lease Start</th>
                <th>Lease End</th>
                <th>Monthly Rent</th>
              </tr>
            </thead>
            <tbody>
              {filteredApartment[0].leases.length > 0 ? (
                filteredApartment[0].leases.map(lease => (
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
};

const Lease = ({ leaseInfo }) => {
  return (
    <tr>
      <td>{leaseInfo.leaseStart.split("T")[0]}</td>
      <td>{leaseInfo.leaseEnd.split("T")[0]}</td>
      <td>{leaseInfo.monthlyRent}</td>
    </tr>
  );
};

export default ApartmentProfile;
