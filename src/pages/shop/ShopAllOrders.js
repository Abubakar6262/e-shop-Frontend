import React from 'react'
import DashboardSidebar from '../../components/shop/Layout/DashboardSidebar'
import DashboardHeader from '../../components/shop/Layout/DashboardHeader'
import AllOrders from '../../components/shop/AllOrders.js'

const ShopAllOrders = () => {
    return (
        <div>
            <DashboardHeader />
            <div className='flex justify-between w-full'>
                <div className='w-[100px] 800px:w-[330px]'>
                    <DashboardSidebar active={2} />
                </div>
                <div className='w-full flex justify-center'>
                    <AllOrders />
                </div>
            </div>
        </div>
    )
}

export default ShopAllOrders