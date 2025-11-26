import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
// import axiosInstance from "../../../api/axiosInstance";

// ==============================
// GET CUSTOMER BY ID (Async Thunk)
// ==============================
export const getCustomerById = createAsyncThunk(
  "customerEdit/getCustomerById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/customer/getCustomer/${id}`);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error fetching customer");
    }
  }
);

// ==============================
// UPDATE CUSTOMER (Async Thunk)
// ==============================
export const updateCustomer = createAsyncThunk(
  "customerEdit/updateCustomer",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(
        `/customer/updateCustomer/${id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Update failed");
    }
  }
);

// ==============================
// REDUCER SLICE
// ==============================
const customerEditSlice = createSlice({
  name: "customerEdit",
  initialState: {
    loading: false,
    customerData: null,
    success: false,
    error: null,
  },

  reducers: {
    resetCustomerEdit(state) {
      state.customerData = null;
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // GET
      .addCase(getCustomerById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCustomerById.fulfilled, (state, action) => {
        state.loading = false;
        state.customerData = action.payload;
      })
      .addCase(getCustomerById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.customerData = null;
      })

      // UPDATE
      .addCase(updateCustomer.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(updateCustomer.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateCustomer.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const { resetCustomerEdit } = customerEditSlice.actions;
export default customerEditSlice.reducer;
