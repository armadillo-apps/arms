import axios from "./axios";

export const fetchApartments = async () => {
  const response = await axios.get("/apartments");
  return response.data;
};

export const fetchOccupants = async () => {
  const response = await axios.get("/occupants");
  return response.data;
};

export const createNewApartment = async input => {
  const response = await axios.post("/apartments", input);
  return response.data;
};

export const createNewOccupant = async (name, employeeId, remarks) => {
  const requestBody = {
    name: name,
    employeeId: employeeId,
    remarks: remarks
  };
  const response = await axios.post("/occupants", requestBody);
  return response.data;
};
