import {configureStore} from '@reduxjs/toolkit'; //import configureStore which help to creates a Redux store
import authReducer from '../features/auth/authSlice';
import storage from 'redux-persist/lib/storage'; //redux-persist/lib/storage is the default web storage — it uses localStorage in the browser to save state between page reloads.
import {persistReducer} from 'redux-persist'; //Imports persistReducer, a function that wraps a normal reducer and adds persistence behavior (reads/writes to storage automatically).
import { combineReducers } from '@reduxjs/toolkit'; //combineReducers lets you combine multiple slice reducers into a single root reducer object keyed by slice name.
import productReducer from '../features/productManagement/productSlice';
import customerReducer from '../features/customerManagement/customerSlice';
import locationReducer from '../features/customerManagement/locationSlice';
import customerEditReducer from "../features/customerManagement/customerEditSlice";

const persistConfig={
    key:"root",  //the top-level key under which the persisted state will be stored in localStorage.
    version: 1,  //a version number for migrations
    storage    //the storage engine to use (the localStorage-based engine you imported above).
};

const reducer=combineReducers({ //Combines your slice reducers into one root reducer.
    auth:authReducer,
    product:productReducer,
    customer:customerReducer,
    location:locationReducer,
    customerEdit: customerEditReducer,
});

const persistedReducer = persistReducer(persistConfig,reducer);//persistedReducer behaves like your root reducer, but it also saves state to and loads state from localStorage automatically.

export const store=configureStore({ //Creates the Redux store using configureStore, and uses the persistedReducer as the store reducer.
    reducer: persistedReducer
})