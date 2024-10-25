import { useState } from 'react';

export const usePostData = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [data, setData] = useState(null);
    const [errorText, setErrorText] = useState(null);

    const postData = async (body) => {
        setIsLoading(true);
        setIsError(false);
        setData(null);
        setErrorText(null);

        try {
            const response = await fetch('http://192.168.1.4/state', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            });

            console.log('12345_response', response);

            if (!response.ok) {
                setErrorText(response.statusText);
                throw new Error('Network response was not ok');
            }

            const result = await response.text();
            setData(result);  // Зберігаємо відповідь у стані
        } catch (error) {
            console.error('Error---->:', error);
            setIsError(true);
            // setErrorText('Cannot reach server. Check connection and try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoading, isError, errorText, result: data, postData };
};