import axios from "./axios";

export const fetchApartments = async () => {
  const response = await axios.get("/apartments");
  return response.data;
};

export const fetchOccupants = async () => {
  const response = await axios.get("/occupants");
  return response.data;
};

export const getApartmentProfileHistory = async apartmentId => {
  const response = await axios.get(
    `/stays/apartmentProfileHistory/${apartmentId}`
  );
  return response.data;
};

export const createNewApartment = async input => {
  const response = await axios.post("/apartments", input);
  return response.data;
};

export const createNewOccupant = async (
  name,
  employeeId,
  gender,
  remarks,
  country,
  status
) => {
  const requestBody = {
    name,
    employeeId,
    gender,
    remarks,
    country,
    status
  };
  const response = await axios.post("/occupants", requestBody);
  return response.data;
};

export const createNewStay = async (
  occupantId,
  apartmentId,
  checkInDate,
  checkOutDate
) => {
  const requestBody = {
    occupantId: occupantId,
    apartmentId: apartmentId,
    checkInDate: checkInDate,
    checkOutDate: checkOutDate
  };
  try {
    const response = await axios.post("/stays", requestBody);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const deleteStay = async stayId => {
  try {
    const response = await axios.delete(`/stays/${stayId}`);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const updateOccupant = async (
  occupantId,
  name,
  employeeId,
  gender,
  remarks,
  country,
  status
) => {
  const requestBody = {
    name,
    employeeId,
    gender,
    remarks,
    country,
    status
  };

  const response = await axios.put(`/occupants/${occupantId}`, requestBody);
  return response.data;
};
