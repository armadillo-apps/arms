import React, { useMemo, useState } from "react";

import { useUserContext } from "../../context/UserContext";
import { fetchOccupantById, fetchStays } from "../../api/api";
import EditOccupantModal from "../../components/Modal/EditOccupantModal";
import EditOccupantForm from "./EditOccupantForm";
import { sgdFormatter, thbFormatter } from "../../utils/formatMoney";
import styles from "./index.module.scss";
import { useHistory, useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { formatDate, isEmpty } from "../../utils/utils";

const OccupantProfile = () => {
  const history = useHistory();
  const { occupantId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { state: user } = useUserContext();
  const { data: occupant, isError, isFetching, fetchData } = useFetch(
    fetchOccupantById,
    occupantId
  );
  const memoisedParam = useMemo(() => {
    return { occupantId };
  }, [occupantId]);
  const { data: stays } = useFetch(fetchStays, memoisedParam);

  const rentFromLease = (stayLeaseId, apartmentLeaseId) => {
    try {
      const foundLease = apartmentLeaseId.find(lease => {
        return stayLeaseId === lease._id;
      });

      if (foundLease) {
        if (foundLease.currency === "SGD") {
          return sgdFormatter.format(foundLease.monthlyRent);
        } else if (foundLease.currency === "THB") {
          return thbFormatter.format(foundLease.monthlyRent);
        }
      }
      throw new Error("Lease not allocated");
    } catch (err) {
      return err.message;
    }
  };

  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);

  if (isFetching) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return (
      <div className={styles.container}>
        <div className={styles.profile} />
        <h1 className={styles.heading1}>Could not find occupant</h1>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <div className={styles.backButton} onClick={() => history.goBack()}>
          &lt; Back to Occupant Listings
        </div>
        <div className={styles.heading1Container}>
          <h1 className={styles.heading1}>{occupant.name}</h1>
          <span className={styles[occupant.status]}>{occupant.status}</span>
          {user.role !== "guest" && (
            <button
              id="editOccupantModal"
              className={styles.editButton}
              onClick={openModal}
            >
              Edit
            </button>
          )}
        </div>
        <div className={styles.details}>
          <h2>{occupant.employeeId}</h2>
          <h2>Gender: {occupant.gender}</h2>
          <h2>Home Office: {occupant.homeOffice}</h2>
        </div>
        <h1 className={styles.heading2}>Stay History</h1>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Apartment Name</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Monthly Rental</th>
            </tr>
          </thead>
          <tbody>
            {!isEmpty(stays) &&
              stays.map(stay => {
                return (
                  <tr key={stay._id}>
                    <td>{stay.apartment.name}</td>
                    <td>{formatDate(stay.checkInDate)}</td>
                    <td>{formatDate(stay.checkOutDate)}</td>
                    <td>
                      {rentFromLease(stay.leaseId, stay.apartment.leases)}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <h1 className={styles.heading2}>Remarks</h1>
        <p className={styles.remarks}>{occupant.remarks}</p>
      </div>
      <EditOccupantModal isModalOpen={isModalOpen} closeModal={closeModal}>
        <EditOccupantForm
          fetchData={fetchData}
          occupant={occupant}
          closeModal={closeModal}
        />
      </EditOccupantModal>
    </div>
  );
};

export default OccupantProfile;
