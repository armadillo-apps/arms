import api from '../api/api';

export const fetchApartments = async () => {
  const response = await api.get('/apartments');
  return response.data;
};

export const fetchOccupants = async () => {
  const response = await api.get('/occupants');
  return response.data;
};
