import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../../server'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineArrowRight, AiOutlineCamera, AiOutlineDelete } from 'react-icons/ai'
import { Link, } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid';
import { MdOutlineTrackChanges, MdTrackChanges } from 'react-icons/md'
import axios from 'axios'
import styles from '../../styles/styles'
import { RxCross1 } from 'react-icons/rx'

import { Country, State, City } from 'country-state-city'
import { getAllOrderUser } from '../../redux/actions/order'


const ProfileContent = ({ active }) => {
    const { user } = useSelector((state) => state.user);
    const [name, setName] = useState(user && user.name);
    const [email, setEmail] = useState(user && user.email);
    const [phoneNumber, setPhoneNumber] = useState();
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState(null);


    // console.log("profile image data ", avatar);

    const handleChange = (e) => {
        const file = e.target.files[0];
        setAvatar(file)
        const formData = new FormData();

        formData.append("avatar", e.target.files[0])
        formData.forEach((value, key) => {
            console.log(`${key}:`, value);
        });

        axios.post(`${BASE_URL}/api/v1/users/update-avatar`, formData,
            {
                Headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true,
            })
            .then((res) => {
                console.log("response from update image of user ", res);
                window.notify(res?.data?.message, "success")
                window.location.reload(true);
            })
            .catch((err) => {
                console.log("Error at update user profile ", err);
                window.notify(err?.response?.data?.message, 'error')

            })
            .finally(() => {
                setAvatar(null);
            })
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            name, email, phoneNumber, password
        }
        // console.log("This is form data for user profile update =>", formData);
        axios.post(`${BASE_URL}/api/v1/users/update-user-profile`, formData, { withCredentials: true })
            .then((res) => {
                console.log("response from user update profile =>", res);
                window.notify(res?.data?.message, "success")
            })
            .catch((err) => {
                console.log("error at updating user profile ", err);
                window.notify(err?.response?.data?.message, "error")
            })
    }

    return (
        <div className='w-full'>
            {/* Profile  */}
            {active === 1 && (
                <>
                    <div className='w-full flex justify-center '>
                        <div className='relative '>
                            <img src={`${BASE_URL}/${user?.avatar}`} className={`w-[150px] h-[150px] rounded-full bg-cover !border-[3px] border-[#3ad132]`} alt="" />
                            <div className='w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center absolute cursor-pointer bottom-[5px] right-[5px]'>
                                <label htmlFor="file-input" className='cursor-pointer'>
                                    <AiOutlineCamera />
                                    <input type="file" id='file-input' hidden onChange={handleChange} />
                                </label>
                            </div>
                        </div>
                    </div>
                    <br /><br />
                    <div className='w-full px-5'>
                        <form onSubmit={handleSubmit} aria-required={true}>
                            <div className='w-full pb-3 800px:flex block'>
                                <div className='w-[100%] 800px:w-[50%]'>
                                    <label className="block pb-2">
                                        Full Name
                                    </label>
                                    <input type="text" className={`${styles.input} !w-[90%] pl-2`} value={name} onChange={(e) => setName(e.target.value)} required />
                                </div>
                                <div className='w-[100%] 800px:w-[50%]'>
                                    <label className="block pb-2">
                                        Email Address
                                    </label>
                                    <input type="text" className={`${styles.input} !w-[90%] pl-2`} value={email} onChange={(e) => setEmail(e.target.value)} required />
                                </div>
                            </div>
                            <div className='w-full pb-3 800px:flex block'>
                                <div className='w-[100%] 800px:w-[50%]'>
                                    <label className="block pb-2">
                                        Phone Number
                                    </label>
                                    <input type="tel" className={`${styles.input} !w-[90%] pl-2`} value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                                </div>
                                <div className='w-[100%] 800px:w-[50%]'>
                                    <label className="block pb-2">
                                        Enter Your Password
                                    </label>
                                    <input type="password" className={`${styles.input} !w-[90%] pl-2`} value={password} onChange={(e) => setPassword(e.target.value)} required />
                                </div>
                            </div>

                            <input type="submit" value={"Update"} required className='w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db]  rounded-[3px] mt-8 cursor-pointer' />
                        </form>
                    </div>
                </>
            )}
            {/* Order  */}
            {active === 2 && (
                <>
                    <AllOrders />
                </>
            )}
            {/* Refund */}
            {active === 3 && (
                <>
                    <AllReFundOrders />
                </>
            )}
            {/* Track order */}
            {active === 5 && (
                <>
                    < TrackOrder />
                </>
            )}
            {/* Payment Method */}
            {active === 6 && (
                <>
                    < PaymentMethod />
                </>
            )}
            {/* user Address */}
            {active === 7 && (
                <>
                    < Address />
                </>
            )}

        </div>
    )
}


