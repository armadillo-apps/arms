import ApartmentDetail from "../ApartmentDetail/ApartmentDetail";
import React, { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import moment from "moment";
import { useUserContext } from "../../context/UserContext";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { DateRangePicker } from "react-dates";
import styles from "./Apartment.module.css";
import { calculateVacancy, sortApartmentsByStatus } from "./utils";
import { useHistory } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { fetchApartments } from "../../api/api";
import routes from "../../router/RouterPaths";

export const Apartment = () => {
  const { data: apartments } = useFetch(fetchApartments);
  const history = useHistory();
  const { state } = useUserContext();
  const userRole = state.role;
  const [inputValue, setInputValue] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);

  const handleNewInput = event => {
    setInputValue(event.target.value);
  };

  const handleApartmentSearch = () => {
    const sortedApartments = sortApartmentsByStatus(apartments ?? []);
    const compareStrings = (str1, str2) =>
      str1.toLowerCase().includes(str2.toLowerCase());

    const apartmentListByName = sortedApartments?.filter(apartment =>
      compareStrings(apartment.name, inputValue)
    );

    if (startDate && endDate) {
      return apartmentListByName?.filter(
        apartment =>
          moment(new Date(apartment.leases[0].leaseStart)).isSameOrBefore(
            moment.max(startDate, moment(new Date(0))),
            "day"
          ) &&
          moment(new Date(apartment.leases[0].leaseEnd)).isSameOrAfter(
            endDate,
            "day"
          )
      );
    }
    return apartmentListByName;
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
              {userRole === "admin" && (
                <button
                  className={styles.addApartmentButton}
                  onClick={() => history.push(routes.NEW_APARTMENT)}
                >
                  + Add Apartment
                </button>
              )}
            </div>

            <DateRangePicker
              noBorder={true}
              small={true}
              displayFormat={() => "DD/MM/YYYY"}
              showClearDates={true}
              startDate={startDate ? moment(startDate) : null}
              startDateId="startDateId"
              startDatePlaceholderText="Start Date"
              endDate={endDate ? moment(endDate) : null}
              endDateId="endDateId"
              endDatePlaceholderText=" End Date"
              isOutsideRange={() => null}
              onDatesChange={handleDateChange}
              focusedInput={focusedInput}
              onFocusChange={focusedInput => setFocusedInput(focusedInput)}
            />
          </div>
        </div>
        {renderTable()}
      </div>
    </div>
  );
};
