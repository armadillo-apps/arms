import React from "react";
import styles from "./DetailsCard.module.css";

const apartmentDetails = [
  { property: "address", key: "address" },
  { property: "bedroom(s)", key: "bedrooms" },
  { property: "country", key: "country" },
  { property: "landlord name", key: "landlord", subKey: "name" },
  { property: "landlord a/c no.", key: "landlord", subKey: "accountNumber" }
];

const DetailsCard = ({ apartment, dataTestId }) => {
  return (
    <div className={styles.detailsCardContainer} data-testid={dataTestId}>
      <h2>DETAILS</h2>
      <div className={styles.detailsCard}>
        {apartmentDetails.map(({ property, key, subKey }) => {
          const description = subKey
            ? apartment[key]?.[subKey]
            : apartment[key];
          return (
            <div className={styles.detailsHeading} key={`${key}${subKey}`}>
              <div>{property} :</div>
              <div>{description}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DetailsCard;
