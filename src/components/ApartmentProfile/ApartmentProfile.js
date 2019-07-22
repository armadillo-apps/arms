import React from "react";
import "./ApartmentProfile.css";
import Lease from "../Lease/Lease";

const ApartmentProfile = ({ apartments, history, match }) => {
  if (!apartments || apartments.length < 1) {
    return <h1>Loading...</h1>;
  } else {
    const apartmentId = match.params.apartmentId;
    const apartment = apartments.find(apartment => {
      return apartment._id === apartmentId;
    });

    return (
      <div className="apartmentProfileContainer">
        <div className="apartmentProfile">
          <div
            className="apartmentProfile__backButton"
            onClick={() => history.goBack()}
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
          <table className="apartmentProfile__occupants">
            <thead>
              <tr>
                <th>Name</th>
                <th>Check-In</th>
                <th>Check-Out</th>
              </tr>
            </thead>
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
};


export default ApartmentProfile;
