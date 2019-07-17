import React from 'react';

const attributes = [
  { name: 'Name', type: 'text' },
  { name: 'Address', type: 'text' },
  { name: 'Bedrooms', type: 'number' },
  { name: 'Capacity', type: 'number' },
  { name: 'LeaseStart', type: 'text' },
  { name: 'LeaseEnd', type: 'text' },
  { name: 'Rent', type: 'number' },
  { name: 'LandlordName', type: 'text' },
  { name: 'LandlordAccount', type: 'text' },
  { name: 'LandlordMobile', type: 'text' },
  { name: 'LandlordEmail', type: 'text' }
];

const NewApartmentForm = ({ onChange, onClick }) => {
  const formAttributes = attributes.map((attribute, index) => {
    const { name, type } = attribute;
    const regex = /(?=[A-Z]+[^A-Z]?)/;

    return (
      <div key={index} className={`apartmentForm__${name.toLowerCase()}`}>
        <label
          htmlFor={`apartmentForm${name}`}
          className="apartmentForm__label"
        >
          {name.split(regex).join(' ')}
        </label>
        <input
          type={type}
          id={`apartmentForm${name}`}
          className="apartmentForm__input"
          onChange={onChange}
        />
      </div>
    );
  });

  return (
    <div className="occupantFormContainer">
      <div className="occupantForm">{formAttributes}</div>
      <button className="occupantForm__createButton" onClick={onClick}>
        Create
      </button>
    </div>
  );
};

export default NewApartmentForm;
