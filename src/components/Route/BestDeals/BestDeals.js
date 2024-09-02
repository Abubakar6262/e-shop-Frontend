import React, { useEffect, useState } from 'react'
import { ProductData } from '../../../static/data';
import styles from '../../../styles/styles';
import ProductCard from "../ProductCard/ProductCard.js"
import { useDispatch, useSelector } from 'react-redux';
import { getAllProdcuts } from '../../../redux/actions/product.js';
const BestDeals = () => {
    const [data, setData] = useState([]);
    const { products } = useSelector((state) => state.products);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllProdcuts())
        const d = products
        // const firstFiveData = d.slice(0, 5);
        // setData(firstFiveData)
        setData(d)
    }, [])

    // console.log(data);
    console.log("In best deal offer ", products);

    return (
        <div className={`${styles.section}`}>
            <div className={`${styles.heading}`}>
                <h1>Best Deals</h1>
            </div>
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap[30px] mb-12 border-0" >
                {
                    data && data.map((item, index) => {
                        return <ProductCard data={item} key={index} />
                    })
                }
            </div>
        </div>
    )
}

export default BestDeals