import React, { useState } from 'react'
import { RxCross1 } from 'react-icons/rx'
import styles from '../../../styles/styles';
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage, AiOutlineShoppingCart } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../../redux/actions/cart';
import { BASE_URL } from '../../../server';

const ProductDetailsCart = ({ setOpens, data }) => {
    const { cart } = useSelector((state) => state.cart)
    const dispatch = useDispatch();

    const [count, setCount] = useState(1);
    const [click, setClick] = useState(false);
    // const [select, setSelect] = useState(false);

    const handleDecrement = () => {
        if (count > 1) {
            setCount(count - 1)
        }
    }
    const handleIncrement = () => {

        setCount(count + 1)

    }

    const handleMessageSubmit = () => {
        console.log("Handle message to submit");
    }

    const handleAddToCart = (id) => {

        console.log("cart data ", cart);
    
        // Use `find` to check if the item exists in the cart
        const isItemExists = cart && cart.find((i) => i._id === id);
        console.log("item check in product details", isItemExists);
    
        if (isItemExists) {
            window.notify("Item already is in cart", "error");
        } else {
            const cartData = { ...data, qty: count };
            dispatch(addToCart(cartData));
            console.log("cart data ", cartData);
    
            window.notify("Product is added to cart", "success");
        }
    };
    

    return (
        <div className='bg-white'>
            {
                data ? (
                    <div className='fixed w-full  h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center'>
                        <div className='w-[90%] 800px:w-[60%] h-[90vh] overflow-y-scroll 800px:h-[75vh] bg-white rounded-sm shadow-sm relative p-4'>
                            <RxCross1
                                size={30}
                                className={"absolute right-3 top-3 z-50"}
                                onClick={() => setOpens(false)}
                            />
                            <div className="block w-full 800px:flex">
                                <div className='w-full 800px:w-[50%]'>
                                    <img src={`${BASE_URL}/${data.images[0]}`} alt="" />
                                    <div className='flex items-center'>
                                        <img src={data.shop.avatar} className='w-[50px] h-[50px] rounded-full mr-2' alt="" />
                                        <div>
                                            <h3 className={`${styles.shop_name}`}>
                                                {data.shop.name}
                                            </h3>
                                            <h5 className='pb-3 text-[15px]'>
                                                ({data.shop.ratings ? data.shop.ratings : 0}) Ratings
                                            </h5>
                                        </div>
                                    </div>
                                    <div className={`${styles.button} bg-[#000] mt-4 rounded-[4px] h-11`} onClick={handleMessageSubmit}>
                                        <span className='text-white flex  items-center'>
                                            Send Message <AiOutlineMessage className='ml-1' />
                                        </span>
                                    </div>

                                    <h5 className=' text-[16px] text-[red]  mt-5'>
                                        ({data.sold_out}) Sold Out
                                    </h5>
                                </div>

                                <div className='w-full 800px:w-[50%] pt-5 pl-[5px] pr-[5px]' >
                                    <h1 className={`${styles.productTitle} text-[20px]`}>
                                        {data.name}
                                    </h1>
                                    <p>{data.description}</p>
                                    <div className='flex pt-3'>
                                        <h4 className={`${styles.productDiscountPrice}`}>
                                            {data.discount_price}
                                        </h4>
                                        <h3 className={`${styles.price}`}>{data.price ? data.price + "$" : null}</h3>
                                    </div>

                                    <div className='flex items-center mt-12 justify-between pr-3'>
                                        <div>
                                            <button className='bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out'
                                                onClick={handleDecrement}
                                            >
                                                -
                                            </button>
                                            <span className='bg-gray-200 text-gray-500 font-medium px-4 py-[10px]'>
                                                {count}
                                            </span>
                                            <button
                                                className='bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-r px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out'
                                                onClick={handleIncrement}
                                            >
                                                +
                                            </button>
                                        </div>
                                        <div>
                                            {click ? (
                                                <AiFillHeart
                                                    size={30}
                                                    className='cursor-pointer'
                                                    onClick={() => setClick(!click)}
                                                    color={click ? "red" : "#333"}
                                                    title='Remove from wishlist'
                                                />
                                            )
                                                : (
                                                    <AiOutlineHeart
                                                        size={30}
                                                        className='cursor-pointer'
                                                        onClick={() => setClick(!click)}
                                                        color={click ? "red" : "#333"}
                                                        title='Add to wishlist'
                                                    />
                                                )
                                            }
                                        </div>

                                    </div>

                                    <div className={`${styles.button} mt-6 rounded-[4px] h-11 flex items-center`} onClick={() => handleAddToCart(data?._id)}>
                                        <span className=' text-white flex items-center'>Add To Cart <AiOutlineShoppingCart className='ml-1' /></span>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                )
                    : null
            }
        </div >
    )
}

export default ProductDetailsCart