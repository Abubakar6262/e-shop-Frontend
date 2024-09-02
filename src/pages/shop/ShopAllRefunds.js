import React from 'react'
import DashboardHeader from '../../components/shop/Layout/DashboardHeader'
import DashboardSidebar from '../../components/shop/Layout/DashboardSidebar'
import AllRefundOrders from '../../components/shop/AllRefundOrders.js'

const ShopAllRefunds = () => {
    return (
        <div>
            <DashboardHeader />
            <div className='flex justify-between w-full'>
                <div className='w-[100px] 800px:w-[330px]'>
                    <DashboardSidebar active={10} />
                </div>
                <div className='w-full flex justify-center'>
                    <AllRefundOrders />
                </div>
            </div>
        </div>)
}

export default ShopAllRefunds