import React from 'react'
import { Link } from 'react-router-dom'
import { RxDashboard } from 'react-icons/rx'
import { FiPackage, FiShoppingBag } from 'react-icons/fi'
import { AiOutlineFolderAdd, AiOutlineGift } from 'react-icons/ai'
import { MdOutlineLocalOffer } from 'react-icons/md'
import { VscNewFile } from 'react-icons/vsc'
import { CiMoneyBill, CiSettings } from 'react-icons/ci'
import { BiMessageSquareDetail } from 'react-icons/bi'
import { HiOutlineReceiptRefund } from 'react-icons/hi'

const DashboardSidebar = ({ active }) => {
    return (
        <div className='w-full h-[89vh] bg-white shadow-sm overflow-y-scroll sticky top-0 left-0 z-10'>

            {/* single items */}
            <div className='w-full flex items-center p-4 '>
                <Link to={'/dashboard'} className='w-full flex items-center justify-center 800px:justify-normal'>
                    <RxDashboard size={30} color={`${active === 1 ? "#176119" : "#555"}`} />
                    <h5 className={`hidden 800px:block pl-2 text-[18px] font-[400]  ${active === 1 ? "text-[#176119]" : "text-[#555]"}`} >
                        Dashboard
                    </h5>
                </Link>
            </div>

            <div className='w-full flex items-center p-4 '>
                <Link to={'/dashboard-orders'} className='w-full flex items-center justify-center 800px:justify-normal'>
                    <FiShoppingBag size={30} color={`${active === 2 ? "#176119" : "#555"}`} />
                    <h5 className={`hidden 800px:block pl-2 text-[18px] font-[400]  ${active === 2 ? "text-[#176119]" : "text-[#555]"}`} >
                        All Orders
                    </h5>
                </Link>
            </div>
            <div className='w-full flex items-center p-4 '>
                <Link to={'/dashboard-products'} className='w-full flex items-center justify-center 800px:justify-normal'>
                    <FiPackage size={30} color={`${active === 3 ? "#176119" : "#555"}`} />
                    <h5 className={`hidden 800px:block pl-2 text-[18px] font-[400]  ${active === 3 ? "text-[#176119]" : "text-[#555]"}`} >
                        All Products
                    </h5>
                </Link>
            </div>

            <div className='w-full flex items-center p-4 '>
                <Link to={'/dashboard-create-product'} className='w-full flex items-center justify-center 800px:justify-normal'>
                    <MdOutlineLocalOffer size={30} color={`${active === 4 ? "#176119" : "#555"}`} />
                    <h5 className={`hidden 800px:block pl-2 text-[18px] font-[400]  ${active === 4 ? "text-[#176119]" : "text-[#555]"}`} >
                        Create Product
                    </h5>
                </Link>
            </div>

            <div className='w-full flex items-center p-4 '>
                <Link to={'/dashboard-events'} className='w-full flex items-center justify-center 800px:justify-normal'>
                    <AiOutlineFolderAdd size={30} color={`${active === 5 ? "#176119" : "#555"}`} />
                    <h5 className={`hidden 800px:block pl-2 text-[18px] font-[400]  ${active === 5 ? "text-[#176119]" : "text-[#555]"}`} >
                        All Events
                    </h5>
                </Link>
            </div>

            <div className='w-full flex items-center p-4 '>
                <Link to={'/dashboard-create-event'} className='w-full flex items-center justify-center 800px:justify-normal'>
                    <VscNewFile size={30} color={`${active === 6 ? "#176119" : "#555"}`} />
                    <h5 className={`hidden 800px:block pl-2 text-[18px] font-[400]  ${active === 6 ? "text-[#176119]" : "text-[#555]"}`} >
                        Create Event
                    </h5>
                </Link>
            </div>

            <div className='w-full flex items-center p-4 '>
                <Link to={'/dashboard-withdraw-money'} className='w-full flex items-center justify-center 800px:justify-normal'>
                    <CiMoneyBill size={30} color={`${active === 7 ? "#176119" : "#555"}`} />
                    <h5 className={`hidden 800px:block pl-2 text-[18px] font-[400]  ${active === 7 ? "text-[#176119]" : "text-[#555]"}`} >
                        Withdraw Money
                    </h5>
                </Link>
            </div>

            <div className='w-full flex items-center p-4 '>
                <Link to={'/dashboard-message'} className='w-full flex items-center justify-center 800px:justify-normal'>
                    <BiMessageSquareDetail size={30} color={`${active === 8 ? "#176119" : "#555"}`} />
                    <h5 className={`hidden 800px:block pl-2 text-[18px] font-[400]  ${active === 8 ? "text-[#176119]" : "text-[#555]"}`} >
                        Shop Inbox
                    </h5>
                </Link>
            </div>

            <div className='w-full flex items-center p-4 '>
                <Link to={'/dashboard-coupouns'} className='w-full flex items-center justify-center 800px:justify-normal'>
                    <AiOutlineGift size={30} color={`${active === 9 ? "#176119" : "#555"}`} />
                    <h5 className={`hidden 800px:block pl-2 text-[18px] font-[400]  ${active === 9 ? "text-[#176119]" : "text-[#555]"}`} >
                        Discount Codes
                    </h5>
                </Link>
            </div>

            <div className='w-full flex items-center p-4 '>
                <Link to={'/dashboard-refunds'} className='w-full flex items-center justify-center 800px:justify-normal'>
                    <HiOutlineReceiptRefund size={30} color={`${active === 10 ? "#176119" : "#555"}`} />
                    <h5 className={`hidden 800px:block pl-2 text-[18px] font-[400]  ${active === 10 ? "text-[#176119]" : "text-[#555]"}`} >
                        Refunds
                    </h5>
                </Link>
            </div>

            <div className='w-full flex items-center p-4 '>
                <Link to={'/dashboard-settings'} className='w-full flex items-center justify-center 800px:justify-normal'>
                    <CiSettings size={30} color={`${active === 11 ? "#176119" : "#555"}`} />
                    <h5 className={`hidden 800px:block pl-2 text-[18px] font-[400]  ${active === 11 ? "text-[#176119]" : "text-[#555]"}`} >
                        Settings
                    </h5>
                </Link>
            </div>

        </div>
    )
}

export default DashboardSidebar