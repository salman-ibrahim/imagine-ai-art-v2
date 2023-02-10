import { useState, useEffect } from 'react';

const useCountdown = ({endDate}) => {
    const [countdown, setCountdown] = useState('');

    useEffect(() => {
        const intervalId = setInterval(() => {
            const currentDate = new Date();
            const distance = endDate - currentDate;

            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setCountdown(`${hours}:${minutes}:${seconds}`);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [endDate]);

    return countdown;
};

export default useCountdown;
