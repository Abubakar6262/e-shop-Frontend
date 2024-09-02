
// add To Cart
export const addToCart = (data) => async (dispatch, getState) => {
    dispatch({
        type: "addToCart",
        payload: data,
    })

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
    return data;
}


// Remove item from cart

export const removeFromCart = (data) => async (dispatch, getState) => {
    dispatch({
        type: "removeFromCart",
        payload: data._id,
    })

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
    return data;
}