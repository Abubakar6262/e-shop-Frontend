// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import { BASE_URL } from "../../server";

// export const loadUser = createAsyncThunk(
//     'user/loadUser',
//     async (_, { rejectWithValue }) => {
//         try {
//             const { data } = await axios.get(`${BASE_URL}/api/v1/users/getuser`, { withCredentials: true });
//             return data.user;
//         } catch (error) {
//             return rejectWithValue(error.response.data.message);
//         }
//     }
// );


// export const loadSeller = createAsyncThunk(
//     'shop/loadSeller ',
//     async (_, { rejectWithValue }) => {
//         try {
//             const { data } = await axios.get(`${BASE_URL}/api/v1/shop/getseller`, { withCredentials: true });
//             // console.log("this data for seller ", data);

//             return data.seller;
//         } catch (error) {
//             return rejectWithValue(error.response.data.message);
//         }
//     }
// );



import axios from "axios";
import { BASE_URL } from "../../server";

// Load User
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: "userLoadRequest" });

        const { data } = await axios.get(`${BASE_URL}/api/v1/users/getuser`, { withCredentials: true });

        dispatch({
            type: "userLoadSuccess",
            payload: data.user,
        });
    } catch (error) {
        dispatch({
            type: "userLoadFail",
            payload: error.response.data.message,
        });
    }
};

// Load Seller
export const loadSeller = () => async (dispatch) => {
    try {
        dispatch({ type: "sellerLoadRequest" });

        const { data } = await axios.get(`${BASE_URL}/api/v1/shop/getseller`, { withCredentials: true });

        dispatch({
            type: "sellerLoadSuccess",
            payload: data.seller,
        });
    } catch (error) {
        dispatch({
            type: "sellerLoadFail",
            payload: error.response.data.message,
        });
    }
};

// export const updateUserInformation = () => async (dispatch, action) => {
//     try {
//         dispatch({ type: "updateUserInfoRequest" });

//         const { data } = await axios.get(`${BASE_URL}/api/v1/shop/getseller`, { withCredentials: true });

//         dispatch({
//             type: "updateUserInfoSuccess",
//             payload: data.seller,
//         });
//     } catch (error) {
//         dispatch({
//             type: "sellerLoadFail",
//             payload: error.response.data.message,
//         });
//     }
// }

