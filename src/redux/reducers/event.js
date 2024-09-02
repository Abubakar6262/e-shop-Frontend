import { createReducer } from "@reduxjs/toolkit";

const initialProductState = {
    isEventLoading: true,
    event: null,
    error: null,
    success: false,
};

export const eventReducer = createReducer(initialProductState, (builder) => {
    builder
        .addCase("eventCreateRequest", (state) => {
            state.isEventLoading = true;
        })
        .addCase("eventCreateSuccess", (state, action) => {
            state.isEventLoading = false;
            state.event = action.payload;
            state.success = true;
        })
        .addCase("eventCreateFail", (state, action) => {
            state.isEventLoading = false;
            state.error = action.payload;
            state.success = false;
        })

        // get all products of shop
        .addCase("getAllEventShopRequest", (state) => {
            state.isEventLoading = true;
        })
        .addCase("getAllEventShopSuccess", (state, action) => {
            state.isEventLoading = false;
            state.events = action.payload;
            state.success = true;
        })
        .addCase("getAllEventShopFail", (state, action) => {
            state.isEventLoading = false;
            state.error = action.payload;
        })
        // get all products
        .addCase("getAllEventRequest", (state) => {
            state.isEventLoading = true;
        })
        .addCase("getAllEventSuccess", (state, action) => {
            state.isEventLoading = false;
            state.events = action.payload;
            state.success = true;
        })
        .addCase("getAllEventFail", (state, action) => {
            state.isEventLoading = false;
            state.error = action.payload;
        })

        // delete product shop
        .addCase("deleteEventRequest", (state) => {
            state.isEventLoading = true;
        })
        .addCase("deleteEventSuccess", (state, action) => {
            state.isEventLoading = false;
            state.message = action.payload;
            state.success = true;
        })
        .addCase("deleteEventFail", (state, action) => {
            state.isEventLoading = false;
            state.error = action.payload;
        })


        .addCase("clearError", (state) => {
            state.error = null;
        });
});
