import React from 'react'
import DashboardHeader from '../../components/shop/Layout/DashboardHeader'
import DashboardSidebar from '../../components/shop/Layout/DashboardSidebar'
import AllEvents from '../../components/shop/AllEvents'

const ShopAllEvents = () => {
    return (
        <div>
            <DashboardHeader />
            <div className='flex justify-between w-full'>
                <div className='w-[100px] 800px:w-[330px]'>
                    <DashboardSidebar active={5} />
                </div>
                <div className='w-full flex justify-center'>
                    <AllEvents/>
                </div>
            </div>
        </div>
    )
}

export default ShopAllEvents