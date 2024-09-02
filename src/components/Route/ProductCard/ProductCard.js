import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from '../../../styles/styles';
import ProductDetailsCart from "../ProductDetailsCart/ProductDetailsCart.js"
import { AiFillHeart, AiFillStar, AiOutlineEye, AiOutlineHeart, AiOutlineShoppingCart, AiOutlineStar } from 'react-icons/ai';
import { BASE_URL } from '../../../server.js';
import Rating from '../../products/Rating.js';

const ProductCard = ({ data }) => {
    // console.log("data in product card ", data);
    const [click, setClick] = useState(false);
    const [opens, setOpens] = useState(false);
    const d = data.name;
    const product_name = d.replace(/\s+/g, "-")


    const handleFavouritItem = async () => {
        // console.log("click value is ",click);
        if (click === true) {
            console.log('Remove from favourit');
            let existingProduct = JSON.parse(localStorage.getItem("favProducts"));

            // Check if the array exists
            if (existingProduct) {
                // Filter out the product with the matching id
                existingProduct = existingProduct.filter(product => product._id !== data?._id);

                // Save the updated array back to localStorage
                localStorage.setItem("favProducts", JSON.stringify(existingProduct));
            }
            setClick(!click);
            window.notify("Product remove from Favourit List", "success")
        } else {
            console.log("Add in favourit");
            let favProducts = JSON.parse(localStorage.getItem("favProducts"));

            console.log("favProducts are => ", favProducts);


            // If no array exists, create an empty one
            if (!favProducts) {
                favProducts = [];
            }

            const checkExisting = await favProducts.filter((product) => product._id === data._id)
            if (checkExisting.length !== 0) {
                // return alert("")
                window.notify("Product already exist", "info")

            } else {
                // Push the new object into the array
                favProducts.push(data);

                // Save the updated array back to localStorage
                localStorage.setItem("favProducts", JSON.stringify(favProducts));
                setClick(!click);
                window.notify("Product Added Favourit List", "success")
            }
        }
    }

    // console.log("This is dat in product card ", data.url);
    return (
        <>
            <div className={`w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer`}>
                <div className="flex justify-end">
                </div>
                <Link to={`/product/${product_name}`}>
                    {data?.images && data.images.length > 0 ? (
                        <img src={`${BASE_URL}/${data.images[0]}`} alt={data?.name || 'Product Image'} className='w-full h-[170px] object-contain' />
                    ) : (
                        <img src="" alt="Default Product" className='w-full h-[170px] object-contain' />
                    )}
                </Link>
                <Link to={"/"}>
                    <h5 className={`${styles.shop_name}`}>{data.shop.name}</h5>
                </Link>
                <Link to={`/product/${product_name}`}>
                    <h4 className='pb-3 font-[20px]'>
                        {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
                    </h4>
                    <div className='flex'>
                        <Rating rating={data.ratings} />
                    </div>
                    <div className='py-2 flex items-center justify-between'>
                        <div className='flex'>
                            <h5 className={`${styles.productDiscountPrice}`}>
                                {data.discountPrice !== 0 ? data.discountPrice : null}$
                            </h5>
                            <h4 className={`${styles.price}`}>
                                {data.originalPrice ? data.originalPrice + " $" : null}
                            </h4>
                        </div>
                        <span className='font-[400] text-[17px] text-[#68d284]'>{data?.sold_out} Sold</span>
                    </div>
                </Link>

                {/* Side Options */}
                <div>
                    {
                        click ? (
                            <AiFillHeart
                                size={22}
                                className='cursor-pointer absolute right-4 top-5'
                                onClick={handleFavouritItem}
                                color={click ? "red" : "#333"}
                                title='Remove from wishlist'
                            />
                        )
                            : (
                                <AiOutlineHeart
                                    size={22}
                                    className='cursor-pointer absolute right-4 top-5'
                                    onClick={handleFavouritItem}
                                    color={click ? "red" : "#333"}
                                    title='Add to wishlist'
                                />
                            )
                    }
                    <AiOutlineEye
                        size={22}
                        className='cursor-pointer absolute right-4 top-14'
                        onClick={() => setOpens(!opens)}
                        color="#333"
                        title='Quick View'
                    />
                    <AiOutlineShoppingCart
                        size={22}
                        className='cursor-pointer absolute right-4 top-24'
                        onClick={() => setOpens(!opens)}
                        color="#444"
                        title='Add to cart'
                    />
                    {
                        opens
                            ? <ProductDetailsCart setOpens={setOpens} data={data} />
                            : null
                    }
                </div>

            </div>
        </>
    )
}

export default ProductCard