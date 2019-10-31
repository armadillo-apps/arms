import axios from "./axios";
import queryString from "query-string";

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

export const createStay = async (
  occupantId,
  apartmentId,
  checkInDate,
  checkOutDate,
  leaseId
) => {
  const requestBody = {
    occupantId: occupantId,
    apartmentId: apartmentId,
    checkInDate: checkInDate,
    checkOutDate: checkOutDate,
    leaseId: leaseId
  };
  const response = await axios.post("/stays", requestBody);
  return response.data;
};

export const removeStay = async stayId => {
  const response = await axios.delete(`/stays/${stayId}`);
  return response.data;
};

export const updateOccupant = async (
  occupantId,
  name,
  employeeId,
  gender,
  remarks,
  country,
  status,
  _id
) => {
  const requestBody = {
    _id,
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

export const updateApartment = async (
  apartmentId,
  name,
  address,
  bedrooms,
  capacity,
  country,
  landlord,
  remarks
) => {
  const requestBody = {
    name,
    address,
    bedrooms,
    capacity,
    country,
    landlord,
    remarks
  };

  const response = await axios.put(`/apartments/${apartmentId}`, requestBody);
  return response.data;
};

export const fetchStays = async queryParams => {
  const query = queryString.stringify(queryParams);
  const response = await axios.get(`/stays?${query}`);
  return response.data;
};

export const loginUser = async (email, password) => {
  const loginDetails = { email, password };
  try {
    const login = await axios.post("/users/login", loginDetails);
    return login.data;
  } catch (err) {
    throw err;
  }
};
