import React from "react";

import SearchBar2 from "../SearchBar/SearchBar2";
import styles from "./ApartmentProfile2.module.css";

const ApartmentProfile2 = () => {
  const capacity = "2";
  const occupantsCount = "1";
  return (
    <div className={styles.mainContainer}>
      <SearchBar2 placeholder="Search here" />
      <div className={styles.profileContainer}>
        <button className={styles.backButton}>
          &lt; Back to Apartment Listings
        </button>
        <button className={styles.editButton}>EDIT</button>
        <div className={styles.mainCard}>
          <h1>Parc Sophia Unit #01-01</h1>
          <button className={styles.activeStatus}>ACTIVE</button>
        </div>
        <div className={styles.vacancyCard} data-testid="vacancyCard">
          <h2>VACANCY</h2>
          <span>
            {occupantsCount} <span className={styles.divider}>|</span>{" "}
            {capacity}
          </span>
        </div>
        <div className={styles.detailsCard} data-testid="detailsCard">
          <h2>DETAILS</h2>
        </div>
        <div className={styles.remarksCard} data-testid="remarksCard">
          <h2>REMARKS</h2>
        </div>
        <div className={styles.occupantsCard} data-testid="occupantsCard">
          <h2>OCCUPANTS</h2>
        </div>
        <div className={styles.leaseCard} data-testid="leaseCard">
          <h2>LEASE</h2>
        </div>
      </div>
    </div>
  );
};

export default ApartmentProfile2;
