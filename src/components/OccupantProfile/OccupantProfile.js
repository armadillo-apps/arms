import React, { useState, useEffect } from "react";

import { useUserContext } from "../../context/UserContext";
import { fetchStays } from "../../api/api";
import { formatDate } from "../../utils/date";
import EditOccupantModal from "../Modal/EditOccupantModal";
import EditOccupantForm from "../EditOccupantForm/EditOccupantForm";
import ConfirmationMessage from "../ConfirmationMessage/ConfirmationMessage";
import { sgdFormatter, thbFormatter } from "../../utils/formatMoney";
import styles from "./OccupantProfile.module.css";

const OccupantProfile = ({
  occupants,
  history,
  match,
  onSubmit,
  onChange,
  openModal,
  isModalOpen,
  closeModal,
  modalStates
}) => {
  const [stays, setStays] = useState([]);
  const { state: user } = useUserContext();

  useEffect(() => {
    (async () => {
      try {
        const { occupantId } = match.params;
        const data = await fetchStays({ occupantId });
        setStays(data);
      } catch (err) {
        return err;
      }
    })();
  }, [match.params]);

  if (!occupants || occupants.length < 1) {
    return <h1>Loading...</h1>;
  } else {
    const occupantId = match.params.occupantId;
    const occupant = occupants.find(occupant => {
      return occupant._id === occupantId;
    });

    if (!occupant) {
      return (
        <div className={styles.container}>
          <div className={styles.profile} />
          <h1 className={styles.header1}>Could not find occupant</h1>
        </div>
      );
    }

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

    return (
      <div className={styles.container}>
        <div className={styles.profile}>
          <div className={styles.backButton} onClick={() => history.goBack()}>
            &lt; Back to Occupant Listings
          </div>
          <div className={styles.header1Container}>
            <h1 className={styles.header1}>{occupant.name}</h1>
            <span className={styles[occupant.status]}>{occupant.status}</span>
            {user.role !== "guest" && (
              <button
                id="editOccupantModal"
                className={styles.editButton}
                onClick={() => {
                  openModal("editOccupantModal", occupant);
                }}
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
          <h1 className={styles.header2}>Stay History</h1>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Apartment Name </th>
                <th>Check In </th>
                <th>Check Out</th>
                <th>Monthly Rental</th>
              </tr>
            </thead>
            <tbody>
              {stays &&
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
          <h1 className={styles.header2}>Remarks</h1>
          <p className={styles.remarks}>{occupant.remarks}</p>
        </div>
        <EditOccupantModal
          isModalOpen={isModalOpen}
          closeModal={() => closeModal("editOccupantModal")}
        >
          {modalStates.success ? (
            <div>
              <ConfirmationMessage
                success={modalStates.success}
                message={modalStates.message}
              />
              <button onClick={() => closeModal("editOccupantModal")}>
                Close
              </button>
            </div>
          ) : (
            <EditOccupantForm
              onSubmit={onSubmit}
              onChange={onChange}
              occupant={occupant}
              {...modalStates}
              closeModal={closeModal}
            />
          )}
        </EditOccupantModal>
      </div>
    );
  }
};

export default OccupantProfile;
