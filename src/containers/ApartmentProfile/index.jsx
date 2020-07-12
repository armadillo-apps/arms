import React from "react";

import SearchBar2 from "../../components/SearchBar/SearchBar2";
import styles from "./index.module.scss";
import DetailsCard from "./DetailsCard";
import { useParams } from "react-router-dom";
import Header from "./Header";
import { fetchApartmentById, getApartmentProfileHistory } from "../../api/api";
import { useFetch } from "../../hooks/useFetch";
import OccupantsCard from "./OccupantsCard";
import LeaseCard from "./LeaseCard";

const ApartmentProfile = () => {
  const { apartmentId } = useParams();
  const { data: apartment } = useFetch(fetchApartmentById, apartmentId);
  const { data: stayHistory } = useFetch(
    getApartmentProfileHistory,
    apartmentId
  );

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
          <OccupantsCard stayHistory={stayHistory} dataTestId="occupantsCard" />
          <LeaseCard leases={apartment.leases} dataTestId="leaseCard" />
        </div>
      </div>
    </div>
  );
};

export default ApartmentProfile;
