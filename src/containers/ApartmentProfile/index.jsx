import React from "react";

import SearchBar2 from "../../components/SearchBar/SearchBar2";
import styles from "./index.module.scss";
import DetailsCard from "./DetailsCard";
import { useParams } from "react-router-dom";
import Header from "./Header";
import { fetchApartmentById } from "../../api/api";
import { useFetch } from "../../hooks/useFetch";

const ApartmentProfile = () => {
  const { apartmentId } = useParams();
  const { data: apartment } = useFetch(fetchApartmentById, apartmentId);

  return (
    <div>
      <SearchBar2 placeholder="Search here" />
      <div className={styles.mainContainer}>
        <Header apartment={apartment} dataTestId="header" />
        <div className={styles.profileContainer}>
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
    </div>
  );
};

export default ApartmentProfile;
