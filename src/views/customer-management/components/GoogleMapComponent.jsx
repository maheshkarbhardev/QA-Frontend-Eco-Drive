// src/components/Location/GoogleMapComponent.jsx
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useJsApiLoader, GoogleMap, Marker, Autocomplete } from "@react-google-maps/api";
import { setTempPosition } from "../../../features/customerManagement/locationSlice";
import { Input } from "@/components/ui/input";
import { HiOutlineSearch } from "react-icons/hi";

const libraries = ["places"];

const defaultCenter = { lat: 20.5937, lng: 78.9629 }; // India's center

export default function GoogleMapComponent() {
  const dispatch = useDispatch();
  const { tempLat, tempLng, tempAddress } = useSelector((s) => s.location);

  const [map, setMap] = useState(null);
  const [autocompleteObj, setAutocompleteObj] = useState(null);

  const searchRef = useRef(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY,
    libraries,
  });

  // initialize starting position (use temp if present)
  const center = {
    lat: tempLat || defaultCenter.lat,
    lng: tempLng || defaultCenter.lng,
  };

  useEffect(() => {
    // if temp position changes, recenter map
    if (map && tempLat && tempLng) {
      map.panTo({ lat: Number(tempLat), lng: Number(tempLng) });
      map.setZoom(14);
    }
  }, [tempLat, tempLng, map]);

  const onLoadMap = useCallback((gmap) => {
    setMap(gmap);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const onMarkerDragEnd = useCallback((e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();

    // reverse geocode to get address
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      const address = (results && results[0] && results[0].formatted_address) || "";
      dispatch(setTempPosition({ lat, lng, address }));
    });
  }, [dispatch]);

  const onPlaceChanged = () => {
    if (!autocompleteObj) return;
    const place = autocompleteObj.getPlace();
    if (!place.geometry) return;

    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    const addr = place.formatted_address || place.name || "";

    // update temp position and recenter
    dispatch(setTempPosition({ lat, lng, address: addr }));
    if (map) {
      map.panTo({ lat, lng });
      map.setZoom(14);
    }
  };

  if (loadError) return <div>Map failed to load</div>;
  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <div className="w-full">
      <div style={{ position: "relative", marginBottom: 8 }}>
        <div style={{ position: "absolute", left: 12, top: 8, zIndex: 10 }}>
          <HiOutlineSearch className="text-lg" />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Autocomplete
            onLoad={(auto) => setAutocompleteObj(auto)}
            onPlaceChanged={onPlaceChanged}
          >
            <Input
              ref={searchRef}
              placeholder="Search your location..."
              className="max-w-2xl"
              style={{ paddingLeft: 36 }}
            />
          </Autocomplete>
        </div>
      </div>

      <div style={{ height: "60vh", width: "100%" }}>
        <GoogleMap
          mapContainerStyle={{ height: "100%", width: "100%" }}
          center={center}
          zoom={tempLat && tempLng ? 14 : 5}
          onLoad={onLoadMap}
          onUnmount={onUnmount}
        >
          {/* If we have temp coords show draggable marker */}
          {tempLat && tempLng ? (
            <Marker
              position={{ lat: Number(tempLat), lng: Number(tempLng) }}
              draggable
              onDragEnd={onMarkerDragEnd}
            />
          ) : (
            <Marker
              position={center}
              draggable
              onDragEnd={onMarkerDragEnd}
            />
          )}
        </GoogleMap>
      </div>
      <div className="mt-2">
        <div>
          <strong>Selected address:</strong> {tempAddress || " — "}
        </div>
      </div>
    </div>
  );
}
