import { configureStore } from "@reduxjs/toolkit";
import { applyMiddleware, compose } from "redux";
import indexReducer from '../reducers/index';
import { thunk } from "redux-thunk";

const store = configureStore({
    reducer: indexReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
})


export default store;
