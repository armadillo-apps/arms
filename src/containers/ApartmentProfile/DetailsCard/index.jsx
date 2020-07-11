import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { calculateVacancy } from "../../../components/Apartment/utils";
import { isEmpty } from "../../../utils/utils";
import { ReactComponent as BedroomIcon } from "../../../assets/bedroom.svg";
import { ReactComponent as CountryIcon } from "../../../assets/country.svg";
import { ReactComponent as AddressIcon } from "../../../assets/address.svg";

const DetailsCard = ({ apartment, dataTestId }) => {
  const [vacancy, setVacancy] = useState(0);

  useEffect(() => {
    if (!isEmpty(apartment)) {
      setVacancy(calculateVacancy(apartment, apartment.stays));
    }
  }, [apartment]);

  return (
    <div className={styles.detailsCardContainer} data-testid={dataTestId}>
      <h2>DETAILS</h2>
      <div className={styles.detailsCard}>
        <h3 data-testid="vacancy">{vacancy} Room(s) available</h3>
        <div className={styles.detailsGroupContainer}>
          <div className={styles.detailsGroupWithIcons}>
            <div>
              <BedroomIcon />
              {apartment?.bedrooms} Bedrooms
            </div>
            <div>
              <CountryIcon />
              {apartment?.country}
            </div>
            <div>
              <AddressIcon />
              {apartment?.address}
            </div>
          </div>
          <div>
            <p>Landlord Name : {apartment?.landlord?.name}</p>
            <p>Landlord A/C No. : {apartment?.landlord?.accountNumber}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsCard;
