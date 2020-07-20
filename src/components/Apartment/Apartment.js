import ApartmentDetail from "../ApartmentDetail/ApartmentDetail";
import React, { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import { useUserContext } from "../../context/UserContext";
import { roles } from "../../constants/roles";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import styles from "./Apartment.module.css";
import {
  calculateVacancy,
  filterApartmentsByDate,
  filterApartmentsByName,
  sortApartmentsByStatus
} from "./utils";
import { useHistory } from "react-router-dom";
import { fetchApartments } from "../../api/api";
import routes from "../../router/RouterPaths";
import { DateRangeInput } from "../Input/DateRangeInput";
import { useFetch } from "../../hooks/useFetch";
import { isEmpty } from "../../utils/utils";

export const Apartment = () => {
  const { data: apartments } = useFetch(fetchApartments);
  const history = useHistory();
  const { state } = useUserContext();
  const userRole = state.role;
  const [searchInput, setSearchInput] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleNewInput = event => {
    setSearchInput(event.target.value);
  };

  const handleApartmentSearch = () => {
    const apartmentList = isEmpty(apartments) ? [] : apartments;
    const filteredApartments = filterApartmentsByName(
      apartmentList,
      searchInput
    );
    const sortedApartments = sortApartmentsByStatus(filteredApartments);

    if (startDate && endDate) {
      return filterApartmentsByDate(sortedApartments, startDate, endDate);
    }
    return sortedApartments;
  };

  const handleDateChange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const renderTable = () => {
    const sortedApartments = handleApartmentSearch();
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
          {sortedApartments.map(apartment => {
            return (
              <ApartmentDetail
                key={apartment._id}
                vacancy={calculateVacancy(apartment, apartment.stays)}
                apartment={apartment}
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
        <h1 className={styles.heading}>Apartments</h1>
        <div className={styles.topBarContainer}>
          <SearchBar handleChange={handleNewInput} placeholder="Apartment" />
          <div className={styles.dateRangeContainer}>
            <div>
              {userRole === roles.ADMIN && (
                <button
                  className={styles.addApartmentButton}
                  onClick={() => history.push(routes.NEW_APARTMENT)}
                >
                  + Add Apartment
                </button>
              )}
            </div>
            <DateRangeInput
              startDate={startDate}
              endDate={endDate}
              handleDateChange={handleDateChange}
            />
          </div>
        </div>
        {renderTable()}
      </div>
    </div>
  );
};