const AllOrders = () => {

    const { user } = useSelector(state => state.user)
    const { orders } = useSelector(state => state.orders)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllOrderUser(user?._id))
    }, [])

    const columns = [
        {
            field: "id",
            headerName: "Order ID",
            minWidth: 150,
            flex: 0.7,
        },
        {
            field: "orderStatus",
            headerName: "Status",
            minWidth: 130,
            flex: 0.7,
            cellClassName: (params) => {
                return params.value === "Delivered" ? "greenColor" : "redColor";
            },
        },
        {
            field: "itemsQty",
            headerName: "Items Qty",
            type: "number",
            minWidth: 130,
            flex: 0.7,
        },
        {
            field: "totalPrice",
            headerName: "Total",
            type: "number",
            minWidth: 130,
            flex: 0.7,
        },
        {
            field: "action",
            headerName: "Action",
            type: "number",
            flex: 0.7,
            minWidth: 150,
            sortable: false,
            renderCell: (params) => {
                return (
                    <div className='flex justify-end items-center mt-2'>

                        <Link to={`/user/order/${params.row.id}`}>
                            <button className="btn btn-primary float-end">
                                <AiOutlineArrowRight size={20} />
                            </button>
                        </Link>
                    </div>
                );
            },
        },
    ];

    const row = [];
    const rows = orders && orders.map((item) => ({
        id: item._id,
        itemsQty: item.cart.length,
        totalPrice: item.totalPrice + " $",
        orderStatus: item.status,
    }));

    return (
        <div className='pl-8 pt-1'>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                disableSelectionOnClick
            />
        </div>
    )
}


const AllReFundOrders = () => {
    const { user } = useSelector(state => state.user)
    const { orders } = useSelector(state => state.orders)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllOrderUser(user?._id))
    }, [])

    const orderRefundData = []
    orders && orders.map((item) => {
        return item.status === "Processing refund" && (
            orderRefundData.push(item)
        )
    })

    const columns = [
        {
            field: "id",
            headerName: "Order ID",
            minWidth: 150,
            flex: 0.7,
        },
        {
            field: "orderStatus",
            headerName: "Status",
            minWidth: 130,
            flex: 0.7,
            cellClassName: (params) => {
                return params.value === "Delivered" ? "greenColor" : "redColor";
            },
        },
        {
            field: "itemsQty",
            headerName: "Items Qty",
            type: "number",
            minWidth: 130,
            flex: 0.7,
        },
        {
            field: "totalPrice",
            headerName: "Total",
            type: "number",
            minWidth: 130,
            flex: 0.7,
        },
        {
            field: "action",
            headerName: "Action",
            type: "number",
            flex: 0.7,
            minWidth: 150,
            sortable: false,
            renderCell: (params) => {
                return (
                    <div className='flex justify-end items-center mt-2'>

                        <Link to={`/user/track/order/${params.row.id}`}>
                            <button className="btn btn-primary float-end">
                                <MdTrackChanges size={20} />
                            </button>
                        </Link>
                    </div>
                );
            },
        },
    ];
    const rows = orderRefundData.map((item) => ({
        id: item._id,
        itemsQty: item.cart.length,
        totalPrice: item.totalPrice + " $",
        orderStatus: item.status,
    }));
    return (
        <div className='pl-8 pt-1'>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                disableSelectionOnClick
            />
        </div>
    )
}

const TrackOrder = () => {
    const { user } = useSelector(state => state.user)
    const { orders } = useSelector(state => state.orders)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllOrderUser(user?._id))
    }, [])

    const columns = [
        {
            field: "id",
            headerName: "Order ID",
            minWidth: 150,
            flex: 0.7,
        },
        {
            field: "orderStatus",
            headerName: "Status",
            minWidth: 130,
            flex: 0.7,
            cellClassName: (params) => {
                return params.value === "Delivered" ? "greenColor" : "redColor";
            },
        },
        {
            field: "itemsQty",
            headerName: "Items Qty",
            type: "number",
            minWidth: 130,
            flex: 0.7,
        },
        {
            field: "totalPrice",
            headerName: "Total",
            type: "number",
            minWidth: 130,
            flex: 0.7,
        },
        {
            field: "action",
            headerName: "Action",
            type: "number",
            flex: 0.7,
            minWidth: 150,
            sortable: false,
            renderCell: (params) => {
                return (
                    <div className='flex justify-end items-center mt-2'>

                        <Link to={`/user/track/order/${params.row.id}`}>
                            <button className="btn btn-primary float-end">
                                <MdOutlineTrackChanges size={20} />
                            </button>
                        </Link>
                    </div>
                );
            },
        },
    ];
    const rows = orders.map((item) => ({
        id: item._id,
        itemsQty: item.cart.length,
        totalPrice: item.totalPrice + " $",
        orderStatus: item.status,
    }));
    return (
        <div className='pl-8 pt-1'>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                disableSelectionOnClick
            />
        </div>
    )

}

