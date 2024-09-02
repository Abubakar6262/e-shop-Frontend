import React from 'react'
import DashboardHeader from '../../components/shop/Layout/DashboardHeader'
import DashboardSidebar from '../../components/shop/Layout/DashboardSidebar'
import CreateProduct from '../../components/shop/CreateProduct.js'

const ShopCreateProduct = () => {
    return (
        <div>
            <DashboardHeader />
            <div className='flex items-center justify-between w-full'>
                <div className='w-[100px] 800px:w-[330px]'>
                    <DashboardSidebar active={4} />
                </div>
                <div className='w-full flex justify-center'>
                    <CreateProduct />
                </div>
            </div>
        </div>
    )
}

export default ShopCreateProduct