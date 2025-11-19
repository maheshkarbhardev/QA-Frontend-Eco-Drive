// frontend/src/views/customer-management/components/GoogleMapComponent.jsx
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { setTempPosition } from "../../../features/customerManagement/leafletLocationSlice";
import { Input } from "@/components/ui/input";
import { HiOutlineSearch } from "react-icons/hi";

// NOTE: fix Leaflet's default icon path for many bundlers
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// create default icon
const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

L.Marker.prototype.options.icon = DefaultIcon;

const defaultCenter = { lat: 20.5937, lng: 78.9629 }; // India center fallback

// Small component to handle map clicks and marker drag events
function ClickAndDragHandler({ onChange }) {
  useMapEvents({
    click(e) {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;
      onChange(lat, lng);
    },
  });
  return null;
}

export default function LeafletMapComponent() {
  const dispatch = useDispatch();
  const { tempLat, tempLng, tempAddress } = useSelector((s) => s.location);

  const [map, setMap] = useState(null);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loadingSuggest, setLoadingSuggest] = useState(false);

  const searchRef = useRef(null);
  const abortCtrl = useRef(null);

  // center the map based on temp coords or default
  const center = {
    lat: tempLat || defaultCenter.lat,
    lng: tempLng || defaultCenter.lng,
  };

  useEffect(() => {
    // pan map when temp coords change
    if (map && tempLat && tempLng) {
      try {
        map.setView([Number(tempLat), Number(tempLng)], 14, { animate: true });
      } catch (e) {
        // ignore
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tempLat, tempLng, map]);

  // reverse geocode using Nominatim
  const reverseGeocode = useCallback(async (lat, lng) => {
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`;
      const res = await fetch(url);
      if (!res.ok) return "";
      const data = await res.json();
      return data?.display_name || "";
    } catch (err) {
      console.warn("reverseGeocode error:", err);
      return "";
    }
  }, []);

  // update temp position in redux (used on click or after search selection)
  const updateTempPosition = useCallback(
    async ({ lat, lng, address }) => {
      const addr =
        address || (lat && lng ? await reverseGeocode(lat, lng) : "") || "";
      dispatch(
        setTempPosition({
          lat: Number(lat),
          lng: Number(lng),
          address: addr,
        })
      );
    },
    [dispatch, reverseGeocode]
  );

  // called when user drags the marker (we'll do same pattern: reverse geocode -> setTempPosition)
  const onMarkerDragEnd = useCallback(
    async (e) => {
      const lat = e.target.getLatLng().lat;
      const lng = e.target.getLatLng().lng;
      updateTempPosition({ lat, lng });
    },
    [updateTempPosition]
  );

  // search suggestions via Nominatim
  useEffect(() => {
    if (!query || query.length < 2) {
      setSuggestions([]);
      return;
    }

    // cancel previous
    if (abortCtrl.current) abortCtrl.current.abort();
    abortCtrl.current = new AbortController();
    const signal = abortCtrl.current.signal;

    (async () => {
      setLoadingSuggest(true);
      try {
        const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&q=${encodeURIComponent(
          query
        )}&addressdetails=1&limit=6`;
        const res = await fetch(url, { signal });
        if (!res.ok) {
          setSuggestions([]);
          setLoadingSuggest(false);
          return;
        }
        const data = await res.json();
        const results = data.map((r) => ({
          label: r.display_name,
          lat: r.lat,
          lon: r.lon,
        }));
        setSuggestions(results);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.warn("Nominatim search error", err);
        }
        setSuggestions([]);
      } finally {
        setLoadingSuggest(false);
      }
    })();

    return () => {
      if (abortCtrl.current) abortCtrl.current.abort();
    };
  }, [query]);

  // handle suggestion select
  const handleSelectSuggestion = async (s) => {
    setQuery(s.label);
    setSuggestions([]);
    const lat = Number(s.lat);
    const lng = Number(s.lon);
    // move map
    if (map) {
      map.setView([lat, lng], 14, { animate: true });
    }
    await updateTempPosition({ lat, lng, address: s.label });
  };

  return (
    <div className="w-full">
      <div style={{ position: "relative", marginBottom: 8 }}>
        <div style={{ position: "absolute", left: 12, top: 8, zIndex: 1000 }}>
          <HiOutlineSearch className="text-lg" />
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ width: "100%", maxWidth: 900, position: "relative" }}>
            <Input
              ref={searchRef}
              placeholder="Search your location..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{ paddingLeft: 36 }}
              className="max-w-2xl"
            />
            {suggestions.length > 0 && (
              <div
                style={{
                  position: "absolute",
                  zIndex: 1200,
                  background: "white",
                  width: "100%",
                  maxHeight: 240,
                  overflowY: "auto",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                }}
              >
                {suggestions.map((s, i) => (
                  <div
                    key={i}
                    onClick={() => handleSelectSuggestion(s)}
                    style={{
                      padding: "8px 12px",
                      cursor: "pointer",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    {s.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={{ height: "60vh", width: "100%" }}>
        <MapContainer
          center={[center.lat, center.lng]}
          zoom={tempLat && tempLng ? 14 : 5}
          style={{ height: "100%", width: "100%" }}
          whenCreated={(m) => setMap(m)}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {/* Marker (draggable) */}
          <Marker
            position={[
              tempLat ? Number(tempLat) : center.lat,
              tempLng ? Number(tempLng) : center.lng,
            ]}
            draggable={true}
            eventHandlers={{
              dragend: onMarkerDragEnd,
            }}
          />
          <ClickAndDragHandler
            onChange={async (lat, lng) => {
              await updateTempPosition({ lat, lng });
            }}
          />
        </MapContainer>
      </div>

      <div className="mt-2">
        <div>
          <strong>Selected address:</strong> {tempAddress || " — "}
        </div>
      </div>
    </div>
  );
}
