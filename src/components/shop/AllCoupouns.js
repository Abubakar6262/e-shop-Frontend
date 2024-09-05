import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, getAllProdcutsShop } from '../../redux/actions/product';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai';
import Loader from '../../Loader';
import { DataGrid } from '@mui/x-data-grid';
import styles from '../../styles/styles';
import { RxCross1 } from 'react-icons/rx';
import axios from 'axios';
import { BASE_URL } from '../../server';

const AllCoupouns = () => {
    const { products } = useSelector((state) => state.products);
    const { seller } = useSelector((state) => state.seller);
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false)
    const [name, setName] = useState("")
    const [value, setValue] = useState("")
    const [minAmount, setMinAmount] = useState("")
    const [maxAmount, setMaxAmount] = useState("")
    const [selectedProduct, setSelectedProduct] = useState("")
    const [isProcessing, setIsProcessing] = useState(true)
    const [coupounsData,setCoupounsData] = useState([])
    useEffect(async() => {
        await axios.get(`${BASE_URL}/api/v1/coupoun/get-coupoun-code/${seller._id}`, { withCredentials: true })
            .then((res) => {
                // console.log("All coupouns ", res.data.coupounCodes);
                setCoupounsData(res.data.coupounCodes)
            })
            .catch((err) => {
                console.log("Error at getting coupouns", err);

            })
            .finally(() => {
                setIsProcessing(false)
            })
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post(`${BASE_URL}/api/v1/coupoun/create-coupoun-code`, {
            name, value, minAmount, maxAmount, selectedProduct,
            shop: seller
        }, { withCredentials: true })
            .then((res) => {
                // console.log(res);
                window.notify("Coupouns created successfully")
            })
            .catch((err) => {
                console.log("Error at create coupoun", err);
                window.notify("some issue at creating coupons code", "error")
            })
    }

    const handleDelete = (productId) => {
        dispatch(deleteProduct(productId));
        window.notify("Product deleted successfully", "success");
        window.location.reload(true);
    }

    const columns = [
        {
            field: "id",
            headerName: "Product ID",
            minWidth: 150,
            flex: 0.7,
        },
        {
            field: "name",
            headerName: "Product Name",
            minWidth: 150,
            flex: 1.4,
        },
        {
            field: "price",
            headerName: "Price",
            minWidth: 150,
            flex: 1.4,
        },
        {
            field: "Preview",
            headerName: "",
            minWidth: 100,
            flex: 0.5,
            sortable: false,
            renderCell: (params) => {
                const d = params.row.name;
                const product_name = d.replace(/\s+/g, '-');
                return (
                    <Link to={`/product/${product_name}`}>
                        <Button>
                            <AiOutlineEye size={20} />
                        </Button>
                    </Link>
                );
            }
        },
        {
            field: "action",
            headerName: "Delete",
            flex: 0.7,
            minWidth: 150,
            sortable: false,
            renderCell: (params) => {
                return (
                    <div className='flex justify-end items-center mt-2'>
                        <button className="btn btn-primary !bg-red-500">
                            <AiOutlineDelete size={20} color='#fff' onClick={() => handleDelete(params.id)} />
                        </button>
                    </div>
                );
            },
        },
    ];

    const rows = coupounsData ? coupounsData.map((item) => ({
        id: item._id,
        name: item.name,
        price:item.value,
    })) : [];

    return (
        <>
            {isProcessing ? (
                <Loader />
            ) : (
                <div className='w-full p-4 mt-10 bg-white md:p-8 lg:p-12'>
                    <div className='w-full flex justify-end'>
                        <div className={`${styles.button} !w-max !rounded-[5px] !h-[40px] px-3 mr-3 !mb-3 `} onClick={() => setOpen(true)}>
                            <span className='text-white'>Create Coupoun Code</span>
                        </div>
                    </div>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        disableSelectionOnClick
                        autoHeight
                        className="w-full"
                    />

                    {
                        open && (
                            <div className='fixed top-0 left-0 w-full h-screen bg-[#00000062] z-[20000] flex items-center justify-center '>
                                <div className='w-[90%] 800px:w-[40%] h-[90vh] p-4 bg-white rounded-md shadow relative overflow-y-scroll'>
                                    <div className='w-full flex justify-end'>
                                        <RxCross1 size={30} className='cursor-pointer fixed' onClick={() => setOpen(false)} />
                                    </div>
                                    <h5 className='text-[30px] font-Poppins text-center'>Create Coupoun Code</h5>
                                    <form onSubmit={handleSubmit} aria-required={true}>
                                        <br />
                                        <div>
                                            <label htmlFor="" className='pb-2'>
                                                Coupoun Name <span className='text-red-500'>*</span>
                                            </label>
                                            <input type="text" required className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm'
                                                name='name' value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter Your Coupoun Name...' />
                                        </div>
                                        <br />
                                        <div>
                                            <label htmlFor="" className='pb-2'>
                                                Discount Percentage <span className='text-red-500'>*</span>
                                            </label>
                                            <input type="text" required className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm'
                                                name='value' value={value} onChange={(e) => setValue(e.target.value)} placeholder='Enter Your Coupoun code value...' />
                                        </div>
                                        <br />
                                        <div>
                                            <label htmlFor="" className='pb-2'>
                                                Minimum Amount <span className='text-red-500'>*</span>
                                            </label>
                                            <input type="text" className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm'
                                                name='minAmount' value={minAmount} onChange={(e) => setMinAmount(e.target.value)} placeholder='Enter Your Coupoun code Min Amount...' />
                                        </div>
                                        <br />
                                        <div>
                                            <label htmlFor="" className='pb-2'>
                                                Maximum Amount <span className='text-red-500'>*</span>
                                            </label>
                                            <input type="text" className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm'
                                                name='maxAmount' value={maxAmount} onChange={(e) => setMaxAmount(e.target.value)} placeholder='Enter Your Coupoun code max Amount...' />
                                        </div>
                                        <br />
                                        <div>
                                            <label htmlFor="" className='pb-2'>
                                                Select Product<span className='text-red-500'>*</span>
                                            </label>
                                            <select name="" id=""
                                                className='w-full mt-3 border h-[35px] rounded-[5px]'
                                                value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)}
                                            >
                                                <option value="Choose selected prodcuts">Choose a Product... </option>{
                                                    products && products.map((item) => {
                                                        return <option value={item.name} key={item.name}>{item.name}</option>
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <br />
                                        <div>
                                            <input type="submit" value={'Create'} className='mt-2 cursor-pointer appearance-none block w-full px-3 h-[35px] bg-slate-400 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm' />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )
                    }
                </div>
            )}
        </>
    );
};

export default AllCoupouns;
