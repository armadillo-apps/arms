import React from 'react';
import './ApartmentDetail.css';
import extractDate from '../../utils/ExtractDate';

const ApartmentDetail = ({ capacity, name, leases, _id, history }) => {
  const [firstLeases] = leases;
  const { leaseStart, leaseEnd, monthlyRent } = firstLeases;
  return (
    <tr
      className="apartmentDetails"
      onClick={() => {
        history.push(`/apartments/${_id}`);
      }}
    >
      <td className={capacity === 0 ? 'inverted' : 'positive'}>{capacity}</td>
      <td className="apartmentDetails__td">{name}</td>
      <td className="apartmentDetails__td">{extractDate(leaseStart)}</td>
      <td className="apartmentDetails__td">{extractDate(leaseEnd)}</td>
      <td className="apartmentDetails__td">{monthlyRent}</td>
    </tr>
  );
};

export default ApartmentDetail;
