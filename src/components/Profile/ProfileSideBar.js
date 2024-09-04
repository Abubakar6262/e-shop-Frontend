import React from 'react'
import { AiOutlineCreditCard, AiOutlineLogin, AiOutlineMessage } from 'react-icons/ai';
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from 'react-icons/hi';
import { RxPerson } from 'react-icons/rx';
import { MdOutlineTrackChanges } from 'react-icons/md';
import { TbAddressBook } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../../server';
const ProfileSideBar = ({ active, setActive }) => {
    const navigate = useNavigate();

    const logoutHandler = () => {
        axios.get(`${BASE_URL}/api/v1/users/logout`, { withCredentials: true })
            .then((res) => {
                window.notify(res.data.message, "success")
                navigate("/");
                window.location.reload(true);
            })
            .catch((err) => {
                console.log("Error at loged out ", err);
                window.notify("Somthing went wrong at logout ", "error")
            })
    }
    return (
        <div className='w-full bg-white shadow-sm rounded-[10px] p-4 pt-8'>
            <div className="flex items-center cursor-pointer w-full mb-8"
                onClick={() => setActive(1)}
            >
                <RxPerson size={20} color={active === 1 ? "red" : ""} />
                <span className={`pl-3 ${active === 1 ? "text-[red]" : ""} hidden 800px:block`}>
                    Profile
                </span>
            </div>
            <div className="flex items-center cursor-pointer w-full mb-8"
                onClick={() => setActive(2)}
            >
                <HiOutlineShoppingBag size={20} color={active === 2 ? "red" : ""} />
                <span className={`pl-3 ${active === 2 ? "text-[red]" : ""} hidden 800px:block`}>
                    Orders
                </span>
            </div>
            <div className="flex items-center cursor-pointer w-full mb-8"
                onClick={() => setActive(3)}
            >
                <HiOutlineReceiptRefund size={20} color={active === 3 ? "red" : ""} />
                <span className={`pl-3 ${active === 3 ? "text-[red]" : ""} hidden 800px:block`}>
                    Refunds
                </span>
            </div>
            <div className="flex items-center cursor-pointer w-full mb-8"
                onClick={() => setActive(4) || navigate("/inbox")}
            >
                <AiOutlineMessage size={20} color={active === 4 ? "red" : ""} />
                <span className={`pl-3 ${active === 4 ? "text-[red]" : ""} hidden 800px:block`}>
                    Inbox
                </span>
            </div>
            <div className="flex items-center cursor-pointer w-full mb-8"
                onClick={() => setActive(5)}
            >
                <MdOutlineTrackChanges size={20} color={active === 5 ? "red" : ""} />
                <span className={`pl-3 ${active === 5 ? "text-[red]" : ""} hidden 800px:block`}>
                    Track Order
                </span>
            </div>
            <div className="flex items-center cursor-pointer w-full mb-8"
                onClick={() => setActive(6)}
            >
                <AiOutlineCreditCard size={20} color={active === 6 ? "red" : ""} />
                <span className={`pl-3 ${active === 6 ? "text-[red]" : ""} hidden 800px:block`}>
                    Payment Methods
                </span>
            </div>
            <div className="flex items-center cursor-pointer w-full mb-8"
                onClick={() => setActive(7)}
            >
                <TbAddressBook size={20} color={active === 7 ? "red" : ""} />
                <span className={`pl-3 ${active === 7 ? "text-[red]" : ""} hidden 800px:block`}>
                    Address
                </span>
            </div>
            <div className="flex items-center cursor-pointer w-full mb-8"
                onClick={() => setActive(8)}
            >
                <AiOutlineLogin size={20} color={active === 8 ? "red" : ""} />
                <span className={`pl-3 ${active === 8 ? "text-[red]" : ""} hidden 800px:block`} onClick={logoutHandler}>
                    Log Out
                </span>
            </div>
        </div>
    )
}

export default ProfileSideBar