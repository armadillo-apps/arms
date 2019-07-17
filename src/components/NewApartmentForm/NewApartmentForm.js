import React from 'react';
import './NewApartmentForm.css';

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

const NewApartmentForm = ({ onChange, onSubmit }) => {
  const formAttributes = attributes.map((attribute, index) => {
    const { name, type } = attribute;
    const regex = /(?=[A-Z][a-z])/;

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
    <div className="apartmentFormContainer">
      <h1 className="apartmentForm__heading">Create New Apartment</h1>
      <div className="apartmentFor">{formAttributes}</div>
      <button className="apartmentForm__createButton" onClick={onSubmit}>
        Create
      </button>
    </div>
  );
};

export default NewApartmentForm;
