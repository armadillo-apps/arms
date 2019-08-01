import ApartmentDetail from "../ApartmentDetail/ApartmentDetail";
import React from "react";
import "./Apartment.css";
import SearchBar from "../SearchBar/SearchBar";
import PropTypes from "prop-types";
import moment from "moment";

const Apartment = ({ apartments, stays, history }) => {
  const calculateVancancy = (apartment, staysForApartment) => {
    const today = new Date();

    const currentStays = staysForApartment
      .filter(stay => moment(today).isSameOrBefore(stay.checkOutDate, "day"))
      .filter(stay => moment(today).isSameOrAfter(stay.checkInDate, "day"))
      .length;

    return apartment.capacity - currentStays;
  };

  const renderTable = () => {
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
          {apartments.map(apartment => {
            const staysForCurrentApartment = stays.filter(
              stay => stay.apartmentId === apartment._id
            );
            return (
              <ApartmentDetail
                key={apartment._id}
                vacancy={calculateVancancy(apartment, staysForCurrentApartment)}
                {...apartment}
                history={history}
              />
            );
          })}
        </tbody>
      </table>
    );
  };

  return (
    <div className="apartment" data-testid="apartment">
      <div className="apartment__div">
        <h1 className="apartment__heading">Apartments</h1>
        <SearchBar placeholder="Apartment" />
        {renderTable()}
      </div>
    </div>
  );
};

Apartment.propTypes = {
  stays: PropTypes.array.isRequired
};

export default Apartment;
