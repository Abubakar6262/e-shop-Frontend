import { createReducer } from "@reduxjs/toolkit";

const initialProductState = {
    isProductLoading: true,
    product: null,
    error: null,
    success: false,
};

export const orderReducer = createReducer(initialProductState, (builder) => {
    builder
        // get all Orders
        .addCase("getAllOrdersUsertRequest", (state) => {
            state.isProductLoading = true;
        })
        .addCase("getAllOrdersUserSuccess", (state, action) => {
            state.isProductLoading = false;
            state.orders = action.payload;
            state.success = true;
        })
        .addCase("getAllOrdersUserFail", (state, action) => {
            state.isProductLoading = false;
            state.error = action.payload;
        })

        // get all order of seller
        .addCase("getAllOrdersSellerRequest", (state) => {
            state.isProductLoading = true;
        })
        .addCase("getAllOrdersSellerSuccess", (state, action) => {
            state.isProductLoading = false;
            state.orders = action.payload;
            state.success = true;
        })
        .addCase("getAllOrdersSellerFail", (state, action) => {
            state.isProductLoading = false;
            state.error = action.payload;
        })

        .addCase("clearError", (state) => {
            state.error = null;
        });
});
