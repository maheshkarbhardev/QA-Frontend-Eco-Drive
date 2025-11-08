import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addProductAPI,
  deleteProductAPI,
  getAllProductsAPI,
  getCategoriesAPI,
  getUsageUnitsAPI,
  updateProductAPI,
  getProductByIdAPI,
} from "./productAPI";

const initialState = {
  products: [],
  selectedProduct: null,
  categories: [],
  usageUnits: [],
  loading: false,
  error: null,
  successMessage: "",
};

// Get all products
export const getAllProducts = createAsyncThunk("product/getAllProducts", async () => {
  const res = await getAllProductsAPI();
  return res.data;
});

//  Get product by ID
export const getProductById = createAsyncThunk("product/getProductById", async (id) => {
  const res = await getProductByIdAPI(id);
  return res.data;
});

//  Get categories
export const getCategories = createAsyncThunk("product/getCategories", async () => {
  const res = await getCategoriesAPI();
  return res.data;
});

//  Get usage units
export const getUsageUnits = createAsyncThunk("product/getUsageUnits", async () => {
  const res = await getUsageUnitsAPI();
  return res.data;
});

//  Add new product
export const addProduct = createAsyncThunk("product/addProduct", async (formData) => {
  const res = await addProductAPI(formData);
  return res;
});

//  Update product
export const updateProduct = createAsyncThunk("product/updateProduct", async ({ id, formData }) => {
  const res = await updateProductAPI({ id, formData });
  return { id, ...res };
});

//  Delete product
export const deleteProduct = createAsyncThunk("product/deleteProduct", async (id) => {
  await deleteProductAPI(id);
  return id;
});

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearMessages: (state) => {
      state.successMessage = "";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get all products
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //  Get product by ID
      .addCase(getProductById.fulfilled, (state, action) => {
        state.selectedProduct = action.payload;
      })

      // Add product
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.unshift(action.payload);
        state.successMessage = "Product Added Successfully.";
      })

      // Update product
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) state.products[index] = { ...state.products[index], ...action.payload };
        state.successMessage = "Product Updated Successfully.";
      })

      // Delete product
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((p) => p.id !== action.payload);
        state.successMessage = "Product Deleted Successfully.";
      })

      // Get categories
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })

      // Get usage units
      .addCase(getUsageUnits.fulfilled, (state, action) => {
        state.usageUnits = action.payload;
      });
  },
});

export const { clearMessages } = productSlice.actions;
export default productSlice.reducer;
