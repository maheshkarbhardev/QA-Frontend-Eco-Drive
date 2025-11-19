// frontend/src/features/customerManagement/locationSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mapOpen: false,
  latitude: "",
  longitude: "",
  address: "",
  // temporary values used while user interacts with the map/dialog
  tempLat: null,
  tempLng: null,
  tempAddress: "",
};

const leafletLocationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setMapOpen(state, action) {
      state.mapOpen = action.payload;
      if (action.payload) {
        // initialize temp values from persisted values
        state.tempLat = state.latitude || null;
        state.tempLng = state.longitude || null;
        state.tempAddress = state.address || "";
      }
    },
    setTempPosition(state, action) {
      // action.payload: { lat, lng, address? }
      state.tempLat = action.payload.lat;
      state.tempLng = action.payload.lng;
      if (action.payload.address !== undefined) {
        state.tempAddress = action.payload.address;
      }
    },
    confirmPosition(state) {
      state.latitude = state.tempLat || "";
      state.longitude = state.tempLng || "";
      state.address = state.tempAddress || "";
      state.mapOpen = false;
    },
    cancelPosition(state) {
      // restore temp to persisted values, close dialog
      state.tempLat = state.latitude || null;
      state.tempLng = state.longitude || null;
      state.tempAddress = state.address || "";
      state.mapOpen = false;
    },
    resetPosition(state) {
      state.latitude = "";
      state.longitude = "";
      state.address = "";
      state.tempLat = null;
      state.tempLng = null;
      state.tempAddress = "";
    },
  },
});

export const {
  setMapOpen,
  setTempPosition,
  confirmPosition,
  cancelPosition,
  resetPosition,
} = leafletLocationSlice.actions;

export default leafletLocationSlice.reducer;
