'use client';

import { Marker } from 'react-leaflet';
import { DivIcon } from 'leaflet';

interface LocationMarkersProps {
  departure: [number, number];
  arrival: [number, number];
  departureLabel?: string;
  arrivalLabel?: string;
}

export default function LocationMarkers({
  departure,
  arrival,
  departureLabel = 'Departure',
  arrivalLabel = 'Arrival',
}: LocationMarkersProps) {
  const departureIcon = new DivIcon({
    html: `
      <div style="position: relative;">
        <div style="width: 16px; height: 16px; background: #10b981; border: 3px solid white; border-radius: 50%; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>
        <div style="
          position: absolute;
          top: 24px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0,0,0,0.8);
          color: white;
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 600;
          white-space: nowrap;
          backdrop-filter: blur(8px);
        ">${departureLabel}</div>
      </div>
    `,
    className: 'location-marker',
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });

  const arrivalIcon = new DivIcon({
    html: `
      <div style="position: relative;">
        <div style="width: 16px; height: 16px; background: #ef4444; border: 3px solid white; border-radius: 50%; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>
        <div style="
          position: absolute;
          top: 24px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0,0,0,0.8);
          color: white;
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 600;
          white-space: nowrap;
          backdrop-filter: blur(8px);
        ">${arrivalLabel}</div>
      </div>
    `,
    className: 'location-marker',
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });

  return (
    <>
      <Marker position={departure} icon={departureIcon} />
      <Marker position={arrival} icon={arrivalIcon} />
    </>
  );
}
