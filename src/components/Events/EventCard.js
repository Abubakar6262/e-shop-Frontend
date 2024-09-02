import React, { useEffect } from 'react'
import styles from '../../styles/styles'
import CountDown from './CountDown.js'
import { useDispatch, useSelector } from 'react-redux';
import { getAllEvents } from '../../redux/actions/event.js';
import { BASE_URL } from '../../server.js';

const EventCard = ({ active }) => {

    const { events } = useSelector((state) => state.events);
    const { seller } = useSelector((state) => state.seller);

    console.log("seller ",seller);
    

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllEvents());
    }, [dispatch,seller?._id]);

    console.log("These events from db ", events);


    return (
        <>
            {
                events && events.map((event) => {
                    return <div className={`w-full block bg-white rounded-lg ${active ? "unset" : "mb-12"} lg:flex p-2`}>
                        <div className='w-full lg:w-[50%] m-auto'>
                            <img src={BASE_URL + '/' + event?.images[0]} alt="" />
                        </div>
                        <div className='w-full lg:[50%] flex flex-col justify-center'>
                            <h2 className={`${styles.productTitle}`}>{event?.name}</h2>
                            <p>{event?.description}</p>
                            <div className='flex py-2 justify-between'>
                                <div className='flex'>
                                    <h5 className='font-[500] text-[18px] text-[#d55b45] pr-3 line-through' >
                                        {event?.originalPrice}$
                                    </h5>
                                    <h5 className='font-bold text-[25px] text-[#333] font-Roboto '>
                                        {event?.discountPrice}$
                                    </h5>
                                </div>

                                <span className='pr-3 font-[400] text-[17px] text-[#44a55e] font-Roboto '>
                                    {event?.sold_out} Sold
                                </span>
                            </div>
                            <CountDown event = {event} />
                            <div className='flex items-center gap-4'>
                                <div className={`${styles.button} bg-[#000] mt-4 rounded-[4px] h-11 m-2`}>
                                    <span className='text-white flex  items-center'>
                                        See Details
                                    </span>
                                </div>
                                <div className={`${styles.button} bg-[#000] mt-4 rounded-[4px] h-11 mb-2`}>
                                    <span className='text-white flex  items-center'>
                                        Buy Now
                                    </span>
                                </div>

                            </div>
                        </div>
                    </div>
                })
            }

        </>
    )
}

export default EventCard