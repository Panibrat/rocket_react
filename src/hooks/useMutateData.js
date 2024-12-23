import { useCallback, useState } from 'react';
import { BASE_URL } from '../constants/urls';

export const useMutateData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState(null);
  const [data, setData] = useState(null);

  const mutate = useCallback(async (url, body) => {
    setIsLoading(true);
    setIsError(false);
    setErrorText(null);

    try {
      const response = await fetch(`${BASE_URL}${url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      const result = await response.text();

      if (!response.ok) {
        const resultData = JSON.parse(result);
        const errorMessage = resultData?.error || response.statusText;
        setErrorText(errorMessage);
        throw new Error('Network response was not ok');
      }

      setData(result);
    } catch (error) {
      console.error('Error---->:', error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { mutate, isLoading, isError, errorText, data };
};
