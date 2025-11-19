import { createSlice } from "@reduxjs/toolkit";

const initialState={
    mapOpen:false,
    latitude:"",
    longitude:"",
    address:"",
    // optional: keep temporary lat/lng while user is moving marker in modal
    tempLat:null,
    tempLng:null,
    tempAddress:"",
}

const locationSlice=createSlice({
    name:"location",
    initialState,
    reducers:{
        setMapOpen(state,action){
            state.mapOpen=action.payload;

            // if opening, initialize temp values from current persisted ones
            if(action.payload){
                state.tempLat=state.latitude || null;
                state.tempLng=state.longitude || null;
                state.tempAddress= state.address || ""
            }
        },

        setTempPosition(state,action){
            // payload: { lat, lng, address? }
            state.tempLat = action.payload.lat;
            state.tempLng = action.payload.lng;

            if(action.payload.address !== undefined){
                state.tempAddress = action.payload.address;
            }
        },

        confirmPosition(state){
            state.latitude= state.tempLat || "";
            state.longitude= state.tempLng || "";
            state.address = state.tempAddress || "";
            state.mapOpen=false;
        },

        cancelPosition(state){
            // close and reset temp to main values
            state.tempLat=state.latitude || null;
            state.tempLng= state.longitude || null;
            state.tempAddress=state.address || "";
            state.mapOpen = false;
        },

        resetPosition(state){
            state.latitude="",
            state.longitude="",
            state.address="",
            state.tempLat=null;
            state.tempLng=null;
            state.tempAddress="";
        }

    }
})

export const {
  setMapOpen,
  setTempPosition,
  confirmPosition,
  cancelPosition,
  resetPosition,
} = locationSlice.actions;

export default locationSlice.reducer;