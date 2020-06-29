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

export const calculateVacancy = (apartment, staysForApartment) => {
  const today = new Date();

  const currentStays = staysForApartment
    .filter(stay =>
      moment(today).isSameOrBefore(new Date(stay.checkOutDate), "day")
    )
    .filter(stay =>
      moment(today).isSameOrAfter(new Date(stay.checkInDate), "day")
    ).length;

  return apartment.capacity - currentStays;
};
