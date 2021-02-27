import axios from "./axios";
import queryString from "query-string";
import { getToken } from "../utils/token";

export const axiosConfig = () => ({
  headers: { Authorization: getToken() }
});

export const authenticateUser = async () => {
  const response = await axios.get("/users/authenticate", axiosConfig());
  return response.data;
};

export const fetchApartments = async () => {
  const response = await axios.get("/apartments", axiosConfig());
  return response.data;
};

export const fetchApartmentById = async apartmentId => {
  const response = await axios.get(`/apartments/${apartmentId}`, axiosConfig());
  return response.data;
};

export const fetchOccupants = async () => {
  const response = await axios.get("/occupants", axiosConfig());
  return response.data;
};

export const fetchOccupantById = async occupantId => {
  const response = await axios.get(`/occupants/${occupantId}`, axiosConfig());
  return response.data;
};

export const fetchUsers = async () => {
  const response = await axios.get("/users", axiosConfig());
  return response.data;
};

export const getUserId = async email => {
  const userList = await fetchUsers();
  const user = userList.find(user => user.email === email);
  return user._id;
};

export const fetchStays = async queryParams => {
  const query = queryString.stringify(queryParams);
  const response = await axios.get(`/stays?${query}`, axiosConfig());
  return response.data;
};

export const getApartmentProfileHistory = async apartmentId => {
  const response = await axios.get(
    `/stays/apartmentProfileHistory/${apartmentId}`,
    axiosConfig()
  );
  return response.data;
};

export const createNewApartment = async input => {
  const response = await axios.post("/apartments", input, axiosConfig());
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
  const response = await axios.post("/occupants", requestBody, axiosConfig());
  return response.data;
};

export const createNewUser = async (name, email, password, role) => {
  const requestBody = {
    name,
    email,
    password,
    role
  };
  const response = await axios.post("/users/new", requestBody, axiosConfig());
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
  const response = await axios.post("/stays", requestBody, axiosConfig());
  return response.data;
};

export const loginUser = async (email, password) => {
  const loginDetails = { email, password };
  const login = await axios.post("/users/login", loginDetails, axiosConfig());
  return login.data;
};

export const logoutUser = async () => {
  const logout = await axios.post("/users/logout", {}, axiosConfig());
  return logout.data;
};

export const updateOccupant = async ({
  name,
  employeeId,
  gender,
  remarks,
  homeOffice,
  status,
  _id
}) => {
  const requestBody = {
    _id,
    name,
    employeeId,
    gender,
    remarks,
    homeOffice,
    status
  };

  const response = await axios.put(
    `/occupants/${_id}`,
    requestBody,
    axiosConfig()
  );
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
  leases,
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
    leases,
    landlord,
    remarks
  };

  const response = await axios.put(
    `/apartments/${apartmentId}`,
    requestBody,
    axiosConfig()
  );
  return response.data;
};

export const editUserRole = async (userId, role) => {
  const requestBody = {
    role
  };
  const response = await axios.patch(
    `/users/${userId}`,
    requestBody,
    axiosConfig()
  );
  return response.data;
};

export const updatePassword = async (userEmail, password, newPassword) => {
  const requestBody = { password, newPassword };

  const response = await axios.patch(
    `/users/password/${userEmail}`,
    requestBody,
    axiosConfig()
  );
  return response.data;
};

export const removeStay = async stayId => {
  const response = await axios.delete(`/stays/${stayId}`, axiosConfig());
  return response.data;
};

export const removeUser = async userId => {
  const response = await axios.delete(`/users/${userId}`, axiosConfig());
  return response.data;
};
