import {useEffect, useState} from "react";
import {FETCH_INTERVAL} from "../constants/times";
import {BASE_URL, GET_DATA_URL} from "../constants/urls";

export const useData = () => {
    const [data, setData] = useState({thrust: 0});
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const fetchData = () => {
        setIsLoading(true);
        fetch(`${BASE_URL}${GET_DATA_URL}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => {
                console.error('Error fetching data:', error);
                setError(error);
            })
            .finally(() => setIsLoading(false));
    };
    useEffect(() => {
        const interval = setInterval(fetchData, FETCH_INTERVAL);

        return () => clearInterval(interval);
    }, []);

    return {data, error, isLoading}
};
