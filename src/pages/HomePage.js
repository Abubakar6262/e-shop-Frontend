import React from 'react'
import Header from '../components/Layout/Header.js'
import Hero from '../components/Route/Hero/Hero.js'
import Categories from '../components/Route/Categories/Categories.js'
import BestDeals from '../components/Route/BestDeals/BestDeals.js'
import FeaturedProduct from '../components/Route/FeaturedProduct/FeaturedProduct.js'
import Events from '../components/Events/Events.js'
import Soponsered from '../components/Soponsered.js'
import Footer from '../components/Layout/Footer.js'

const HomePage = () => {
    return (
        <div>
            <Header activeHeading={1} />
            <Hero />
            <Categories/>
            <BestDeals/>
            <Events/>
            <FeaturedProduct/>
            <Soponsered/>
            <Footer/>
            {/* <button className='bg-gray-500 text-sm text-white px-2 py-1' onClick={() => window.notify("Test notification", "success")}>Notification Test</button> */}
        </div>
    )
}

export default HomePage