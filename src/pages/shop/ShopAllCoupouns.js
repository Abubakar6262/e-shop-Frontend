import React from 'react'
import DashboardHeader from '../../components/shop/Layout/DashboardHeader'
import DashboardSidebar from '../../components/shop/Layout/DashboardSidebar'
import AllCoupouns from '../../components/shop/AllCoupouns.js'

const ShopAllCoupouns = () => {
    return (
        <div>
            <DashboardHeader />
            <div className='flex justify-between w-full'>
                <div className='w-[100px] 800px:w-[330px]'>
                    <DashboardSidebar active={9} />
                </div>
                <div className='w-full flex justify-center'>
                    <AllCoupouns />
                </div>
            </div>
        </div>
    )
}

export default ShopAllCoupouns