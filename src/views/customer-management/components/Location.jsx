// src/components/Location/Location.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setMapOpen,
  confirmPosition,
  cancelPosition,
} from "../../../features/customerManagement/locationSlice";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import MapDialog from "./MapDialog";

/**
 * Location component used inside Formik forms.
 *
 * Props expected from parent (Formik):
 *  - values
 *  - touched
 *  - errors
 *  - setFieldValue   // Formik setFieldValue function
 */
export default function Location(props) {
  const { values, touched, errors, setFieldValue } = props;
  const dispatch = useDispatch();
  const mapOpen = useSelector((s) => s.location.mapOpen);
  const latitude = useSelector((s) => s.location.latitude);
  const longitude = useSelector((s) => s.location.longitude);
  const address = useSelector((s) => s.location.address);

  const openMap = () => {
    dispatch(setMapOpen(true));
  };

  // When user confirms in modal we need to commit to Formik fields.
  // MapDialog will dispatch confirmPosition() which updates Redux location state.
  // We watch mapOpen -> when it changes to false (and location state updated) we update Formik.
  // Simpler: MapDialog calls a callback on confirm. We'll pass a callback below and update Formik there.

  return (
    <div>
      <div>
        <h5 className="mb-2">Choose your Location</h5>

        <div className="flex items-center mb-4">
          <div className="mr-3">
            {/* marker icon (simple) */}
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2C8.686 2 6 4.686 6 8c0 4.418 6 12 6 12s6-7.582 6-12c0-3.314-2.686-6-6-6z"
                stroke="#374151"
                strokeWidth="1.2"
                fill="#fff"
              />
              <circle cx="12" cy="8" r="2.2" fill="#374151" />
            </svg>
          </div>

          <div style={{ flex: 1 }} onClick={openMap}>
            <Input
              disabled
              placeholder="Choose your location..."
              value={address || values.google_address || ""}
              readOnly
              className="border border-gray-400"
            />
          </div>

          {/* Small button to open map as well */}
          <div className="ml-3">
            <Button onClick={openMap} className="bg-green-400 text-black">Select</Button>
          </div>
        </div>

        {/* Latitude / Longitude fields */}
        <div className="grid grid-cols-2 gap-4 mt-[30px]">
          <div>
            <Label className="ml-[30px]">Latitude</Label>
            <Input
              disabled
              value={latitude || values.billing_latitude || ""}
              placeholder="Latitude"
              onChange={() => {}}
              className="w-[300px] ml-[30px] border border-gray-400 mt-[10px]"
            />
          </div>
          <div>
            <Label className="ml-[30px]">Longitude</Label>
            <Input
              disabled
              value={longitude || values.billing_longitude || ""}
              placeholder="Longitude"
              onChange={() => {}}
               className="w-[300px] ml-[30px] border border-gray-400 mt-[10px]"
            />
          </div>
        </div>
      </div>

      {/* Map Dialog - pass Formik setter so dialog can commit chosen values */}
      <MapDialog
        isOpen={mapOpen}
        onClose={() => dispatch(cancelPosition())}
        onConfirm={(lat, lng, addr) => {
          // update redux has already done by MapDialog; also set formik fields:
          if (setFieldValue) {
            setFieldValue("billing_latitude", lat !== null ? lat : "");
            setFieldValue("billing_longitude", lng !== null ? lng : "");
            setFieldValue("billing_google_address", addr || "");
            // If you have separate shipping fields, parent can call with same values when 'same as billing' checkbox checked.
            setFieldValue("google_address", addr || "");
          }
          // also dispatch confirm (so slice persists)
          dispatch(confirmPosition());
        }}
      />
    </div>
  );
}
