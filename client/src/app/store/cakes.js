import { createSlice, createAction } from "@reduxjs/toolkit";
import cakesServices from "../services/cakesService";
import history from "../utils/histore";

const cakesSlice = createSlice({
    name: "cakes",
    initialState: { entities: null, error: null, isLoading: null },
    reducers: {
        cakesRequestes: (state) => {
            state.isLoading = true;
        },
        cakesReceved: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        cakesRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        cakeModifyed: (state, action) => {
            const index = state.entities.findIndex(
                (i) => i._id === action.payload._id
            );
            state.entities[index] = action.payload;
        },
        cakeCreated: (state, action) => {
            state.entities.push(action.payload);
            state.isLoading = false;
        },
        cakesRemoved: (state, action) => {
            state.entities = state.entities.filter(
                (c) => c._id !== action.payload
            );
            state.isLoading = false;
        }
    }
});

const { reducer: cakesReducer, actions } = cakesSlice;
const {
    cakesRequestes,
    cakesReceved,
    cakesRequestFailed,
    cakeModifyed,
    cakesRemoved,
    cakeCreated
} = actions;

const cakeModifyRequsted = createAction("users/userModifyRequsted");
const cakeModifyFailed = createAction("users/userModifyFailed");

export const loadCakesList = () => async (dispatch) => {
    dispatch(cakesRequestes());
    try {
        const { content } = await cakesServices.get();
        dispatch(cakesReceved(content));
    } catch (error) {
        dispatch(cakesRequestFailed(error.message));
    }
};

export const modifyCake = (payload) => async (dispatch) => {
    dispatch(cakeModifyRequsted());
    try {
        const { content } = await cakesServices.patch(payload);
        dispatch(cakeModifyed(content));
    } catch (error) {
        dispatch(cakeModifyFailed(error.message));
    }
};

export const addCake = (payload) => async (dispatch) => {
    // dispatch(authRequested());
    try {
        const { content } = await cakesServices.register(payload);

        dispatch(cakeCreated(content));
        // localStorageSevice.setToken(data);
        // dispatch(authRequestSuccess({ userId: data.userId }));
        history.push("/catalog");
    } catch (error) {
        dispatch(cakeModifyFailed(error.message));
    }
};

export const removeCake = (id) => async (dispatch) => {
    dispatch(cakesRequestes());
    try {
        await cakesServices.removeCakes(id);
        dispatch(cakesRemoved(id));
    } catch (error) {
        dispatch(cakesRequestFailed(error.message));
    }
};

export const getCakes = () => (state) => state.cakes.entities;
export const getCakesLoadingStatus = () => (state) => state.cakes.isLoading;
export const getCakesByIds = (cakesId) => (state) => {
    if (state.cakes.entities) {
        for (const cakeId of state.cakes.entities) {
            if (cakeId._id === cakesId) {
                return cakeId;
            }
        }
        return [];
    }
};

export default cakesReducer;
