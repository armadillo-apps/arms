import React from 'react';
import './ApartmentDetail.css';

const ApartmentDetail = ({ capacity, name, leases, _id, history }) => {
  return (
    <tr className="apartmentDetails" onClick={() => {
      history.push(`/apartments/${_id}`)
    }} >
      <td className={capacity === 0 ? 'inverted' : 'positive'}>{capacity}</td>
      <td className="apartmentDetails__td">{name}</td>
      <td className="apartmentDetails__td">{leases[0].leaseStart}</td>
      <td className="apartmentDetails__td">{leases[0].leaseEnd}</td>
      <td className="apartmentDetails__td">{leases[0].monthlyRent}</td>
    </tr>
  );
};

export default ApartmentDetail;
