import { combineReducers, configureStore } from "@reduxjs/toolkit";

import usersReducer from "./users";
import cakesReducer from "./cakes";

const rootReducer = combineReducers({
    users: usersReducer,
    cakes: cakesReducer
});

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}
