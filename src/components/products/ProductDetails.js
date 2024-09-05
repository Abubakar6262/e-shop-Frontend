import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from '../../styles/styles'
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage, AiOutlineShoppingCart } from 'react-icons/ai'
import { BASE_URL } from '../../server'
import Rating from './Rating'
import { useSelector } from 'react-redux'


const ProductDetails = ({ data }) => {
    const [count, setCount] = useState(1)
    const [click, setClick] = useState(false)
    const [select, setSelect] = useState(0)
    const navigate = useNavigate();
    // console.log(data);

    const handleDecrement = () => {
        if (count > 1) {
            setCount(count - 1)
        }
    }
    const handleIncrement = () => {

        setCount(count + 1)

    }
    const handleMessageSubmit = () => {
        alert("Your message is submitted")
    }





    return (
        <div className='bg-white  pb-16'>
            {
                data ? (
                    <div className={`${styles.section} w-[90%] 800px:w-[80%]`}>
                        <div className='w-full py-5'>
                            <div className='block w-full 800px:flex'>
                                <div className='w-full 800px:w-[50%]'>
                                    <img src={`${BASE_URL}/${data?.images[select]}`} alt="" className='w-[80%]' />
                                    <div className='w-full flex'>
                                        <div className={`${select === 0 ? 'border' : null} cursor-pointer `}>
                                            <img src={`${BASE_URL}/${data?.images[0]}`} alt="" className='h-[200px]' onClick={() => setSelect(0)} />
                                        </div>
                                        <div className={`${select === 1 ? 'border' : null} cursor-pointer `}>
                                            <img src={`${BASE_URL}/${data?.images[1]}`} alt="" className='h-[200px]' onClick={() => setSelect(1)} />
                                        </div>
                                    </div>
                                </div>
                                <div className='w-full 800px:w-[50%]'>
                                    <h1 className={`${styles.productTitle} pt-5`}>{data.name}</h1>
                                    <p>{data.description}</p>
                                    <div className='flex pt-4 '>
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
                                    <div className={`${styles.button} mt-6 rounded-[0.25rem] h-11 flex items-center`}>
                                        <span className=' text-white flex items-center '>Add To Cart <AiOutlineShoppingCart size={25} className='ml-1' /></span>
                                    </div>

                                    <div className='w-full flex my-3 items-center'>
                                        <div className='flex items-center'>
                                            <img src={`${BASE_URL}/${data.shop.avatar}`} className='w-[50px] h-[50px] rounded-full mr-2' alt="" />
                                            <div className='pr-8'>
                                                <h3 className={`${styles.shop_name}`}>
                                                    {data.shop.name}
                                                </h3>
                                                <h5 className='pb-3 text-[15px]'>
                                                    ({data?.ratings ? data?.ratings : 0}) Ratings
                                                </h5>
                                            </div>
                                        </div>
                                        <div className={`${styles.button} bg-[#6443d1] mt-4 border rounded-[0.25rem] h-11`} onClick={handleMessageSubmit}>
                                            <span className='text-white flex items-center'>
                                                Send Message <AiOutlineMessage size={20} className='ml-1' />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <ProductDetailsInfo data={data} />
                        <br />
                        <br />
                    </div>
                )
                    : null
            }
        </div>
    )
}

const ProductDetailsInfo = ({ data }) => {
    const [active, setActive] = useState(1)
    const { products } = useSelector(state => state.products)

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const totalReviewLength = products && products.reduce((acc, product) => acc + (product?.reviews?.length || 0), 0);
    const totalRating = products && products.reduce((acc, product) =>
        acc + (product?.reviews?.reduce((sum, review) => sum + review.rating, 0) || 0), 0
    );
    const averageRating = totalRating / totalReviewLength || 0;

    return (
        <div className="bg-[#f5f6fb] px-3 800px:px-10 py-2 rounded">
            <div className='w-full flex justify-between border-b pt-10 pb-2'>
                <div className="relative">
                    <h5 className='text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]' onClick={() => setActive(1)} >Product Details</h5>
                    {
                        active === 1
                            ? (
                                <div className={`${styles.active_indicator}`}>

                                </div>
                            )
                            : null
                    }
                </div>
                <div className="relative">
                    <h5 className='text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]' onClick={() => setActive(2)} >Product Reviews</h5>
                    {
                        active === 2
                            ? (
                                <div className={`${styles.active_indicator}`}>

                                </div>
                            )
                            : null
                    }
                </div>
                <div className="relative">
                    <h5 className='text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]' onClick={() => setActive(3)} >Seller Information</h5>
                    {
                        active === 3
                            ? (
                                <div className={`${styles.active_indicator}`}>

                                </div>
                            )
                            : null
                    }
                </div>
            </div>
            {
                active === 1
                    ? (
                        <>
                            <p className='px-2 text-[18px] leading-8 pb-10 whitespace-pre-line'>{data?.description}</p>
                        </>
                    )
                    : null
            }
            {
                active === 2
                    ? (
                        <div className='w-full justify-center min-h-[40vh] flex flex-col items-center'>
                            {
                                data && data.reviews.map((item, index) => {
                                    return <div className='w-full flex my-2'>
                                        <img src={`${BASE_URL}/${item.user.avatar}`} alt="" className='h-[50px] w-[50px] rounded-full bg-cover border-2 border-green-600' />
                                        <div className='pl-2'>
                                            <h1 className='font-[500]'>{capitalizeFirstLetter(item.user.name)}</h1>
                                            <Rating rating={item.rating} />
                                            <p>{item.comment}</p>
                                        </div>
                                    </div>
                                })
                            }
                            {
                                data && data.reviews.length === 0 && (
                                    <h5>No reviews, against this product!</h5>
                                )
                            }
                        </div>
                    )
                    : null
            }
            {
                active === 3
                    ? (
                        <div className='w-full block 800px:flex p-5'>
                            <div className='w-full 800px:w-[50%]'>
                                <div className="flex items-center">
                                    <img src={`${BASE_URL}/${data.shop.avatar}`} alt="" className='w-[50px] h-[50px] rounded-full' />
                                    <div className='pl-3'>
                                        <h3 className={`${styles.shop_name}`}>
                                            {data.shop.name}
                                        </h3>
                                        <h5 className='pb-2 text-[15px]'>
                                            ({averageRating}) Ratings
                                        </h5>
                                    </div>
                                </div>
                                <div className="pt-2">
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut tempora nam voluptas est vitae dolore blanditiis aliquid architecto hic saepe similique, natus, reiciendis sint incidunt quia debitis veritatis? Ut, velit.
                                </div>
                            </div>
                            <div className='w-full 800px:w-[50%] mt-5 800px:mt-0 800px:flex flex-col items-end'>
                                <div className='text-left'>
                                    <h5 className='font-[600px]'>
                                        Joined On: <span className='font-[500]'>12 April, 2024</span>
                                    </h5>
                                    <h5 className='font-[600px]'>
                                        Total Products: <span className='font-[500]'>1221</span>
                                    </h5>
                                    <h5 className='font-[600px]'>
                                        Total Reviews: <span className='font-[500]'>{totalReviewLength}</span>
                                    </h5>
                                    <Link>
                                        <div className={`${styles.button} !rounded-[4px] !h-[39.5px] mt-3`}>
                                            <h4 className='text-white'>Visit Shop</h4>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )
                    : null
            }
        </div >
    )
}

export default ProductDetails