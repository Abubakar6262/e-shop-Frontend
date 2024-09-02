import React, { useEffect, useState } from 'react'
import { BsFillBagFill } from 'react-icons/bs'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import styles from '../styles/styles'
import { getAllOrderUser } from '../redux/actions/order'
import { BASE_URL } from '../server'
import { RxCross1 } from 'react-icons/rx'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'
import axios from 'axios'

const UserOrderDetails = () => {
    const { orders } = useSelector((state) => state.orders);
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [rating, setRating] = useState(1)
    const [comment, setComment] = useState("")

    const { id } = useParams()
    useEffect(() => {
        dispatch(getAllOrderUser(user._id))
    }, [dispatch])


    const data = orders && orders.find((item) => item._id === id)


    const handleReview = async (e) => {
        axios.put(`${BASE_URL}/api/v1/product/create-new-review`, {
            user, rating, comment,
            productId: selectedItem._id,
            orderId: id,
        }, { withCredentials: true })
            .then((res) => {
                console.log("This is res from create review ", res);
                window.notify(res?.data?.message, "success")
                setRating(1);
                setComment("");
                setOpen(false);
                window.location.reload(true);
            })
            .catch((err) => {
                console.log("error at creating review ", err);
                window.notify("error at creating review", "error")

            })
    }


    const handleRefund = () => {
        axios.put(`${BASE_URL}/api/v1/order/order-refund/${id}`,{
            status:"Processing refund"
        })
            .then((res) => {
                window.notify(res?.data?.message, "success")
            })
            .catch((err) => {
                console.log("Error at refund ", err);
                window.notify(err?.response?.data?.message, "error")
            })
    }

    return (
        <div className={`py-4 min-h-screen ${styles.section}`}>
            <div className='w-full flex items-center justify-between'>
                <div className='flex items-center'>
                    <BsFillBagFill size={30} color='crimson' />
                    <h1 className='pl-2 text-[25px]'>Order Details</h1>
                </div>
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
                        {
                            item.isReviewed ? null : (
                                <div className={`${styles.button} text-[#fff] !h-[40px] !rounded-[5px] !bg-lime-700`}
                                    onClick={() => setOpen(true) || setSelectedItem(item)}
                                >
                                    <h5>Write a review</h5>
                                </div>
                            )
                        }
                    </div>
                })
            }

            {/* Review popup code  */}
            {open && (
                <div className='w-full fixed top-0 left-0 h-screen bg-[#0005] z-50 flex items-center justify-center'>
                    <div className='w-full 800px:w-[50%] h-[90vh] bg-[#fff] shadow rounded-md p-2 overflow-y-scroll overflow-x-hidden'>
                        <div className='w-full flex justify-end p-3'>
                            <RxCross1 size={30} onClick={() => setOpen(false)} className='cursor-pointer' />
                        </div>
                        <h2 className='text-[30px] font-[500] font-Poppins text-center'>
                            Give a Review
                        </h2>
                        <br />
                        <div className='w-full flex '>
                            <img src={`${BASE_URL}/${selectedItem.images[0]}`} alt="" className='w-[80px] h-[80px]' />
                            <div>
                                <div className='pl-3 text-[20px]'>
                                    {selectedItem?.name}
                                </div>
                                <h4 className='pl-3 text-[20px]'>
                                    US${selectedItem?.discountPrice} * {selectedItem?.qty}
                                </h4>
                            </div>
                        </div>
                        <br />
                        <br />
                        {/* Ratting goes here */}
                        <h5 className='w-full pl-3 text-[20px] font-[500]'>
                            Give a Rating <span className='text-red-500'>*</span>
                        </h5>
                        <div className='flex w-full ml-2 pt-1'>
                            {[1, 2, 3, 4, 5].map((i) => rating >= i ? (
                                <AiFillStar key={1}
                                    className="mr-1 cursor-pointer"
                                    color='rgb(246,186,0)'
                                    size={25}
                                    onClick={() => setRating(i)}
                                />
                            ) : (
                                <AiOutlineStar key={1}
                                    className="mr-1 cursor-pointer"
                                    color='rgb(246,186,0)'
                                    size={25}
                                    onClick={() => setRating(i)}
                                />
                            ))}
                        </div>

                        <div className='w-full ml-3'>
                            <label className='block text-[25px] font-[500]'>
                                Write a Comment
                                <span className='font-[400] text-[16px] text-[#00000052] ml-1'>(Optional)</span>
                            </label>
                            <textarea name="comment" value={comment} onChange={(e) => setComment(e.target.value)} cols={20} rows={5} id="" placeholder='How was your product? Write your expression about it!'
                                className='mt-2 w-[95%] border p-2 outline-none'
                            ></textarea>
                        </div>
                        <div className={`${styles.button} text-white text-[20px] ml-3 !h-[40px] !rounded-[5px]`} onClick={rating > 1 ? handleReview : null}>
                            submit
                        </div>
                    </div>
                </div>
            )

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
                    <h4>Status: <span className='font-[600] text-[#4834cd]'>{data?.paymentInfo?.status ? data?.paymentInfo?.status : "Not Paid"}</span></h4>
                    <br />
                    {data?.status === "Delivered" && (
                        <div className={`${styles.button} font-[500] text-white !rounded-[5px] !bg-red-500 `} onClick={handleRefund}>
                            Refund now
                        </div>
                    )}
                </div>
            </div>
            <br />
            <div>
                <Link to={"/"}>
                    <div className={`${styles.button} text-[#fff] !rounded-[5px] `}>
                        Send Message
                    </div>
                </Link>
            </div>
            <br />
            <br />
        </div>
    )
}

export default UserOrderDetails