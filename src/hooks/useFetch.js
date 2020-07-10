import { useCallback, useEffect, useState } from "react";

export const useFetch = (api, param = "") => {
  const [data, setData] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setError] = useState(false);

  const fetchData = useCallback(async () => {
    setIsFetching(true);
    try {
      const result = await api(param);
      setData(result);
    } catch (e) {
      setError(true);
    } finally {
      setIsFetching(false);
    }
  }, [api, param]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isFetching, isError, fetchData };
};
