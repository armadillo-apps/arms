import { useCallback, useEffect, useState } from "react";
import { fetchApartmentById } from "../api/api";

export const useApartmentData = apartmentId => {
  const [apartment, setApartment] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchApartment = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await fetchApartmentById(apartmentId);
      setApartment(result);
    } catch (e) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }, [apartmentId]);

  useEffect(() => {
    fetchApartment();
  }, [fetchApartment]);

  return { apartment, isLoading, error, fetchApartment };
};
