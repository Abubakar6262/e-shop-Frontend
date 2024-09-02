import React, { useEffect, useState } from 'react'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import ProductDetails from '../components/products/ProductDetails.js'
import { useParams } from 'react-router-dom'
import SuggestedProduct from "../components/products/SuggestedProduct.js"
import { useSelector } from 'react-redux'


const ProductDetailsPage = () => {
    const { name } = useParams();
    const { products } = useSelector((state) => state.products);
    
    const [data, setData] = useState(null);
    const productName = name.replace(/-/g, " ");
    // console.log("Name of product in product details page =>", name);
    // console.log("Name of product in product details page =>", productName);
    

    useEffect(() => {
        const d = products.find(item => item.name === productName);
        setData(d);
    }, [])
    return (
        <div>
            <Header />
            <ProductDetails data={data} />
            {
                data && <SuggestedProduct data={data} />
            }
            <Footer />
        </div>
    )
}

export default ProductDetailsPage