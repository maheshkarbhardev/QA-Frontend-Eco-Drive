import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { getAllCustomersAPI } from "./customerAPI";
import axiosInstance from "../../api/axiosInstance";

const initialState={
    customers:[],
    selectedCustomer:null,
    state:[],
    district:[],
    taluka:[],
    city:[],
    loading:false,
    error:null,
    successMessage:"",
    latitude:"",
    longitude:"",
    mapConfirmation : false,
    latlng : { lat : '', lng : ''},
    address : ""
}

//get all customers
export const getAllCustomers=createAsyncThunk("customer/getAllCustomers",async()=>{
    const res=await getAllCustomersAPI();
    // console.log("getAllCustomers :- ",res.data);    
    return res.data;
});

export const deleteCustomer = createAsyncThunk(
  "customers/deleteCustomer",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.delete(`/customer/deleteCustomer/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const customerSlice=createSlice({
    name:"customer",
    initialState,
    reducers:{
        clearMessages:(state)=>{
            state.successMessage="";
            state.error=null;
        },
        setInitialCurrentPosition:(state,action)=>{
            state.latitude="";
            state.longitude="";
            state.latlng={
                lat:"",
                lng:""
            }
        }
    },

    extraReducers:(builder)=>{
        builder
        .addCase(getAllCustomers.pending,(state)=>{
            state.loading=true;
        })
        .addCase(getAllCustomers.fulfilled,(state,action)=>{
            state.loading=false;
            state.customers=action.payload;
        })
        .addCase(getAllCustomers.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error.message;
        })
    }
});

export const {clearMessages,setInitialCurrentPosition}=customerSlice.actions;
export default customerSlice.reducer;