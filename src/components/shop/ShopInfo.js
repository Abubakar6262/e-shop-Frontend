import React from 'react'
import { BASE_URL } from '../../server';
import { useSelector } from 'react-redux';
import styles from '../../styles/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ShopInfo = ({ isOwner }) => {
    const navigate = useNavigate();
    const { seller } = useSelector((state) => state.seller);
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const handleLogout = () => {
        axios.get(`${BASE_URL}/api/v1/shop/logout`, { withCredentials: true })
            .then((res) => {
                window.notify(res.data.message, "success")
                navigate("/");
                window.location.reload(true);
            })
            .catch((err) => {
                console.log("Error at logout Seller =>", err);
            })
    }
    return (
        <div className='bg-white'>
            <div className='w-full py-5'>
                <div className='w-full flex justify-center items-center'>
                    <img src={`${BASE_URL}/${seller.avatar}`} className={`w-[150px] h-[150px] rounded-full bg-contain`} alt="" />
                </div>
                <h3 className='text-center py-2 text-[20px] font-bold'>{capitalizeFirstLetter(seller.name)}</h3>
                <p className='text-[10px] text-[#000000a6] p-[10px] flex items-center'>
                    {!seller.description ? "Owsome Seller of site." : seller.description}
                </p>
            </div>
            <div className='p-3'>
                <h5 className='font-[600]'>Address</h5>
                <h4 className='text-[#000000a6]'>{seller.address}</h4>
            </div>
            <div className='p-3'>
                <h5 className='font-[600]'>Phone Number</h5>
                <h4 className='text-[#000000a6]'>{seller.phoneNumber}</h4>
            </div>
            <div className='p-3'>
                <h5 className='font-[600]'>Total Products</h5>
                <h4 className='text-[#000000a6]'>10</h4>
            </div>
            <div className='p-3'>
                <h5 className='font-[600]'>Shop Rating</h5>
                <h4 className='text-[#000000a6]'>4/5</h4>
            </div>
            <div className='p-3'>
                <h5 className='font-[600]'>Joined On</h5>
                <h4 className='text-[#000000a6]'>{seller.createdAt.slice(0, 10)}</h4>
            </div>
            {
                isOwner && (
                    <div className='py-3 px-4'>
                        <div className={`${styles.button} !w-full !h-[42px] !rounded-[5px] `}>
                            <span className='text-white'>Edit Shop</span>
                        </div>
                        <div className={`${styles.button} !w-full !h-[42px] !rounded-[5px] !bg-red-500  `} onClick={handleLogout}>
                            <span className='text-white'>Log Out</span>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default ShopInfo