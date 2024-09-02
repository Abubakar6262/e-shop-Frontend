import React, { useEffect, useState } from 'react'
import { ProductData } from '../../static/data'
import styles from '../../styles/styles'
import ProductCard from '../Route/ProductCard/ProductCard'

const SuggestedProduct = ({ data }) => {
    const [products, setProdcuts] = useState(null)
    useEffect(() => {
        const d = ProductData && ProductData.filter((i) => i.category === data.category)
        setProdcuts(d);
    }, [])

    return (
        <div>

            {
                data ? (
                    <div className={`${styles.section} p-4`}>
                        <h2 className={`${styles.heading} text-[25px] font-[500] border-b mb-0`}>
                            Related Product
                        </h2>
                        <div className='grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12'>
                            {
                                products && products.map((item, index) => {
                                    return <ProductCard data={item} key={index} />
                                })
                            }
                        </div>
                    </div>
                )
                    : null
            }
        </div>
    )
}

export default SuggestedProduct