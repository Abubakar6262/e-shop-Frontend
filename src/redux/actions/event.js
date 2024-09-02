import axios from "axios";
import { BASE_URL } from "../../server";

// Create Event
export const createEvent = (newForm) => async (dispatch) => {
    try {
        dispatch({
            type: "eventCreateRequest",
        });

        const config = { headers: { "Content-Type": "multipart/form-data" } };
        const { data } = await axios.post(`${BASE_URL}/api/v1/event/create-event`, newForm, config);

        dispatch({
            type: "eventCreateSuccess",
            payload: data.event,
        });

    } catch (error) {
        dispatch({
            type: "eventCreateFail",
            payload: error.response.data.message,
        });
    }
};



// get all Events of spacific shop
export const getAllEvents = () => async (dispatch) => {
    // console.log("id received ", id);

    try {
        dispatch({
            type: "getAllEventRequest",
        });

        // const config = { headers: { "Content-Type": "multipart/form-data" } };
        const { data } = await axios.get(`${BASE_URL}/api/v1/event/get-all-events`);
        console.log("Data is form producct request ", data);

        dispatch({
            type: "getAllEventSuccess",
            payload: data?.allevents,
        });

    } catch (error) {
        dispatch({
            type: "getAllEventFail",
            payload: error?.response?.data?.message,

        });
        // console.log("error at getallEventshop  =>", error);

    }
};
export const getAllEventsShop = (id) => async (dispatch) => {
    // console.log("id received ", id);

    try {
        dispatch({
            type: "getAllEventShopRequest",
        });

        // const config = { headers: { "Content-Type": "multipart/form-data" } };
        const { data } = await axios.get(`${BASE_URL}/api/v1/event/get-all-events-shop/${id}`);
        console.log("Data is form producct request ", data);

        dispatch({
            type: "getAllEventShopSuccess",
            payload: data.events,
        });

    } catch (error) {
        dispatch({
            type: "getAllEventShopFail",
            payload: error.response.data.message,

        });
        // console.log("error at getallEventshop  =>", error);

    }
};

// Delete Event
export const deleteEvent = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "deleteEventRequest",
        });
        const { data } = await axios.delete(`${BASE_URL}/api/v1/event/delete-shop-event/${id}`);

        dispatch({
            type: "deleteEventSuccess",
            payload: data.message,
        });

    } catch (error) {
        dispatch({
            type: "deleteEventFail",
            payload: error.response.data.message,

        });
        // console.log("error at getallEventshop  =>", error);

    }
};