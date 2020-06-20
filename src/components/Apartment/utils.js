import moment from "moment";

export const sortApartmentsByStatus = apartmentList => {
  const activeApartments = apartmentList.filter(
    apartment => apartment.status === "active"
  );

  activeApartments.sort((firstApartment, secondApartment) => {
    let apartmentA = moment(new Date(firstApartment.leases[0].leaseEnd));
    let apartmentB = moment(new Date(secondApartment.leases[0].leaseEnd));
    return apartmentA - apartmentB;
  });

  const inactiveApartments = apartmentList.filter(
    apartment => apartment.status === "inactive"
  );
  return activeApartments.concat(inactiveApartments);
};
