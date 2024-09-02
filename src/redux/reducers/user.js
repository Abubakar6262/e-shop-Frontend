import { createReducer } from "@reduxjs/toolkit";
import { loadUser } from "../actions/user";

// const initialState = {
//     isAuthenticated: false,
//     loading: false,
//     user: null,
//     error: null
// };

// export const userReducer = createReducer(initialState, (builder) => {
//     builder
//         .addCase(loadUser.pending, (state) => {
//             state.loading = true;
//         })
//         .addCase(loadUser.fulfilled, (state, action) => {
//             state.isAuthenticated = true;
//             state.loading = false;
//             state.user = action.payload;
//             state.error = null;
//         })
//         .addCase(loadUser.rejected, (state, action) => {
//             state.loading = false;
//             state.error = action.payload;
//             state.isAuthenticated = false;
//         });
// });

const initialState = {
    isAuthenticated: false,
    loading: false,
    user: null,
    error: null
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "userLoadRequest":
            return {
                ...state,
                loading: true,
            };
        case "userLoadSuccess":
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload,
                error: null,
            };
        case "userLoadFail":
            return {
                ...state,
                loading: false,
                error: action.payload,
                isAuthenticated: false,
            };
        // update user information
        case "updateUserInfoRequest":
            return {
                ...state,
                loading: true,
            };
        case "updateUserInfoSuccess":
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload,
                error: null,
            };
        case "updateUserInfoFail":
            return {
                ...state,
                loading: false,
                error: action.payload,
                isAuthenticated: false,
            };

        default:
            return state;
    }
};

