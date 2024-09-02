import React, { useEffect, useState } from 'react'

const CountDown = ({ event }) => {
    // console.log("Single Event in countDown ", event);

    // const start_date = event?.start_Date;
    // const targetDate = event?.finish_Date;
    // const calculateTimeLeft = () => {
    //     const difference = targetDate - start_date;
    //     let timeLeft = {};

    //     if (difference > 0) {
    //         timeLeft = {
    //             days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    //             hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    //             minutes: Math.floor((difference / 1000 / 60) % 60),
    //             seconds: Math.floor((difference / 1000) % 60),
    //         };
    //     } else {
    //         timeLeft = { expired: true };
    //     }

    //     return timeLeft;
    // };

    const startDate = new Date(event.start_Date).getTime();
    const targetDate = new Date(event.finish_Date).getTime();

    const calculateTimeLeft = () => {
        const currentTime = new Date().getTime();
        const difference = targetDate - currentTime;
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        } else {
            timeLeft = { expired: true };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const timerComponents = [];

    if (timeLeft.expired) {
        timerComponents.push(<span key="expired">Time's Up</span>);
    } else {
        Object.keys(timeLeft).forEach((interval) => {
            timerComponents.push(
                <span key={interval} className="mx-1 text-xl font-bold">
                    {timeLeft[interval]} {interval}{' '}
                </span>
            );
        });
    }

    return (
        <>

            <div className="flex gap-6 bg-white py-6 text-[#2e76a0]">
                <div className='font-bold '>Start Date: <span>{event?.start_Date.slice(0, 10)}</span></div>
                <div className='font-bold text-red-600'>End Date: <span>{event?.finish_Date.slice(0, 10)}</span></div>
            </div>
            <div className="flex bg-white py-6 text-[#2e76a0]">
                {timerComponents.length ? timerComponents : <span className='text-red-500 font-bold'>Time's Up!</span>}
            </div>
        </>
    );
};


export default CountDown