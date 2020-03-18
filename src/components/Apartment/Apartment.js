import ApartmentDetail from "../ApartmentDetail/ApartmentDetail";
import React, { useState, useEffect } from "react";
import styles from "./Apartment.module.css";
import SearchBar from "../SearchBar/SearchBar";
import PropTypes from "prop-types";
import moment from "moment";

export const sortApartmentsByStatus = apartmentList => {
  const activeApartments = apartmentList.filter(
    apartment => apartment.status === "active"
  );

  activeApartments.sort((firstApartment, secondApartment) => {
    let apartmentA = moment(new Date(firstApartment.leases[0].leaseEnd));
    let apartmentB = moment(new Date(secondApartment.leases[0].leaseEnd));
    return apartmentA - apartmentB;
  });

  const inactiveApartments = apartmentList.filter(
    apartment => apartment.status === "inactive"
  );
  return activeApartments.concat(inactiveApartments);
};

export const Apartment = ({ apartments, stays, history }) => {
  const [apartmentList, setApartmentList] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setApartmentList(apartments);
  }, [apartments]);

  const handleNewInput = event => {
    setInputValue(event.target.value);
  };

  const handleApartmentSearch = () => {
    const sortedApartments = sortApartmentsByStatus(apartmentList);
    const compareStrings = (str1, str2) =>
      str1.toLowerCase().includes(str2.toLowerCase());

    if (inputValue) {
      return sortedApartments.filter(apartment =>
        compareStrings(apartment.name, inputValue)
      );
    }
    return sortedApartments;
  };

  const calculateVancancy = (apartment, staysForApartment) => {
    const today = new Date();

    const currentStays = staysForApartment
      .filter(stay =>
        moment(today).isSameOrBefore(new Date(stay.checkOutDate), "day")
      )
      .filter(stay =>
        moment(today).isSameOrAfter(new Date(stay.checkInDate), "day")
      ).length;

    return apartment.capacity - currentStays;
  };

  const renderTable = () => {
    return (
      <table className={styles.table}>
        <thead className={styles.tableHeader}>
          <tr>
            <th>Status</th>
            <th>Vacancy</th>
            <th>Apartment Name</th>
            <th>Lease Start</th>
            <th>Lease End</th>
            <th>Rental Per Month</th>
          </tr>
        </thead>
        <tbody>
          {handleApartmentSearch().map(apartment => {
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
    <div className={styles.page} data-testid="apartments">
      <div className={styles.container}>
        <h1 className={styles.header}>Apartments</h1>
        <SearchBar handleChange={handleNewInput} placeholder="Apartment" />
        {renderTable()}
      </div>
    </div>
  );
};

Apartment.propTypes = {
  apartments: PropTypes.array.isRequired,
  history: PropTypes.object,
  stays: PropTypes.array.isRequired
};
