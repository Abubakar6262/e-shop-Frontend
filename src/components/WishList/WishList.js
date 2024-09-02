import React, { useEffect, useState } from 'react'
import { RxCross1 } from 'react-icons/rx'
import { IoBagHandleOutline, IoHeartOutline } from 'react-icons/io5'
// import { HiOutlineMinus, HiPlus } from 'react-icons/hi'
import { BsCartPlus } from 'react-icons/bs'
import styles from '../../styles/styles'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../../server'





// const cartData = [
//     {
//         name: "Apple iPhone 14 256gb",
//         price: 799.99,
//         description: "This is description for test"
//         // image: "https://media.istockphoto.com/id/1301140207/photo/modern-mobile-phone-mockup-with-sample-home-screen-visual-design.jpg?s=1024x1024&w=is&k=20&c=192xA_Id2zPl7oCuqzB4DwRB8sAqlPil2GGlM-h0SVg="
//     },
//     {
//         name: "Samsung Galaxy S22",
//         price: 699.99,
//         description: "This is description for test"
//         // image: "https://images.unsplash.com/photo-1674763301530-f73a9351d9fc?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//     },
//     {
//         name: "Sony WH-1000XM4",
//         price: 349.99,
//         description: "This is description for test"
//         // image: "https://media.istockphoto.com/id/90151195/photo/old-camera.jpg?s=1024x1024&w=is&k=20&c=TW_kaku6cj2FSz3oE2T5Z-1BHf0aduug82dJCV86puk="
//     },
// ]

const WishList = ({ setOpenWishList }) => {
    const [product, setProduct] = useState([])

    useEffect(() => {
        const favProduct = JSON.parse(localStorage.getItem("favProducts"));
        console.log("These are fav products ", favProduct);
        setProduct(favProduct)

    },[])

    return (
        <div className='fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10'>
            <div className='fixed top-0 right-0 min-h-full w-[25%] bg-white flex flex-col justify-between shadow-sm'>
                <div>
                    <div className='flex justify-end w-full pt-5 pr-5'>
                        <RxCross1
                            size={25}
                            className='cursor-pointer'
                            onClick={() => setOpenWishList(false)}
                        />
                    </div>
                    {/* items length */}
                    <div className={`${styles.noramlFlex} p-4`}>
                        <IoHeartOutline size={25} />
                        <h5 className='pl-2 text-[20px]  font-[500]'>
                            {product?.length} Items
                        </h5>
                    </div>
                    {/* cart single items */}
                    <br />
                    <div className='w-full border-t'>
                        {
                            product && product.map((item, index) => {
                                return <CartSingle key={index} data={item} />
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

const CartSingle = ({ data }) => {
    const [value, setValue] = useState(1)
    let totalPrice = (data.price * value).toFixed(2)
    return (
        <div className='border-b p-4'>
            <div className='w-full flex items-center justify-between'>
                <div>
                    <RxCross1 className='cursor-pointer' />
                    {/* <div className={`bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] ${styles.noramlFlex} justify-center cursor-pointer`}
                        onClick={() => setValue(value + 1)}
                    >
                        <HiPlus size={18} color='#fff' />
                    </div>
                    <span className='pl-[10px]'>{value}</span>
                    <div className='bg-[#a7abb14f] rounded-full h-[25px] w-[25px] flex items-center justify-center cursor-pointer '
                        onClick={() => setValue(value === 1 ? 1 : value - 1)}
                    >
                        <HiOutlineMinus size={16} color='#7d879c' />
                    </div> */}
                </div>
                {/* <img src="https://bonik-react.vercel.app/assets/images/products/Fashion/Clothes/1.SilverHighNeckSweater.png" alt="" */}
                <img src={`${BASE_URL}/${data?.images[0]}`} alt=""
                    className='w-[80px] h-[80px] ml-2'
                />
                <div className='pl-[5px]'>
                    <h1>{data.name}</h1>
                    <h4 className='font-[400] text-[15px] text-[#00000082]'>${data?.discountPrice}</h4>
                    <h4 className='font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto'>USD ${data?.originalPrice}</h4>
                </div>
                <div>

                    <BsCartPlus size={20} className='cursor-pointer' title="Add To Cart" />
                </div>
            </div>
        </div>
    )

}

export default WishList