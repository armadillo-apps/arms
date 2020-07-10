import moment from "moment";
import { compareStrings } from "../../utils/utils";

export const sortApartmentsByStatus = apartments => {
  const activeApartments = apartments.filter(
    apartment => apartment.status === "active"
  );

  activeApartments.sort((firstApartment, secondApartment) => {
    let apartmentA = moment(new Date(firstApartment.leases[0].leaseEnd));
    let apartmentB = moment(new Date(secondApartment.leases[0].leaseEnd));
    return apartmentA - apartmentB;
  });

  const inactiveApartments = apartments.filter(
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

export const filterApartmentsByName = (apartments, name) =>
  apartments.filter(apartment => compareStrings(apartment.name, name));

export const filterApartmentsByDate = (apartments, startDate, endDate) => {
  return apartments?.filter(
    apartment =>
      moment(new Date(apartment.leases[0].leaseStart)).isSameOrBefore(
        moment.max(startDate, moment(new Date(0))),
        "day"
      ) &&
      moment(new Date(apartment.leases[0].leaseEnd)).isSameOrAfter(
        endDate,
        "day"
      )
  );
};