const PaymentMethod = () => {
    return (
        <div className='w-full px-5'>
            <div className='w-full flex items-center justify-between'>
                <h1 className='text-[25px] font-[600] text-[#000000ab] pb-2'>Payment Methods</h1>
                <div className={`${styles.button} !rounded-md `}>
                    <span className='text-[#fff]'>Add New</span>
                </div>
            </div>
            <br />
            <div className='w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10'>
                <div className='flex items-center'>
                    <img src='https://bonik-react.vercel.app/assets/images/payment-methods/Visa.svg' alt="" />
                    <h5 className='pl-5 font-[600]'>Abu bakkar</h5>
                </div>
                <div className='pl-8 flex items-center'>
                    <h4>1234 **** *** ****</h4>
                    <h5 className='pl-6'>08/2020</h5>
                </div>
                <div className='min-w-[10%] flex items-center justify-between pl-8'>
                    <AiOutlineDelete size={25} className='cursor-pointer hover:text-red-600' />
                </div>
            </div>
        </div>
    )
}



const Address = () => {
    const [open, setOpen] = useState(false);
    const [country, setCountry] = useState("");
    const [state, setState] = useState("")
    const [city, setCity] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [addressType, setAddressType] = useState("");
    const { user } = useSelector(state => state.user);

    const addressTypeData = [
        {
            name: "default",
        },
        {
            name: "Home",
        },
        {
            name: "office",
        }
    ]

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (addressType === "" || country === "" || state === "" || city === "") {
            alert("Please fill all fields");

        } else {
            const formData = {
                country, state, city, address1, address2, zipCode, addressType
            }
            console.log("This is address data of user ", formData);

            axios.post(`${BASE_URL}/api/v1/users/update-address`, formData, { withCredentials: true })
                .then((res) => {
                    console.log("This is response from update address ", res);
                    window.notify(res?.data?.message, "success")
                    setOpen(false);
                    setCountry("");
                    setState("");
                    setCity("");
                    setZipCode("");
                    setAddress1("");
                    setAddress2("");
                    setZipCode("");
                    window.location.reload(true);
                })
                .catch((err) => {
                    console.log("Error at updating address", err);
                    window.notify(err?.response?.data?.message, "error")
                })
        }
    }

    const handleDelete = (addressId) => {
        axios.delete(`${BASE_URL}/api/v1/users/delete-address`, {
            data: { addressId },
            withCredentials: true
        })
            .then((res) => {
                window.notify(res?.data?.message, "success");
                window.location.reload(true);
            })
            .catch((err) => {
                console.log("error at deleting address ", err);
                window.notify(err?.response?.data?.message, "error");
            });

    }
    return (
        <div className='w-full px-5'>
            {
                open && (
                    <div className='fixed w-full h-screen bg-[#0000004b] top-0 left-0 flex items-center justify-center '>
                        <div className='w-[35%] h-[80vh] bg-white rounded shadow relative overflow-y-scroll'>
                            <div className='w-full flex justify-end p-3'>
                                <RxCross1 size={30} className='cursor-pointer' onClick={() => setOpen(false)} />
                            </div>
                            <h1 className='text-center font-Poppins text-[25px]'>
                                Add New Address
                            </h1>
                            <div>
                                <div className='w-full'>
                                    <form aria-required onSubmit={handleSubmit}>
                                        <div className='w-full block p-4'>
                                            <div className='w-full pb-2'>
                                                <label htmlFor="" className='block pb-2'>Country</label>
                                                <select name="" id="" value={country} onChange={(e) => setCountry(e.target.value)}
                                                    className='w-[95%] border h-[40px] rounded-[5px]'
                                                >
                                                    <option value="" className='block pb-2'>
                                                        Choose Your Country...
                                                    </option>
                                                    {
                                                        Country && Country.getAllCountries().map((item) => {
                                                            return <option value={item.isoCode} className='block pb-2' key={item.isoCode}>
                                                                {item.name}
                                                            </option>
                                                        })
                                                    }
                                                </select>
                                            </div>
                                            <div className='w-full pb-2'>
                                                <label htmlFor="" className='block pb-2'>State</label>
                                                <select name="" id="" value={state} onChange={(e) => setState(e.target.value)}
                                                    className='w-[95%] border h-[40px] rounded-[5px]'
                                                >
                                                    <option value="" className='block pb-2'>
                                                        Choose Your State...
                                                    </option>
                                                    {
                                                        State && State.getStatesOfCountry(country).map((item) => {
                                                            return <option value={item.isoCode} className='block pb-2' key={item.isoCode}>
                                                                {item.name}
                                                            </option>
                                                        })
                                                    }
                                                </select>
                                            </div>
                                            <div className='w-full pb-2'>
                                                <label htmlFor="" className='block pb-2'>City</label>
                                                <select name="" id="" value={city} onChange={(e) => setCity(e.target.value)}
                                                    className='w-[95%] border h-[40px] rounded-[5px]'
                                                >
                                                    <option value="" className='block pb-2'>
                                                        Choose Your City...
                                                    </option>
                                                    {
                                                        City && City.getCitiesOfState(country, state).map((item) => {
                                                            return <option value={item.isoCode} className='block pb-2' key={item.isoCode}>
                                                                {item.name}
                                                            </option>
                                                        })
                                                    }
                                                </select>
                                            </div>
                                            <div className='w-full pb-2'>
                                                <label htmlFor="" className='block pb-2'>Address 1</label>
                                                <input type="address" className={`${styles.input} !w-[95%] !border !h-[40px] !rounded-[5px]`} required value={address1} onChange={(e) => setAddress1(e.target.value)} />
                                            </div>
                                            <div className='w-full pb-2'>
                                                <label htmlFor="" className='block pb-2'>Address 2</label>
                                                <input type="address" className={`${styles.input} !w-[95%] !border !h-[40px] !rounded-[5px]`} required value={address2} onChange={(e) => setAddress2(e.target.value)} />
                                            </div>
                                            <div className='w-full pb-2'>
                                                <label htmlFor="" className='block pb-2'>Zip Code</label>
                                                <input type="number" className={`${styles.input} !w-[95%] !border !h-[40px] !rounded-[5px]`} required value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
                                            </div>
                                            <div className='w-full pb-2'>
                                                <label htmlFor="" className='block pb-2'>Address Type</label>
                                                <select name="" id="" value={addressType} onChange={(e) => setAddressType(e.target.value)}
                                                    className='w-[95%] border h-[40px] rounded-[5px]'
                                                >
                                                    <option value="" className='block pb-2'>
                                                        Choose Your Address Type...
                                                    </option>
                                                    {
                                                        addressTypeData && addressTypeData.map((item) => {
                                                            return <option value={item.name} className='block pb-2' key={item.name}>
                                                                {item?.name}
                                                            </option>
                                                        })
                                                    }
                                                </select>
                                            </div>
                                            <div className='w-full pb-2'>
                                                <input type="submit" className={`${styles.input}  mt-5 cursor-pointer bg-slate-500`} value={"Submit"} onClick={handleSubmit} />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            <div className='w-full flex items-center justify-between'>
                <h1 className='text-[25px] font-[600] text-[#000000ab] pb-2'>My Address</h1>
                <div className={`${styles.button} !rounded-md `} onClick={() => setOpen(true)} >
                    <span className='text-[#fff]' >Add New</span>
                </div>
            </div>
            <br />
            {
                user && user.addresses.map((item, index) => {
                    return <div key={index} className='w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10 mb-2'>
                        <div className='flex items-center'>
                            <h5 className='pl-5 font-[600]'>{item?.addressType}</h5>
                        </div>
                        <div className='pl-8 flex items-center'>
                            <h4>{`${item?.address1} ,${item?.address2} ,${item?.country}`}</h4>
                        </div>
                        <div className='pl-8 flex items-center'>
                            <h4>{user && user?.phoneNumber}</h4>
                        </div>
                        <div className='min-w-[10%] flex items-center justify-between pl-8'>
                            <AiOutlineDelete size={25} className='cursor-pointer hover:text-red-600' onClick={() => handleDelete(item?._id)} />
                        </div>
                    </div>
                })
            }

        </div>
    )
}


export default ProfileContent