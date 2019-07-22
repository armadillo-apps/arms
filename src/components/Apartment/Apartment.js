import ApartmentDetail from "../ApartmentDetail/ApartmentDetail";
import React from "react";
import "./Apartment.css";
import SearchBar from "../SearchBar/SearchBar";

const Apartment = ({ apartments, history }) => {
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
            return (
              <ApartmentDetail
                key={apartment._id}
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

export default Apartment;
