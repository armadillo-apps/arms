import { useEffect, useState } from "react";
import { fetchApartmentById } from "../api/api";

// Todo: Test this hook
export const useApartmentData = apartmentId => {
  const [apartment, setApartment] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchApartment = async apartmentId => {
    setLoading(true);
    let result;
    try {
      result = await fetchApartmentById(apartmentId);
      setApartment(result);
      setLoading(false);
    } catch (e) {
      setError(true);
    }
  };

  useEffect(() => {
    setApartment(fetchApartment(apartmentId));
  }, [apartmentId]);

  return { apartment, loading, error };
};
