import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signInUserAPI, signUpUserAPI } from "./authApi";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null, // Load from localStorage
  token: localStorage.getItem("token") || null, //  Persisted token
};

// Async thunk for signup
export const signUpUser = createAsyncThunk("auth/signUpUser", async (formData) => {
  const res = await signUpUserAPI(formData);
  return res;
});

// Async thunk for signin
export const signInUser = createAsyncThunk("auth/signInUser", async (formData) => {
  const res = await signInUserAPI(formData);
  return res; // Expected { user, token }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //  For rehydrating Redux from localStorage
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },

    //  Logout clears everything
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signInUser.fulfilled, (state, action) => {
      const { user, token } = action.payload;

      //  Store in Redux
      state.user = user;
      state.token = token;

      //  Persist to localStorage
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    });
  },
});

export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;
