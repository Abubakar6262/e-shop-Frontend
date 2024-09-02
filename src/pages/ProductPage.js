import React, { useEffect, useState } from 'react'
import Header from '../components/Layout/Header'
import styles from '../styles/styles'
import { useSearchParams } from 'react-router-dom'
import { ProductData } from '../static/data'
import ProductCard from '../components/Route/ProductCard/ProductCard'
import Footer from '../components/Layout/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProdcuts } from '../redux/actions/product'

const ProductPage = () => {
    const [searchParams] = useSearchParams();
    // const categoryData = searchParams.get("category");
    // const [data, setData] = useState([]);
    const { products } = useSelector((state) => state.products);
    // setData(products)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllProdcuts())
    }, [dispatch])

    useEffect(() => {
        // if (categoryData === null) {
        //     const d = ProductData && ProductData.sort((a, b) => a.total_sell - b.total_sell);
        //     setData(d)
        // } else {
        //     const d = ProductData && ProductData.filter((item) => item.category === categoryData);
        //     setData(d);
        // }
        // window.scrollTo(0,0)
    }, [])

    return (
        <div>
            <Header activeHeading={3} />
            <br />
            <br />
            <div className={`${styles.section}`}>
                <div className="grid grid-cols-1 gape [20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl: gap-[30px] mb-12">
                    {
                        products && products.map((item, index) => <ProductCard data={item} key={index} />)
                    }
                </div>
                <div>
                    {
                        products && products.length === 0
                            ? <h1 className='text-center w-full pb-[110px] text-[25px] font-bold'>No Product Found!</h1>
                            : null
                    }
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ProductPage