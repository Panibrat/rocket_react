import {useEffect, useState} from "react";

const FETCH_INTERVAL = 1000;

export const useData = () => {
    const [data, setData] = useState({value: 0});
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const fetchData = () => {
        setIsLoading(true);
        // fetch('https://my.backend/api/data', {
        fetch('http://192.168.1.4/data', {
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
