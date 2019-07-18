import api from "../api/api";

export const fetchApartments = async () => {
  const response = await api.get("/apartments");
  return response.data;
};

export const fetchOccupants = async () => {
  const response = await api.get("/occupants");
  return response.data;
};

export const addApartment = async input => {
  const inputForBackend = {
    name: input.apartmentFormName,
    address: input.apartmentFormAddress,
    bedrooms: input.apartmentFormBedrooms,
    capacity: input.apartmentFormCapacity,
    leases: [
      {
        leaseStart: input.apartmentFormLeaseStart,
        leaseEnd: input.apartmentFormLeaseEnd,
        monthlyRent: input.apartmentFormRent
      }
    ],
    landlord: {
      name: input.apartmentFormLandlordName,
      accountNumber: input.apartmentFormLandlordAccount,
      mobile: input.apartmentFormLandlordMobile,
      email: input.apartmentFormLandlordEmail
    }
  };
  const response = await api.post("/apartments", inputForBackend);
  return response.data;
};

export const createNewOccupant = async (name, employeeId, remarks) => {
  const requestBody = {
    name: name,
    employeeId: employeeId,
    remarks: remarks
  };
  const response = await api.post("/occupants", requestBody);
  return response;
};
