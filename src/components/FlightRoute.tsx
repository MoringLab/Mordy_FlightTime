'use client';

import { useEffect, useState } from 'react';
import { Polyline } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';
import greatCircle from '@turf/great-circle';
import { lineString } from '@turf/helpers';

interface FlightRouteProps {
  start: [number, number];
  end: [number, number];
}

export default function FlightRoute({ start, end }: FlightRouteProps) {
  const [routeCoordinates, setRouteCoordinates] = useState<LatLngTuple[]>([]);

  useEffect(() => {
    try {
      const startPoint = [start[1], start[0]]; // [lng, lat] for Turf
      const endPoint = [end[1], end[0]]; // [lng, lat] for Turf

      const route = greatCircle(startPoint, endPoint, { npoints: 100 });
      const coords = route.geometry.coordinates.map(
        (coord: number[]) => [coord[1], coord[0]] as LatLngTuple
      );
      console.log('FlightRoute calculated:', coords.length, 'points');
      setRouteCoordinates(coords);
    } catch (error) {
      console.error('Error calculating route:', error);
      setRouteCoordinates([start, end]);
    }
  }, [start, end]);

  if (routeCoordinates.length === 0) {
    console.log('FlightRoute: No coordinates yet');
    return null;
  }

  console.log('FlightRoute rendering with', routeCoordinates.length, 'points');

  return (
    <Polyline
      positions={routeCoordinates}
      pathOptions={{
        color: '#ffffff',
        weight: 3,
        opacity: 0.8,
        dashArray: '10, 10',
      }}
    />
  );
}
