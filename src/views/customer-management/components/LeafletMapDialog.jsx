// frontend/src/views/customer-management/components/MapDialog.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setTempPosition,
  confirmPosition,
  cancelPosition,
  setMapOpen,
} from "../../../features/customerManagement/leafletLocationSlice";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import LeafletMapComponent from "./LeafletMapComponent"; // this is Leaflet component now

export default function LeafletMapDialog({ isOpen, onClose, onConfirm }) {
  const dispatch = useDispatch();
  const { tempLat, tempLng, tempAddress } = useSelector((s) => s.location);

  useEffect(() => {
    // If dialog opens, ensure redux temp values are seeded (done in setMapOpen action earlier)
  }, [isOpen]);

  const handleConfirm = () => {
    // Parent expects onConfirm(lat, lng, addr)
    if (onConfirm) onConfirm(tempLat, tempLng, tempAddress);
    // Persist in slice
    dispatch(confirmPosition());
  };

  const handleCancel = () => {
    if (onClose) onClose();
    dispatch(cancelPosition());
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          dispatch(cancelPosition());
        }
      }}
    >
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle>Choose your location</DialogTitle>
        </DialogHeader>

        <div className="py-2">
          <LeafletMapComponent />
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
