import React from "react";

import SearchBar2 from "../SearchBar/SearchBar2";
import ApartmentProfileCard from "./ApartmentProfileCard";
import styles from "./ApartmentProfile2.module.css";

const ApartmentProfile2 = () => {
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
        </div>
        <ApartmentProfileCard
          className={styles.detailsCard}
          id="detailsCard"
          heading="DETAILS"
        />
        <ApartmentProfileCard
          className={styles.remarksCard}
          id="remarksCard"
          heading="REMARKS"
        />
        <ApartmentProfileCard
          className={styles.occupantsCard}
          id="occupantsCard"
          heading="OCCUPANTS"
        />
        <ApartmentProfileCard
          className={styles.leaseCard}
          id="leaseCard"
          heading="LEASE"
        />
      </div>
    </div>
  );
};

export default ApartmentProfile2;
