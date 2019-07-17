import api from "../api/api";

export const fetchApartments = async () => {
  const response = await api.get("/apartments");
  return response.data;
};
