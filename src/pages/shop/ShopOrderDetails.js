import React from 'react'
import DashboardHeader from '../../components/shop/Layout/DashboardHeader'
import Footer from '../../components/Layout/Footer'
import OrderDetails from '../../components/shop/OrderDetails.js'
const ShopOrderDetails = () => {
    return (
        <div>
            <DashboardHeader />
            <OrderDetails />
            <Footer />
        </div>
    )
}

export default ShopOrderDetails