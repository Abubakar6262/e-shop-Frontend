import React, { useEffect, useState } from 'react'
import Header from '../components/Layout/Header'
import styles from '../styles/styles'
import ProductCard from '../components/Route/ProductCard/ProductCard'
import Footer from '../components/Layout/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProdcuts } from '../redux/actions/product'

const BestSellingPage = () => {
    const { products } = useSelector((state) => state.products);
    const dispatch = useDispatch()
    const [data, setData] = useState([]);

    // console.log("Product data in best selling page ",products);
    

    useEffect(() => {
        dispatch(getAllProdcuts());
        setData(products)
        // const d = products && products.sort((a, b) => (b.sold_out - a.sold_out));
        // setData(d)

        // window.scrollTo(0,0)
    }, [dispatch])

    return (
        <div>
            <Header activeHeading={2} />
            <br />
            <br />
            <div className={`${styles.section}`}>
                <div className="grid grid-cols-1 gape [20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl: gap-[30px] mb-12">
                    {
                        data && data.map((item, index) => <ProductCard data={item} key={index} />)
                    }
                </div>
            </div>
            <Footer />
        </div>
    )
}


export default BestSellingPage