import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { getAllCustomersAPI } from "./customerAPI";

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
}

//get all customers
export const getAllCustomers=createAsyncThunk("customer/getAllCustomers",async()=>{
    const res=await getAllCustomersAPI();
    // console.log("getAllCustomers :- ",res.data);    
    return res.data;
});

const customerSlice=createSlice({
    name:"customer",
    initialState,
    reducers:{
        clearMessages:(state)=>{
            state.successMessage="";
            state.error=null;
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

export const {clearMessages}=customerSlice.actions;
export default customerSlice.reducer;