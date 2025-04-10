
"use client";

import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { User } from '../types/user';

interface UserMapProps {
  users: User[];
}

export default function UserMap({ users }: UserMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || users.length === 0) return;

    // Initialize the map
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://demotiles.maplibre.org/style.json', // Free demo style
      center: [0, 20], // Default center
      zoom: 1.5
    });

    // Add navigation controls
    map.current.addControl(new maplibregl.NavigationControl());

    // Add markers for each user
    users.forEach(user => {
      if (!user.address?.geo) return;
      
      const { lat, lng } = user.address.geo;
      const popup = new maplibregl.Popup({ offset: 25 })
        .setText(`${user.name}\n${user.address.city}`);

      new maplibregl.Marker({ color: '#3b82f6' })
        .setLngLat([parseFloat(lng), parseFloat(lat)])
        .setPopup(popup)
        .addTo(map.current!);
    });

    // Fit map to markers if there are multiple users
    if (users.length > 1) {
      const bounds = new maplibregl.LngLatBounds();
      users.forEach(user => {
        if (user.address?.geo) {
          bounds.extend([parseFloat(user.address.geo.lng), parseFloat(user.address.geo.lat)]);
        }
      });
      map.current.fitBounds(bounds, { padding: 50 });
    }

    return () => {
      map.current?.remove();
    };
  }, [users]);

  return (
    <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg mt-8">
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
}