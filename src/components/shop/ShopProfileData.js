import React, { useState } from 'react'
import { ProductData } from '../../static/data';
import ProductCard from '../Route/ProductCard/ProductCard';
import { Link } from 'react-router-dom';
import styles from '../../styles/styles';

const ShopProfileData = ({ isOwner }) => {
    const [active, setActive] = useState(1);
    return (
        <div className='w-full'>
            <div className='flex w-full items-center  justify-between'>
                <div className='w-full flex'>
                    <div className='flex items-center '
                        onClick={() => setActive(1)}>
                        <h3 className={`text-[20px] font-[600] ${active === 1 ? 'text-red-500' : "#333"} cursor-pointer pr-[20px] `}>Shop Products</h3>
                    </div>
                    <div className='flex items-center '
                        onClick={() => setActive(2)}>
                        <h3 className={`text-[20px] font-[600] ${active === 2 ? 'text-red-500' : "#333"} cursor-pointer pr-[20px] `}>Running Events</h3>
                    </div>
                    <div className='flex items-center '
                        onClick={() => setActive(3)}>
                        <h3 className={`text-[20px] font-[600] ${active === 3 ? 'text-red-500' : "#333"} cursor-pointer pr-[20px] `}>Shop Reviews</h3>
                    </div>
                </div>
                <div>
                    {
                        isOwner && (
                            <div>
                                <Link to={"/dashboard"}>
                                    <div className={`${styles.button} !rounded-[4px]  !h-[42px]`}>
                                        <span className='text-white'>Go Dahboard</span>
                                    </div>
                                </Link>
                            </div>
                        )
                    }
                </div>
            </div>
            <br />
            <div className='grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0'>
                {
                    ProductData && ProductData.map((item, index) => {
                        return <ProductCard data={item} key={index} isShop={true} />
                    })
                }
            </div>
        </div>
    )
}

export default ShopProfileData