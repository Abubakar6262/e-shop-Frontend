import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { AiOutlineArrowRight, AiOutlineDelete, AiOutlineEye } from 'react-icons/ai';
import Loader from '../../Loader';
import { DataGrid } from '@mui/x-data-grid';
import { getAllOrderSeller } from '../../redux/actions/order';

const AllOrders = () => {
    const { isProductLoading, orders } = useSelector((state) => state.orders);
    const { seller } = useSelector((state) => state.seller);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllOrderSeller(seller._id));
    }, [dispatch, seller._id]);



    // const handleDelete = (productId) => {
    //     dispatch(deleteProduct(productId));
    //     window.notify("Product deleted successfully", "success");
    //     window.location.reload(true);
    // }



    const columns = [
        {
            field: "id",
            headerName: "Product ID",
            minWidth: 150,
            flex: 0.7,
        },
        {
            field: "status",
            headerName: "Status",
            minWidth: 150,
            flex: 1.4,
        },
        {
            field: "itemqty",
            headerName: "Qty.",
            minWidth: 150,
            flex: 1.4,
        },
        {
            field: "totalPrice",
            headerName: "Total Price",
            minWidth: 80,
            flex: 0.5,
        },
        {
            field: "Preview",
            headerName: "",
            minWidth: 100,
            flex: 0.5,
            sortable: false,
            // renderCell: (params) => {
            //     const d = params.row.name;
            //     const product_name = d.replace(/\s+/g, '-');
            //     return (
            //         <Link to={`/product/${product_name}`}>
            //             <Button>
            //                 <AiOutlineEye size={20} />
            //             </Button>
            //         </Link>
            //     );
            // }
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
                        <Link to={`/order/${params.id}`}>
                            <AiOutlineArrowRight size={20} color='#000' />
                        </Link>
                    </div>
                );
            },
        }
    ];

    const rows = orders ? orders.map((item) => ({
        id: item._id,
        status: item.status,
        totalPrice: item.totalPrice,
        itemqty: item.cart.length,
        // discountPrice: item.discountPrice,
        // sold_out: item.sold_out,
    })) : [];


    return (
        <>
            {isProductLoading ? (
                <Loader />
            ) : (
                <div className='w-full p-4 mt-10 bg-white md:p-8 lg:p-12'>
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
            )}
        </>
    );
};

export default AllOrders;
