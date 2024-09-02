import axios from "axios";
import { BASE_URL } from "../../server";


// get all order of user
export const getAllOrderUser = (userId) => async (dispatch) => {
    // console.log("id received ", id);

    try {
        dispatch({
            type: "getAllOrdersUsertRequest",
        });

        // const config = { headers: { "Content-Type": "multipart/form-data" } };
        const { data } = await axios.get(`${BASE_URL}/api/v1/order/get-all-orders/${userId}`);
        // console.log("Data is form producct request ", data);

        dispatch({
            type: "getAllOrdersUserSuccess",
            payload: data?.orders,
        });

    } catch (error) {
        dispatch({
            type: "getAllOrdersUserFail",
            payload: error.response.data.message,
        });
    }
};
// get all order of seller
export const getAllOrderSeller = (sellerId) => async (dispatch) => {
    // console.log("id received ", id);

    try {
        dispatch({
            type: "getAllOrdersSellerRequest",
        });

        // const config = { headers: { "Content-Type": "multipart/form-data" } };
        const { data } = await axios.get(`${BASE_URL}/api/v1/order/get-all-seller-orders/${sellerId}`);
        // console.log("Data is form producct request ", data);

        dispatch({
            type: "getAllOrdersSellerSuccess",
            payload: data?.orders,
        });

    } catch (error) {
        dispatch({
            type: "getAllOrdersSellerFail",
            payload: error.response.data.message,
        });
    }
};