import axios from "./axios";
import queryString from "query-string";

export const fetchApartments = async () => {
  const response = await axios.get("/apartments", { withCredentials: true });
  return response.data;
};

export const fetchOccupants = async () => {
  const response = await axios.get("/occupants", { withCredentials: true });
  return response.data;
};

export const fetchUsers = async () => {
  const response = await axios.get("/users", { withCredentials: true });
  return response.data;
};

export const getApartmentProfileHistory = async apartmentId => {
  const response = await axios.get(
    `/stays/apartmentProfileHistory/${apartmentId}`,
    { withCredentials: true }
  );
  return response.data;
};

export const createNewApartment = async input => {
  const response = await axios.post("/apartments", input, {
    withCredentials: true
  });
  return response.data;
};

export const createNewOccupant = async (
  name,
  employeeId,
  gender,
  remarks,
  homeOffice,
  status
) => {
  const requestBody = {
    name,
    employeeId,
    gender,
    remarks,
    homeOffice,
    status
  };
  const response = await axios.post("/occupants", requestBody, {
    withCredentials: true
  });
  return response.data;
};

export const createNewUser = async (name, email, password, role) => {
  const requestBody = {
    name,
    email,
    password,
    role
  };
  const response = await axios.post("/users/new", requestBody, {
    withCredentials: true
  });
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
  const response = await axios.post("/stays", requestBody, {
    withCredentials: true
  });
  return response.data;
};

export const removeStay = async stayId => {
  const response = await axios.delete(`/stays/${stayId}`, {
    withCredentials: true
  });
  return response.data;
};

export const removeUser = async userId => {
  const response = await axios.delete(`/users/${userId}`, {
    withCredentials: true
  });
  return response.data;
};

export const updateOccupant = async (
  occupantId,
  name,
  employeeId,
  gender,
  remarks,
  homeOffice,
  status,
  _id
) => {
  const requestBody = {
    _id,
    name,
    employeeId,
    gender,
    remarks,
    homeOffice,
    status
  };

  const response = await axios.put(`/occupants/${occupantId}`, requestBody, {
    withCredentials: true
  });
  return response.data;
};

export const updateApartment = async (
  apartmentId,
  name,
  address,
  bedrooms,
  capacity,
  country,
  status,
  landlord,
  remarks
) => {
  const requestBody = {
    name,
    address,
    bedrooms,
    capacity,
    country,
    status,
    landlord,
    remarks
  };

  const response = await axios.put(`/apartments/${apartmentId}`, requestBody, {
    withCredentials: true
  });
  return response.data;
};

export const fetchStays = async queryParams => {
  const query = queryString.stringify(queryParams);
  const response = await axios.get(`/stays?${query}`, {
    withCredentials: true
  });
  return response.data;
};

export const loginUser = async (email, password) => {
  const loginDetails = { email, password };
  const login = await axios.post("/users/login", loginDetails, {
    withCredentials: true
  });
  return login.data;
};

export const logoutUser = async () => {
  const logout = await axios.post(
    "/users/logout",
    {},
    { withCredentials: true }
  );
  return logout.data;
};
