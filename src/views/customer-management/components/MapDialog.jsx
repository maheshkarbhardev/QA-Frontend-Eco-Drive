// src/components/Location/MapDialog.jsx
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setTempPosition,
  confirmPosition,
  cancelPosition,
  setMapOpen,
} from "../../../features/customerManagement/locationSlice";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import GoogleMapComponent from "./GoogleMapComponent";

/**
 * MapDialog
 *
 * Props:
 *  - isOpen (boolean)
 *  - onClose() // called when user cancels
 *  - onConfirm(lat, lng, address) // called when user confirms
 *
 * NOTE: This component uses Redux location.slice for temp storage so map <-> dialog communicate.
 */
export default function MapDialog({ isOpen, onClose, onConfirm }) {
  const dispatch = useDispatch();
  const { tempLat, tempLng, tempAddress } = useSelector((s) => s.location);

  useEffect(() => {
    // ensure slice has temp values when dialog opens
    if (isOpen) {
      // setTempPosition is expected to be already seeded by setMapOpen(true) earlier
    }
  }, [isOpen]);

  const handleConfirm = () => {
    // call parent's onConfirm with temp values
    if (onConfirm) onConfirm(tempLat, tempLng, tempAddress);
    // also close
    dispatch(setMapOpen(false));
  };

  const handleCancel = () => {
    if (onClose) onClose();
    dispatch(cancelPosition());
  };

  return (
    <Dialog
      // Many shadcn Dialogs use 'open' and 'onOpenChange'. If yours uses isOpen/onClose adapt here.
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          // closed by clicking outside/esc -> cancel
          dispatch(cancelPosition());
        }
      }}
    >
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle>Choose your location</DialogTitle>
          <DialogDescription>
            Pick a location by searching or dragging the map marker.
          </DialogDescription>
        </DialogHeader>

        <div className="py-2">
          <GoogleMapComponent />
        </div>

        <DialogFooter className="space-x-2">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
