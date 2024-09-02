import React from 'react'
import DashboardHeader from '../../components/shop/Layout/DashboardHeader'
import DashboardSidebar from '../../components/shop/Layout/DashboardSidebar'
import AllProducts from '../../components/shop/AllProducts.js'

const ShopAllProducts = () => {
    return (
        <div>
            <DashboardHeader />
            <div className='flex justify-between w-full'>
                <div className='w-[100px] 800px:w-[330px]'>
                    <DashboardSidebar active={3} />
                </div>
                <div className='w-full flex justify-center'>
                    <AllProducts />
                </div>
            </div>
        </div>
    )
}

export default ShopAllProducts