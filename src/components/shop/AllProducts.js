import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, getAllProdcutsShop } from '../../redux/actions/product';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai';
import Loader from '../../Loader';
import { DataGrid } from '@mui/x-data-grid';

const AllProducts = () => {
    const { isProductLoading, products } = useSelector((state) => state.products);
    const { seller } = useSelector((state) => state.seller);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllProdcutsShop(seller._id));
    }, [dispatch, seller._id]);

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
            field: "originalPrice",
            headerName: "Price",
            minWidth: 10,
            flex: 0.7,
        },
        {
            field: "discountPrice",
            headerName: "Disc.Price",
            minWidth: 100,
            flex: 0.7,
        },
        {
            field: "stock",
            headerName: "Stock",
            minWidth: 80,
            flex: 0.5,
        },
        {
            field: "sold_out",
            headerName: "Sold Out",
            minWidth: 80,
            flex: 0.5,
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

    const rows = products ? products.map((item) => ({
        id: item._id,
        name: item.name,
        originalPrice: item.originalPrice,
        discountPrice: item.discountPrice,
        stock: item.stock,
        sold_out: item.sold_out,
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

export default AllProducts;
