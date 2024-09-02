import React from 'react'
import DashboardHeader from '../../components/shop/Layout/DashboardHeader.js'
import DashboardSidebar from '../../components/shop/Layout/DashboardSidebar.js'
import DashboardHero from '../../components/shop/DashboardHero.js'

const ShopDashboardPAge = () => {
    return (
        <div>
            <DashboardHeader />
            <div className='flex items-start justify-between w-full'>
                <div className='w-[100px] 800px:w-[330px]'>
                    <DashboardSidebar active={1} />
                </div>
                <DashboardHero />
            </div>
        </div>
    )
}

export default ShopDashboardPAge