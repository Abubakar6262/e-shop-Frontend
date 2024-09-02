import React, { useEffect, useState } from 'react'
import styles from '../../styles/styles'
import { Link } from 'react-router-dom'
import { AiFillShop, AiOutlineHeart, AiOutlineSearch, AiOutlineShoppingCart } from 'react-icons/ai';
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';
import { BiMenuAltLeft } from 'react-icons/bi';
import { CgProfile } from "react-icons/cg"
import { categoriesData, ProductData } from '../../static/data';
import DropDown from "./DropDown.js"
import Navbar from "./Navbar.js"
import { useSelector } from "react-redux"
import { BASE_URL } from '../../server.js';
import Cart from '../Cart/Cart.js'
import WishList from '../WishList/WishList.js'
import { RxCross1 } from 'react-icons/rx';
import { MdDashboard } from 'react-icons/md';


const Header = ({ activeHeading }) => {
    const { isAuthenticated, user, loading } = useSelector((state) => state.user);
    const { isLoading, isSellerAuthenticated, seller } = useSelector((state) => state.seller);
    const { cart } = useSelector((state) => state.cart)

    // console.log("user ", user);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchData, setSearchData] = useState(null);
    const [active, setActive] = useState(false);
    const [dropDown, setDropDown] = useState(false);
    const [openCart, setOpenCart] = useState(false)
    const [openWishList, setOpenWishList] = useState(false)
    const [open, setOpen] = useState(false)
    const [topValue, setTopValue] = useState(0)

    useEffect(() => {
        const favProduct = JSON.parse(localStorage.getItem("favProducts"));
        console.log("These are fav products ", favProduct);
        setTopValue(favProduct?.length)

    }, [])

    window.addEventListener("scroll", () => {
        if (window.scrollY > 70) {
            setActive(true)
        } else {
            setActive(false)
        }
    })

    const handleChange = e => {
        const term = e.target.value;
        setSearchTerm(term);

        // console.log("product data ", ProductData);
        const filteredData = ProductData && ProductData.filter((product) => {
            return (product.name || "").toLowerCase().includes(term.toLowerCase());
        });
        // console.log("This is filter data", filteredData);
        setSearchData(filteredData)
    }
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <>
            {
                loading
                    ? (null
                    )
                    : (

                        <>
                            <div className={`${styles.section}`}>
                                <div className='hidden  800px:h-[50px] 800px:my-[20px]  800px:flex items-center justify-between'>
                                    <div>
                                        <Link to={"/"}>
                                            <img src="https://shopo.quomodothemes.website/assets/images/logo.svg" alt="" />
                                        </Link>
                                    </div>

                                    {/* Search box */}
                                    <div className="w-[50%] relative">
                                        <input type="text" placeholder='search product...' value={searchTerm} onChange={handleChange} className='h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md' />
                                        <AiOutlineSearch size={30} className='absolute right-2 top-1.5 cursor-pointer' />
                                        {searchData && searchData.length !== 0
                                            ? (
                                                <div className="absolute min-h-[30vh] w-[100%] bg-slate-50 shadow-sm-2 z-[9] p-4">
                                                    {searchData && searchData.map((item, index) => {
                                                        const d = item.name;
                                                        const Product_name = d.replace(/\s+/g, "-")
                                                        return (
                                                            <Link to={`/product/${Product_name}`}>
                                                                <div className="w-full flex items-start py-3">
                                                                    <img src={item.image_Url[0].url} alt="" className='w-[40px] h-[40px] mr-[10px]' />
                                                                    <h1>{item.name}</h1>
                                                                </div>
                                                            </Link>
                                                        )
                                                    })
                                                    }
                                                </div>
                                            )
                                            : null
                                        }
                                    </div>
                                    {isSellerAuthenticated
                                        ? (
                                            <>
                                                <div className={`${styles.button} !bg-blue-500`}>
                                                    <Link to={`/dashboard`}>
                                                        <h1 className='text-[#fff] flex items-center'>
                                                            Dashboard <MdDashboard size={25} className="ml-1" />
                                                        </h1>
                                                    </Link>
                                                </div>
                                                <div className={`${styles.button}`}>
                                                    <Link to={`/seller/${seller._id}`}>
                                                        <h1 className='text-[#fff] flex items-center'>
                                                            Go To Shop <AiFillShop size={25} className="ml-1" />
                                                        </h1>
                                                    </Link>
                                                </div>
                                            </>
                                        )
                                        : (
                                            <div className={`${styles.button}`}>
                                                <Link to='/seller-create'>
                                                    <h1 className='text-[#fff] flex items-center'>
                                                        Become Seller <IoIosArrowForward className="ml-1" />
                                                    </h1>
                                                </Link>
                                            </div>
                                        )

                                    }

                                </div>
                            </div>

                            <div className={`${active === true ? "shadow-sm fixed top-0 left-0 z-10" : null} transition hidden 800px:block  800px:items-center justify-between w-full bg-[#3321c8] h-[70px]`}>
                                <div className={`${styles.section} relative ${styles.noramlFlex} justify-between`}>
                                    {/* Category */}
                                    <div onClick={() => setDropDown(!dropDown)}>
                                        <div className='relative h-[60px]  mt-[10px] w-[270px] hidden 1000px:block'>
                                            <BiMenuAltLeft size={30} className='absolute top-3 left-2' />
                                            <button className='h-[100%] w-full flex justify-between items-center pl-10 bg-white font-Roboto text-lg  font-[500] select-none rounded-t-lg' >
                                                All Categories
                                            </button>
                                            <IoIosArrowDown
                                                size={20} className='absolute right-2 top-4 cursor-pointer'
                                                onClick={() => setDropDown(!dropDown)} />
                                            {
                                                dropDown ?
                                                    <DropDown
                                                        categoriesData={categoriesData}
                                                        setDropDown={setDropDown}
                                                    />
                                                    : null
                                            }
                                        </div>
                                    </div>
                                    {/* Navitems */}
                                    <div className={`${styles.noramlFlex}`}>
                                        <Navbar active={activeHeading} />
                                    </div>

                                    <div className='flex'>
                                        <div className={`${styles.noramlFlex}`}>
                                            <div className="relative cursor-pointer mr-[15px]"
                                                onClick={() => setOpenWishList(true)}
                                            >
                                                <AiOutlineHeart
                                                    size={30}
                                                    color='rgb(255 255 255 / 83% )'
                                                />
                                                <span className='absolute top-0 right-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-Poppins text-[12px] leading-tight text-center'>{topValue}</span>
                                            </div>

                                        </div>

                                        <div className={`${styles.noramlFlex}`}>
                                            <div className="relative cursor-pointer mr-[15px]"
                                                onClick={() => setOpenCart(true)}
                                            >
                                                <AiOutlineShoppingCart
                                                    size={30}
                                                    color='rgb(255 255 255 / 83% )'
                                                />
                                                <span className='absolute top-0 right-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-Poppins text-[12px] leading-tight text-center'>{cart?.length}</span>
                                            </div>

                                        </div>

                                        <div className={`${styles.noramlFlex}`}>
                                            <div className="relative cursor-pointer mr-[15px]">
                                                {
                                                    isAuthenticated ? (
                                                        <Link to={"/profile"}>
                                                            <img src={`${BASE_URL}/${user.avatar}`} className={`w-[35px] h-[35px] rounded-full bg-contain`} alt="" />
                                                        </Link>
                                                    ) : (
                                                        <Link to={"/login"}>
                                                            <CgProfile
                                                                size={30}
                                                                color='rgb(255 255 255 / 83% )'
                                                            />
                                                        </Link>
                                                    )
                                                }

                                            </div>
                                        </div>
                                        {/* cart popup */}
                                        {
                                            openCart
                                                ? <Cart setOpenCart={setOpenCart} />
                                                : null
                                        }
                                        {
                                            openWishList
                                                ? <WishList setOpenWishList={setOpenWishList} />
                                                : null
                                        }
                                    </div>

                                </div>
                            </div>


                            {/* Mobile Header */}
                            <div className='w-full h-[70%] bg-[#fff] z-50 top-0 left-0 shadow-sm 800px:hidden'>
                                <div className='w-full flex items-center justify-between'>
                                    <div>
                                        <BiMenuAltLeft size={40} className='ml-4' onClick={() => setOpen(true)} />
                                    </div>
                                    <div>
                                        <Link to={"/"}>
                                            <img src="https://shopo.quomodothemes.website/assets/images/logo.svg" alt="" />
                                        </Link>
                                    </div>
                                    <div className={`${styles.noramlFlex}`}>
                                        <div className="relative cursor-pointer mr-[15px]"
                                            onClick={() => setOpenCart(true)}
                                        >
                                            <AiOutlineShoppingCart
                                                size={30}
                                                color='#000'
                                            />
                                            <span className='absolute top-0 right-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-Poppins text-[12px] leading-tight text-center'>{cart?.length}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Header sidebar */}
                                {
                                    open && (
                                        <div className='fixed w-full bg-[#0000005f] z-20 h-full shadow-sm top-0 left-0'>
                                            <div className='fixed w-[60%] bg-white h-screen top-0 left-0 z-10 overflow-y-scroll'>
                                                <div className='w-full justify-between flex pr-3'>
                                                    <div>
                                                        <div className='relative mr-[15px]'>
                                                            <AiOutlineHeart size={30} className='mt-5 ml-3' />
                                                            <span className='absolute top-0 right-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-Poppins text-[12px] leading-tight text-center'>0</span>
                                                        </div>
                                                    </div>
                                                    <RxCross1 size={30} className='ml-4 mt-5' onClick={() => setOpen(false)} />
                                                </div>
                                                <div className='my-8 w-[92%] m-auto h-[48px]'>
                                                    <input type="search" placeholder='Search Product' value={searchTerm} onChange={handleChange} className='h-[40px] w-full px-2 border-[2px] rounded-md' />
                                                </div>
                                                {searchData && searchData.length !== 0
                                                    ? (
                                                        <div className="absolute min-h-[30vh] w-[100%] bg-slate-50 shadow-sm-2 z-[9] p-4">
                                                            {searchData && searchData.map((item, index) => {
                                                                // console.log("Item", item);
                                                                const d = item.name;
                                                                const Product_name = d.replace(/\s+/g, "-")
                                                                return (
                                                                    <Link to={`/product/${Product_name}`}>
                                                                        <div className="w-full flex items-start py-3">
                                                                            <img src={item.image_Url[0].url} alt="" className='w-[40px] h-[40px] mr-[10px]' />
                                                                            <h1>{item.name}</h1>
                                                                        </div>
                                                                    </Link>
                                                                )
                                                            })
                                                            }
                                                        </div>
                                                    )
                                                    : null
                                                }

                                                <Navbar active={activeHeading} />
                                                <div className={`${styles.button} ml-4 !rounded-[5px]`}>
                                                    <Link to='/seller-create'>
                                                        <h1 className='text-[#fff] flex items-center '>
                                                            Become Seller <IoIosArrowForward className="ml-1" />
                                                        </h1>
                                                    </Link>
                                                </div>
                                                {
                                                    !isAuthenticated
                                                        ? (
                                                            <div className='flex w-full ml-4'>
                                                                <div className='w-[70px] h-[35px] bg-blue-500 p-1 rounded-[4px] me-2'>
                                                                    <Link to={"/login"} className='flex justify-center items-center'>Login</Link>
                                                                </div>
                                                                <div className='w-[70px] h-[35px] bg-yellow-300 p-1 rounded-[4px]'>
                                                                    <Link to={"/sign-up"} className='flex justify-center items-center'>SignUp</Link>
                                                                </div>
                                                            </div>
                                                        )
                                                        : <span className='ml-4 font-Roboto font-bold text-[#a0c646]'>Hi, {capitalizeFirstLetter(user.name)}</span>
                                                }

                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </>
                    )
            }
        </>
    )
}

export default Header