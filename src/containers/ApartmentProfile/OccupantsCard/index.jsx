import React from "react";
import styles from "./index.module.scss";
import { useFetch } from "../../../hooks/useFetch";
import { getApartmentProfileHistory } from "../../../api/api";
import { useParams } from "react-router-dom";
import { formatDate, isEmpty } from "../../../utils/utils";

const OccupantsCard = ({ dataTestId }) => {
  const { apartmentId } = useParams();
  const { data: occupants } = useFetch(getApartmentProfileHistory, apartmentId);

  return (
    <div className={styles.occupantsCard} data-testid={dataTestId}>
      <h2>OCCUPANTS</h2>
      <table>
        <thead>
          <tr>
            <th>NAME</th>
            <th>CHECK-IN</th>
            <th>CHECK-OUT</th>
            <th>REMARKS</th>
          </tr>
        </thead>
        <tbody>
          {isEmpty(occupants) ? (
            <tr>
              <td>No occupants yet!</td>
            </tr>
          ) : (
            occupants.map(occupant => {
              return (
                <tr key={occupant._id}>
                  <td>{occupant.occupantName}</td>
                  <td>{formatDate(occupant.checkInDate)}</td>
                  <td>{formatDate(occupant.checkOutDate)}</td>
                  <td>{occupant.occupantRemarks}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OccupantsCard;
