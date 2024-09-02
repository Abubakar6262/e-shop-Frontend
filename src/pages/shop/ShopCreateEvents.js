import React from 'react'
import DashboardHeader from '../../components/shop/Layout/DashboardHeader'
import DashboardSidebar from '../../components/shop/Layout/DashboardSidebar'
import CreateEvent from '../../components/shop/CreateEvent.js'
const ShopCreateEvents = () => {
    return (
        <div>
            <DashboardHeader />
            <div className='flex justify-between w-full'>
                <div className='w-[100px] 800px:w-[330px]'>
                    <DashboardSidebar active={6} />
                </div>
                <div className='w-full flex justify-center'>
                    <CreateEvent />
                </div>
            </div>
        </div>
    )
}

export default ShopCreateEvents