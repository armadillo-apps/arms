import api from "./api";

export const fetchApartments = async () => {
  const response = await api.get("/apartments");
  return response.data;
};

export const fetchOccupants = async () => {
  const response = await api.get("/occupants");
  return response.data;
};

export const createNewApartment = async input => {
  const response = await api.post("/apartments", input);
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
