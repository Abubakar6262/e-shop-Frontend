import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrderUser } from '../../redux/actions/order';
import { useParams } from 'react-router-dom';

const TrackOrder = () => {
    const { user } = useSelector(state => state.user)
    const { orders } = useSelector(state => state.orders)
    const dispatch = useDispatch();

    const { id } = useParams()

    useEffect(() => {
        dispatch(getAllOrderUser(user?._id))
    }, [])

    const data = orders && orders.find((item) => item._id === id)


    let message;

    switch (data.status) {
        case "Processing":
            message = <h1 className='text-[20px]'>Your Order is Processing...</h1>;
            break;
        case "Transferred to delivery partner":
            message = <h1 className='text-[20px]'>Your Order is transferred to delivery partner...</h1>;
            break;
        case "Shipping":
            message = <h1 className='text-[20px]'>Your Order is Shipped...</h1>;
            break;
        case "Received":
            message = <h1 className='text-[20px]'>Your Order is Received...</h1>;
            break;
        case "On The way":
            message = <h1 className='text-[20px]'>Your Order is On The way...</h1>;
            break;
        case "Delivered":
            message = <h1 className='text-[20px]'>Your Order Delivered successfully...</h1>;
            break;
        case "Processing refund":
            message = <h1 className='text-[20px]'>Soon! You Will receive your's funds...</h1>;
            break;
        case "Refund Success":
            message = <h1 className='text-[20px]'>Your Refund is success!</h1>;
            break;

        default:
            message = null;
            break;
    }



    return (
        <div className='w-full h-[80vh] flex justify-center items-center '>
            {message}
        </div>
    )
}

export default TrackOrder