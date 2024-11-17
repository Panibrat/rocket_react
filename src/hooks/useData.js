import { useEffect, useState } from 'react';
import axios from 'axios';
import { FETCH_INTERVAL } from '../constants/times';
import { BASE_URL, GET_DATA_URL } from '../constants/urls';

export const useData = () => {
  const [data, setData] = useState({ thrust: 0, state: 'R' });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}${GET_DATA_URL}`, {
        headers: { 'Content-Type': 'application/json' },
        // Ігнорування SSL
        validateStatus: () => true,
        transformRequest: [
          (data, headers) => {
            headers['X-Ignore-SSL'] = 'true'; // Додаткові хедери за потреби
            return data;
          }
        ]
      });
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(fetchData, FETCH_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return { data, error, isLoading };
};
