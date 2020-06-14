import React from "react";
import PropTypes from "prop-types";

import SearchBar2 from "../SearchBar/SearchBar2";
import styles from "./ApartmentProfile2.module.css";
import DetailsCard from "../DetailsCard/DetailsCard";
import { useApartmentData } from "../../hooks/useApartmentData";
import { useHistory, useParams } from "react-router-dom";
import routes from "../../router/RouterPaths";

const ApartmentProfile2 = () => {
  const history = useHistory();
  const { apartmentId } = useParams();
  const { apartment } = useApartmentData(apartmentId);
  const occupantsCount = "1";
  return (
    <div className={styles.mainContainer}>
      <SearchBar2 placeholder="Search here" />
      <div className={styles.profileContainer}>
        <button
          className={styles.backButton}
          onClick={() => history.push(routes.APARTMENTS)}
        >
          &lt; Back
        </button>
        <button className={styles.editButton}>EDIT</button>
        <div className={styles.mainCard}>
          <h1>{apartment.name}</h1>
          <div className={styles.activeStatus}>{apartment.status}</div>
        </div>
        <div className={styles.vacancyCard} data-testid="vacancyCard">
          <h2>VACANCY</h2>
          <span>
            {occupantsCount} <span className={styles.divider}>|</span>{" "}
            {apartment.capacity}
          </span>
        </div>
        <DetailsCard dataTestId="detailsCard" apartment={apartment} />
        <div className={styles.remarksCard} data-testid="remarksCard">
          <h2>REMARKS</h2>
          <p>{apartment.remarks}</p>
        </div>
        <div className={styles.occupantsCard} data-testid="occupantsCard">
          <h2>OCCUPANTS</h2>
          <h3>NAME</h3>
          <h3>CHECK-IN</h3>
          <h3>CHECK-OUT</h3>
          <h3>REMARKS</h3>
        </div>
        <div className={styles.leaseCard} data-testid="leaseCard">
          <h2>LEASE</h2>
        </div>
      </div>
    </div>
  );
};

export default ApartmentProfile2;

ApartmentProfile2.propTypes = {
  match: PropTypes.object
};
