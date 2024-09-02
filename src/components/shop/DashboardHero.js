import React, { useEffect, useState, useMemo } from 'react';
import { AiOutlineArrowRight, AiOutlineMoneyCollect, AiOutlineOrderedList, AiOutlineProduct } from 'react-icons/ai';
import styles from '../../styles/styles';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrderSeller } from '../../redux/actions/order';
import { getAllProdcutsShop } from '../../redux/actions/product';
import { DataGrid } from '@mui/x-data-grid';

const DashboardHero = () => {
    const dispatch = useDispatch();

    const { seller } = useSelector((state) => state.seller);
    const { orders } = useSelector((state) => state.orders);
    const { products } = useSelector((state) => state.products);

    useEffect(() => {
        if (seller && seller._id) {
            dispatch(getAllOrderSeller(seller._id));
            dispatch(getAllProdcutsShop(seller._id));
        }
    }, [dispatch, seller]);

    const deliveredOrder = useMemo(() => {
        return orders && orders.filter((item) => item.status === "Delivered");
    }, [orders]);

    const totalEarningWithoutTex = useMemo(() => {
        return deliveredOrder && deliveredOrder.reduce((acc, item) => acc + item.totalPrice, 0);
    }, [deliveredOrder]);

    const serviceCharge = totalEarningWithoutTex * 0.1;

    const availableBlance = totalEarningWithoutTex - serviceCharge.toFixed(2);

    const columns = useMemo(() => [
        {
            field: "id",
            headerName: "Order Id",
            minWidth: 130,
            flex: 0.8,
        },
        {
            field: "status",
            headerName: "Status",
            type: "number",
            minWidth: 130,
            flex: 0.8,
        },
        {
            field: "itemQty",
            headerName: "Qty",
            type: "number",
            minWidth: 130,
            flex: 0.8,
        },
        {
            field: "total",
            headerName: "Total",
            type: "number",
            minWidth: 130,
            flex: 0.8,
        },
        {
            field: "action",
            headerName: "",
            flex: 0.7,
            minWidth: 150,
            sortable: false,
            renderCell: (params) => {
                return (
                    <div className='flex justify-center items-center h-full'>
                        <Link to={`/dashboard/order/${params.id}`}>
                            <AiOutlineArrowRight size={20} color='#000' />
                        </Link>
                    </div>
                );
            },
        }
    ], []);

    const rows = useMemo(() => {
        return orders ? orders.map((item) => ({
            id: item._id,
            itemQty: item.cart.reduce((acc, item) => acc + item.qty, 0),
            total: item.totalPrice,
            status: item.status,
        })) : [];
    }, [orders]);

    return (
        <div className='w-full p-8 '>
            <h3 className='font-Poppins pb-2 text-[22px]'>Overview</h3>
            <div className='w-full block 800px:flex items-center justify-between '>
                <div className='w-full mb-4 min-h-[20vh] 800px:w-[30%] min-h[20vh] bg-white rounded px-2 py-5 shadow' >
                    <div className='flex items-center'>
                        <AiOutlineMoneyCollect size={30} className='mr-2 ' color='#00000085' />
                        <h3 className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000046]`}>
                            Account Balance <span className='text-[16px]'>with 10% service charges</span>
                        </h3>
                    </div>
                    <h5 className='pt-2 pl-[36px] text-[22px] font-[500]'>
                        ${availableBlance}
                    </h5>
                    <Link to={"/dashboard-withdraw-money"}>
                        <h5 className='pt-4 pl-2 text-[#077f9c]'>Withdraw Money</h5>
                    </Link>
                </div>

                <div className='w-full mb-4 min-h-[20vh] 800px:w-[30%] min-h[20vh] bg-white rounded px-2 py-5 shadow' >
                    <div className='flex items-center'>
                        <AiOutlineOrderedList size={30} className='mr-2 ' color='#00000085' />
                        <h3 className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000046]`}>
                            All Orders
                        </h3>
                    </div>
                    <h5 className='pt-2 pl-[36px] text-[22px] font-[500]'>
                        {orders && orders.length}
                    </h5>
                    <Link to={"/dashboard-orders"}>
                        <h5 className='pt-4 pl-2 text-[#077f9c]'>View Orders</h5>
                    </Link>
                </div>

                <div className='w-full mb-4 min-h-[20vh] 800px:w-[30%] min-h[20vh] bg-white rounded px-2 py-5 shadow' >
                    <div className='flex items-center'>
                        <AiOutlineProduct size={30} className='mr-2 ' color='#00000085' />
                        <h3 className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000046]`}>
                            All Prodcuts
                        </h3>
                    </div>
                    <h5 className='pt-2 pl-[36px] text-[22px] font-[500]'>
                        {products && products.length}
                    </h5>
                    <Link to={"/dashboard-products"}>
                        <h5 className='pt-4 pl-2 text-[#077f9c]'>View Products</h5>
                    </Link>
                </div>
            </div>
            <br />
            <h3 className='text-[22px] font-Poppins pb-2 '>Latest Orders</h3>
            <div className='w-full min-h-[35vh] bg-white rounded'>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    disableSelectionOnClick
                    autoHeight
                    className="w-full"
                />
            </div>
        </div>
    );
};

export default DashboardHero;
