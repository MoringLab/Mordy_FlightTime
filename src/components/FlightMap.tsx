'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Import leaflet-rotate to enable map rotation
import 'leaflet-rotate';

interface FlightMapProps {
  center?: LatLngTuple;
  zoom?: number;
  dragging?: boolean;
  scrollWheelZoom?: boolean;
  children?: React.ReactNode;
  mapStyle?: 'monochrome' | 'vector' | 'standard' | 'satellite';
  showLabels?: boolean;
}

function MapController({ center, zoom }: { center?: LatLngTuple; zoom?: number }) {
  const map = useMap();

  // Enable rotation on map instance
  useEffect(() => {
    // Check if leaflet-rotate is loaded
    if (typeof map.setBearing === 'function') {
      // Optionally, test calling setBearing to verify it works
      try {
        map.setBearing(0);
        console.log('Leaflet-rotate is loaded and working');
      } catch (error) {
        console.error('Leaflet-rotate is loaded but setBearing failed:', error);
      }
    } else {
      console.error('Leaflet-rotate is NOT loaded');
    }
  }, [map]);

  // Fix for tiles not loading when tab becomes visible again
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        // Force tiles to reload when tab becomes visible
        map.invalidateSize();
        setTimeout(() => {
          map.eachLayer((layer) => {
            if (layer instanceof L.TileLayer) {
              layer.redraw();
            }
          });
        }, 100);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [map]);

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

const MAP_STYLES = {
  monochrome: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
  vector: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
  standard: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
  satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
};

const LABEL_LAYER = 'https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png';

export default function FlightMap({
  center = [24.9857, 55.1544],
  zoom = 4,
  dragging = true,
  scrollWheelZoom = true,
  children,
  mapStyle = 'satellite',
  showLabels = true,
}: FlightMapProps) {
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, backgroundColor: '#000000' }}>
      <MapContainer
        center={center}
        zoom={zoom}
        zoomControl={false}
        attributionControl={false}
        dragging={dragging}
        scrollWheelZoom={scrollWheelZoom}
        doubleClickZoom={true}
        rotate={true}
        rotateControl={false}
        touchRotate={false}
        shiftKeyRotate={false}
        bearing={0}
        style={{ width: '100%', height: '100%', backgroundColor: '#000000' }}
      >
        <TileLayer
          url={MAP_STYLES[mapStyle]}
          attribution='&copy; Map Data'
          className="map-tiles-dark"
        />
        {showLabels && mapStyle !== 'standard' && (
          <TileLayer
            url={LABEL_LAYER}
            attribution=''
            className="map-labels"
            pane="overlayPane"
          />
        )}
        <MapController center={center} zoom={zoom} />
        {children}
      </MapContainer>
    </div>
  );
}
