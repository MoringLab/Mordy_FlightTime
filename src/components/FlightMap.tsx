'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface FlightMapProps {
  center?: LatLngTuple;
  zoom?: number;
  dragging?: boolean;
  scrollWheelZoom?: boolean;
  children?: React.ReactNode;
}

function MapController({ center, zoom }: { center?: LatLngTuple; zoom?: number }) {
  const map = useMap();

  useEffect(() => {
    if (center && zoom) {
      map.flyTo(center, zoom, {
        duration: 1.5,
        easeLinearity: 0.25,
      });
    }
  }, [center, zoom, map]);

  return null;
}

export default function FlightMap({
  center = [24.9857, 55.1544],
  zoom = 4,
  dragging = true,
  scrollWheelZoom = true,
  children,
}: FlightMapProps) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      zoomControl={false}
      attributionControl={false}
      dragging={dragging}
      scrollWheelZoom={scrollWheelZoom}
      doubleClickZoom={true}
      style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 0 }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
      />
      <MapController center={center} zoom={zoom} />
      {children}
    </MapContainer>
  );
}
