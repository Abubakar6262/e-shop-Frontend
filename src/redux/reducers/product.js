import { createReducer } from "@reduxjs/toolkit";

const initialProductState = {
    isProductLoading: true,
    product: null,
    error: null,
    success: false,
};

export const productReducer = createReducer(initialProductState, (builder) => {
    builder
        .addCase("productCreateRequest", (state) => {
            state.isProductLoading = true;
        })
        .addCase("productCreateSuccess", (state, action) => {
            state.isProductLoading = false;
            state.product = action.payload;
            state.success = true;
        })
        .addCase("productCreateFail", (state, action) => {
            state.isProductLoading = false;
            state.error = action.payload;
            state.success = false;
        })

        // get all products
        .addCase("getAllProductRequest", (state) => {
            state.isProductLoading = true;
        })
        .addCase("getAllProductSuccess", (state, action) => {
            state.isProductLoading = false;
            state.products = action.payload;
            state.success = true;
        })
        .addCase("getAllProductFail", (state, action) => {
            state.isProductLoading = false;
            state.error = action.payload;
        })
        // get all products of shop
        .addCase("getAllProductShopRequest", (state) => {
            state.isProductLoading = true;
        })
        .addCase("getAllProductShopSuccess", (state, action) => {
            state.isProductLoading = false;
            state.products = action.payload;
            state.success = true;
        })
        .addCase("getAllProductShopFail", (state, action) => {
            state.isProductLoading = false;
            state.error = action.payload;
        })

        // delete product shop
        .addCase("deleteProductRequest", (state) => {
            state.isProductLoading = true;
        })
        .addCase("deleteProductSuccess", (state, action) => {
            state.isProductLoading = false;
            state.message = action.payload;
            state.success = true;
        })
        .addCase("deleteProductFail", (state, action) => {
            state.isProductLoading = false;
            state.error = action.payload;
        })


        .addCase("clearError", (state) => {
            state.error = null;
        });
});
