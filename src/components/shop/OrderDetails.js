import React, { useEffect, useState } from 'react'
import styles from '../../styles/styles'
import { BsFillBagFill } from 'react-icons/bs'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrderSeller } from '../../redux/actions/order'
import { BASE_URL } from '../../server'
import axios from 'axios'

const OrderDetails = () => {
    const { orders } = useSelector((state) => state.orders);
    const { seller } = useSelector((state) => state.seller);
    const dispatch = useDispatch();
    const [status, setStatus] = useState("");
    const { id } = useParams()
    useEffect(() => {
        dispatch(getAllOrderSeller(seller._id))
    }, [dispatch])


    const data = orders && orders.find((item) => item._id === id)


    const handleOrderUpdate = async () => {
        axios.put(`${BASE_URL}/api/v1/order/update-order-status/${id}`, { status }, { withCredentials: true })
            .then((res) => {
                // console.log("response form update order status ", res);
                window.notify('Order status updated successfully', 'success')
            })
            .catch((err) => {
                console.log("error at update order status ", err);

                window.notify("not Updated ", "error");
            })
        // console.log("status update functionality goes here");


    }

    const handleRefundOrder = () => {
        axios.put(`${BASE_URL}/api/v1/order/order-refund-success/${id}`, { status }, { withCredentials: true })
            .then((res) => {
                window.notify(res?.data?.message, "success");
                dispatch(getAllOrderSeller(seller._id));
            })
            .catch((err) => {
                console.log("error at update refund order ", err);

                window.notify(err?.response?.data?.message, "error");
            })
    }



    return (
        <div className={`py-4 min-h-screen ${styles.section}`}>
            <div className='w-full flex items-center justify-between'>
                <div className='flex items-center'>
                    <BsFillBagFill size={30} color='crimson' />
                    <h1 className='pl-2 text-[25px]'>Order Details</h1>
                </div>
                <Link to={`/dashboard-orders`}>
                    <div className={`${styles.button} !bg-[#fce1e6] !rounded-[4px] text-[#e94560] font-[600] !h-[45px] text-[18px] `}>
                        Order List
                    </div>
                </Link>
            </div>

            <div className='w-full flex items-center justify-between pt-6'>
                <h5 className='text-[#00000084]'>Order ID: <span>{data?._id?.slice(0, 8)}</span></h5>
                <h5 className='text-[#00000084]'>Placed On: <span>{data?.createAt?.slice(0, 10)}</span></h5>
            </div>

            {/* Order Items are */}
            <br />
            <br />
            {
                data && data.cart.map((item, index) => {
                    return <div className='w-full flex items-start mb-5'>
                        <img src={`${BASE_URL}/${item.images[0]}`} alt="" className='w-[80px] h-[80px]' />
                        <div className='w-full'>
                            <h5 className='pl-3 text-[20px] '>{item.name}</h5>
                            <h5 className='pl-3 text-[20px] text-[#00000091]'>US${item.discountPrice} * {item.qty}</h5>
                        </div>
                    </div>
                })
            }
            <div className='border-t w-full text-right'>
                <h5 className='pt-3 text-[18px]'>
                    Total Price: <strong>US${data?.totalPrice}</strong>
                </h5>
            </div>
            <br />
            <br />
            <div className='w-full 800px:flex items-center '>
                <div className='w-full 800px:w-[60%]'>
                    <h4 className='pt-3 text-[20px] font-[600]'> Shipping Address:</h4>
                    <h4 className='pt-3 text-[20px]'>{data?.shippingAddress.address1 + "," + data?.shippingAddress.address1}</h4>
                    <h4 className='text-[20px]'> {data?.shippingAddress.country}</h4>
                    <h4 className='text-[20px]'> {data?.shippingAddress.city}</h4>
                    <h4 className='text-[20px]'> {data?.user.phoneNumber}</h4>

                </div>
                <div className='w-full 800px:w-[40%] '>
                    <h4 className='pt-3 text-[20px]'>Payment Info</h4>
                    <h4>Status: <span className='font-[600] text-[#4834cd]'>{data?.paymentInfo.status ? data?.paymentInfo.status : "Not Paid"}</span></h4>
                </div>
            </div>
            <br />
            <br />
            <h4 className='pt-3 text-[20px] font-[600]'>Order Status:</h4>

            {
                data?.status !== "Processing refund" && data?.status !== "Refund Success" && (

                    <select value={status} onChange={e => setStatus(e.target.value)}
                        className='w-[200px] mt-2 border h-[35px] rounded-[5px]'
                    >
                        {
                            [
                                "Processing",
                                "Transferred to delivery partner",
                                "Shipping",
                                "Received",
                                "On The way",
                                "Delivered",
                            ]
                                .slice(
                                    [
                                        "Processing",
                                        "Transferred to delivery partner",
                                        "Shipping",
                                        "Received",
                                        "On The way",
                                        "Delivered",
                                    ].indexOf(data?.status)
                                ).map((option, index) => {
                                    return <option value={option} key={index}>
                                        {option}
                                    </option>
                                })}
                    </select>
                )
            }

            <select value={status} onChange={e => setStatus(e.target.value)}
                className='w-[200px] mt-2 border h-[35px] rounded-[5px]'
            >
                {
                    [
                        "Processing refund",
                        "Refund Success"
                    ]
                        .slice(
                            [
                                "Processing refund",
                                "Refund Success"
                            ].indexOf(data?.status)
                        ).map((option, index) => {
                            return <option value={option} key={index}>
                                {option}
                            </option>
                        })}
            </select>


            <div className={`${styles.button} mt-5 !bg-[#FCE1E6] !rounded-[4px] text-[#E94560] font-[600] !h-[45px] text-[18px]`} onClick={data?.status !== "Processing refund" ? handleOrderUpdate : handleRefundOrder}>
                Update Status
            </div>
        </div >
    )
}

export default OrderDetails