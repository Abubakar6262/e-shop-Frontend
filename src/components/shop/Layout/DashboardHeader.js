import React from 'react'
import { AiOutlineGift } from 'react-icons/ai';
import { MdOutlineLocalOffer } from 'react-icons/md';
import { FiPackage, FiShoppingBag } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BiMessageSquareDetail } from 'react-icons/bi';
import { BASE_URL } from '../../../server';

const DashboardHeader = () => {
    const { isLoading, isSellerAuthenticated, seller } = useSelector((state) => state.seller);
    return (
        <div className='w-full h-[80px] bg-white shadow sticky top-0  left-0 z-30 flex items-center justify-between px-4'>
            <div>
                <Link to={'/dashboard'}>
                    <img src="https://shopo.quomodothemes.website/assets/images/logo.svg" alt="" />
                </Link>
            </div>
            <div className='flex items-center'>
                <div className='flex items-center mr-4'>
                    <Link to={'/dashboard/cupons'} className='hidden 800px:block'> <AiOutlineGift size={30} color='#555' className='mx-5 cursor-pointer' /></Link>
                    <Link to={'/dashboard-events'} className='hidden 800px:block'> <MdOutlineLocalOffer size={30} color='#555' className='mx-5 cursor-pointer' /></Link>
                    <Link to={'/dashboard-products'} className='hidden 800px:block'> <FiShoppingBag size={30} color='#555' className='mx-5 cursor-pointer' /></Link>
                    <Link to={'/dashboard-orders'} className='hidden 800px:block'> <FiPackage size={30} color='#555' className='mx-5 cursor-pointer' /></Link>
                    <Link to={'/dashboard-messages'} className='hidden 800px:block'> <BiMessageSquareDetail size={30} color='#555' className='mx-5 cursor-pointer' /></Link>
                    <Link to={`/seller/${seller._id}`} >
                        <img src={`${BASE_URL}/${seller.avatar}`} className={`w-[35px] h-[35px] rounded-full bg-contain`} alt="" />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default DashboardHeader