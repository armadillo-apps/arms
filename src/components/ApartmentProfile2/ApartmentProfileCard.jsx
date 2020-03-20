import PropTypes from "prop-types";
import React from "react";

const ApartmentProfileCard = ({ id, heading, className }) => {
  return (
    <div className={className} data-testid={id}>
      <h2>{heading}</h2>
    </div>
  );
};

ApartmentProfileCard.propTypes = {
  heading: PropTypes.string,
  id: PropTypes.string.isRequired
};

export default ApartmentProfileCard;
