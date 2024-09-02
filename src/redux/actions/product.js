import axios from "axios";
import { BASE_URL } from "../../server";

// Create Product
export const createProduct = (newForm) => async (dispatch) => {
    try {
        dispatch({
            type: "productCreateRequest",
        });

        const config = { headers: { "Content-Type": "multipart/form-data" } };
        const { data } = await axios.post(`${BASE_URL}/api/v1/product/create-product`, newForm, config);

        dispatch({
            type: "productCreateSuccess",
            payload: data.product,
        });

    } catch (error) {
        dispatch({
            type: "productCreateFail",
            payload: error.response.data.message,
        });
    }
};



// get all products
export const getAllProdcuts = () => async (dispatch) => {
    // console.log("id received ", id);

    try {
        dispatch({
            type: "getAllProductRequest",
        });

        // const config = { headers: { "Content-Type": "multipart/form-data" } };
        const { data } = await axios.get(`${BASE_URL}/api/v1/product/get-all-products`);
        // console.log("Data is form producct request ", data);

        dispatch({
            type: "getAllProductSuccess",
            payload: data.products,
        });

    } catch (error) {
        dispatch({
            type: "getAllProductsFailed",
            payload: error.response.data.message,

        });
        // console.log("error at getallproductshop  =>", error);

    }
};
// get all products of shop
export const getAllProdcutsShop = (id) => async (dispatch) => {
    // console.log("id received ", id);

    try {
        dispatch({
            type: "getAllProductShopRequest",
        });

        // const config = { headers: { "Content-Type": "multipart/form-data" } };
        const { data } = await axios.get(`${BASE_URL}/api/v1/product/get-all-products-shop/${id}`);
        // console.log("Data is form producct request ", data);

        dispatch({
            type: "getAllProductShopSuccess",
            payload: data.products,
        });

    } catch (error) {
        dispatch({
            type: "getAllProductsShopFailed",
            payload: error.response.data.message,

        });
        // console.log("error at getallproductshop  =>", error);

    }
};

// Delete product
export const deleteProduct = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "deleteProductRequest",
        });
        const { data } = await axios.delete(`${BASE_URL}/api/v1/product/delete-shop-product/${id}`);

        dispatch({
            type: "deleteProductSuccess",
            payload: data.message,
        });

    } catch (error) {
        dispatch({
            type: "deleteProductFail",
            payload: error.response.data.message,

        });
        // console.log("error at getallproductshop  =>", error);

    }
};