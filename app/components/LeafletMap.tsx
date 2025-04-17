
"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

interface LeafletMapProps {
  onAddressSelect: (address: string) => void;
}

export default function LeafletMap({ onAddressSelect }: LeafletMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMap = useRef<L.Map | null>(null); // to prevent re-initialization

  useEffect(() => {
    (async () => {
      const L = await import("leaflet");

      if (mapRef.current && !leafletMap.current) {

        delete (L.Icon.Default.prototype as { _getIconUrl?: () => string })._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
          iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
          shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
        });

        // Initialize the map only once
        const map = L.map(mapRef.current).setView([14.5995, 120.9842], 13);
        leafletMap.current = map;

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; OpenStreetMap contributors',
        }).addTo(map);

        const marker = L.marker([14.5995, 120.9842], { draggable: true }).addTo(map);

        const updateAddress = async (lat: number, lng: number) => {
          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
            );
            const data = await res.json();
            if (data?.display_name) {
              onAddressSelect(data.display_name);
            }
          } catch (error) {
            console.error("Error fetching address:", error);
          }
        };

        marker.on("dragend", () => {
          const { lat, lng } = marker.getLatLng();
          updateAddress(lat, lng);
        });

        map.on("click", (e: L.LeafletMouseEvent) => {
          const { lat, lng } = e.latlng;
          marker.setLatLng([lat, lng]);
          updateAddress(lat, lng);
        });
      }
    })();

    return () => {
      if (leafletMap.current) {
        leafletMap.current.remove();
        leafletMap.current = null;
      }
    };
  }, [onAddressSelect]);

  return (
    <div
      ref={mapRef}
      className="h-[400px] w-full rounded-md border border-gray-300 shadow"
    />
  );
}
