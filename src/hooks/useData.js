import { useEffect, useState } from 'react';
import { FETCH_INTERVAL } from '../constants/times';
import { BASE_URL, GET_DATA_URL } from '../constants/urls';

export const useData = () => {
  const [data, setData] = useState({ thrust: 0, state: 'S', firstLoad: false, rssi: 0 });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [responseTime, setResponseTime] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    const startTime = Date.now();

    try {
      const response = await fetch(`${BASE_URL}${GET_DATA_URL}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();

      setData({ ...data, firstLoad: true });
      setResponseTime(Date.now() - startTime);
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

  return { data, error, isLoading, responseTime };
};
