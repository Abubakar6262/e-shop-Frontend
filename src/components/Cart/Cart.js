import React, { useState } from 'react'
import { RxCross1 } from 'react-icons/rx'
import { IoBagHandleOutline } from 'react-icons/io5'
import { HiOutlineMinus, HiPlus } from 'react-icons/hi'
import styles from '../../styles/styles'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../../server'
import { removeFromCart } from '../../redux/actions/cart'

const cartData = [
    {
        name: "Apple iPhone 14 256gb",
        price: 799.99,
        description: "This is description for test"
        // image: "https://media.istockphoto.com/id/1301140207/photo/modern-mobile-phone-mockup-with-sample-home-screen-visual-design.jpg?s=1024x1024&w=is&k=20&c=192xA_Id2zPl7oCuqzB4DwRB8sAqlPil2GGlM-h0SVg="
    },
    {
        name: "Samsung Galaxy S22",
        price: 699.99,
        description: "This is description for test"
        // image: "https://images.unsplash.com/photo-1674763301530-f73a9351d9fc?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        name: "Sony WH-1000XM4",
        price: 349.99,
        description: "This is description for test"
        // image: "https://media.istockphoto.com/id/90151195/photo/old-camera.jpg?s=1024x1024&w=is&k=20&c=TW_kaku6cj2FSz3oE2T5Z-1BHf0aduug82dJCV86puk="
    },
]

const Cart = ({ setOpenCart }) => {
    const { cart } = useSelector((state) => state.cart)
    // console.log("cart data in cart js file", cart);


    return (
        <div className='fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10'>
            <div className='fixed top-0 right-0 min-h-full w-[25%] bg-white flex flex-col justify-between shadow-sm'>
                <div>
                    <div className='flex justify-end w-full pt-5 pr-5'>
                        <RxCross1
                            size={25}
                            className='cursor-pointer'
                            onClick={() => setOpenCart(false)}
                        />
                    </div>
                    {/* items length */}
                    <div className={`${styles.noramlFlex} p-4`}>
                        <IoBagHandleOutline size={25} />
                        <h5 className='pl-2 text-[20px]  font-[500]'>
                            {cart?.length} Items
                        </h5>
                    </div>
                    {/* cart single items */}
                    <br />
                    <div className='w-full border-t'>
                        {
                            cart && cart.map((item, index) => {
                                return <CartSingle key={index} data={item} />
                            })
                        }
                    </div>
                </div>
                <div className='px-5 mb-3'>
                    {/* Checkout button */}
                    <Link to={'/checkout'}>
                        <div className={`h-[45px] flex items-center justify-center w-[100%]  bg-[#e44343] rounded-[5px]`}>
                            <h1 className='text-white text-[18px] font-[600]'><Link to={"/checkout"}>Checkout Now</Link></h1>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

const CartSingle = ({ data }) => {

    const dispatch = useDispatch();

    const [value, setValue] = useState(data?.qty)
    let totalPrice = ((data.discountPrice ? data.discountPrice : data.originalPrice) * value).toFixed(2)
    return (
        <div className='border-b p-4'>
            <div className='w-full flex items-center justify-between'>
                <div>

                    <div className={`bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] ${styles.noramlFlex} justify-center cursor-pointer`}
                        onClick={() => setValue(value + 1)}
                    >
                        <HiPlus size={18} color='#fff' />
                    </div>
                    <span className='pl-[10px]'>{value}</span>
                    <div className='bg-[#a7abb14f] rounded-full h-[25px] w-[25px] flex items-center justify-center cursor-pointer '
                        onClick={() => setValue(value === 1 ? 1 : value - 1)}
                    >
                        <HiOutlineMinus size={16} color='#7d879c' />
                    </div>
                </div>
                <img src={`${BASE_URL}/${data?.images[0]}`} alt=""
                    className='w-[80px] h-[80px] ml-2'
                />
                <div className='pl-[5px]'>
                    <h1>{data?.name}</h1>
                    <h4 className='font-[400] text-[15px] text-[#00000082]'>${data.discountPrice ? data.discountPrice : data.originalPrice}</h4>
                    <h4 className='font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto'>USD ${totalPrice}</h4>
                </div>
                <div>
                    <RxCross1 className='cursor-pointer' onClick={() => dispatch(removeFromCart(data))} />
                </div>
            </div>
        </div>
    )

}

export default Cart