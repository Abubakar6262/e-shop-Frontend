import { createReducer } from "@reduxjs/toolkit";
import { loadSeller } from "../actions/user";


// const initialSellerState = {
//     isSellerAuthenticated: false,
//     isLoading: false,
//     seller: null,
//     error: null
// };

// export const sellerReducer = createReducer(initialSellerState, (builder) => {
//     builder
//         .addCase(loadSeller.pending, (state) => {
//             state.isLoading = true;
//         })
//         .addCase(loadSeller.fulfilled, (state, action) => {
//             state.isSellerAuthenticated = true;
//             state.isLoading = false;
//             state.seller = action.payload;
//             state.error = null; // Clear error on success
//         })
//         .addCase(loadSeller.rejected, (state, action) => {
//             state.isLoading = false;
//             state.error = action.payload;
//             state.isSellerAuthenticated = false;
//         });
// });

const initialSellerState = {
    isSellerAuthenticated: false,
    isLoading: false,
    seller: null,
    error: null,
};

export const sellerReducer = (state = initialSellerState, action) => {
    switch (action.type) {
        case "sellerLoadRequest":
            return {
                ...state,
                isLoading: true,
            };
        case "sellerLoadSuccess":
            return {
                ...state,
                isSellerAuthenticated: true,
                isLoading: false,
                seller: action.payload,
                error: null,
            };
        case "sellerLoadFail":
            return {
                ...state,
                isLoading: false,
                error: action.payload,
                isSellerAuthenticated: false,
            };
        default:
            return state;
    }
};
