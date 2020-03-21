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
        <div className={styles.detailsCardContainer} data-testid="detailsCard">
          <h2>DETAILS</h2>
          <div className={styles.detailsCard}>
            <h3>ADDRESS :</h3>
            <p>431 Scarlett Pine,431 Scarlett Pine,431 Scarlett Pine</p>
            <h3>BEDROOM(S) :</h3>
            <p>2</p>
            <h3>COUNTRY :</h3>
            <p>Thailand</p>
            <h3>LANDLORD NAME :</h3>
            <p>Cornell</p>
            <h3>LANDLORD A/C NO. :</h3>
            <p>01598651</p>
          </div>
        </div>
        <div className={styles.remarksCard} data-testid="remarksCard">
          <h2>REMARKS</h2>
          <p>
            Has an amazing garden. Awesomeeee Lorem, ipsum dolor sit amet
            consectetur adipisicing elit. Laborum expedita sequi, non deserunt
            rerum ullam enim repudiandae inventore explicabo. Commodi, deleniti.
            Vitae optio odit atque delectus quibusdam, quo soluta explicabo!
          </p>
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
