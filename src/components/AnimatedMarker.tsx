'use client';

import { useEffect, useState, useRef } from 'react';
import { Marker, useMap } from 'react-leaflet';
import { LatLngTuple, DivIcon } from 'leaflet';
import along from '@turf/along';
import { lineString } from '@turf/helpers';
import length from '@turf/length';
import bearing from '@turf/bearing';
import greatCircle from '@turf/great-circle';

interface AnimatedMarkerProps {
  route: LatLngTuple[];
  progress: number;
  followCamera: boolean;
}

export default function AnimatedMarker({ route, progress, followCamera }: AnimatedMarkerProps) {
  const map = useMap();
  const [position, setPosition] = useState<LatLngTuple>(route[0]);
  const [rotation, setRotation] = useState(0);
  const animationFrameRef = useRef<number>();
  const targetProgressRef = useRef(0);
  const routePointsRef = useRef<LatLngTuple[]>([]);
  const cameraProgressRef = useRef(0); // Camera has its own progress on the same route
  const mapCenterRef = useRef<LatLngTuple>(route[0]); // Track map's official center
  const mapZoomRef = useRef<number>(map.getZoom()); // Track current zoom

  // Pre-calculate great circle route with many points for smooth interpolation
  useEffect(() => {
    if (route.length < 2) return;

    try {
      const startPoint = [route[0][1], route[0][0]]; // [lng, lat] for Turf
      const endPoint = [route[1][1], route[1][0]];
      const greatCircleRoute = greatCircle(startPoint, endPoint, { npoints: 1000 });

      const points = greatCircleRoute.geometry.coordinates.map(
        (coord: number[]) => [coord[1], coord[0]] as LatLngTuple
      );

      routePointsRef.current = points;
      mapCenterRef.current = route[0];
    } catch (error) {
      console.error('Error calculating route:', error);
      routePointsRef.current = [route[0], route[1]];
    }
  }, [route]);

  // Listen to user zoom/pan events to update our reference point
  useEffect(() => {
    const handleZoomEnd = () => {
      mapZoomRef.current = map.getZoom();
      mapCenterRef.current = [map.getCenter().lat, map.getCenter().lng];
    };

    const handleMoveEnd = () => {
      mapCenterRef.current = [map.getCenter().lat, map.getCenter().lng];
    };

    map.on('zoomend', handleZoomEnd);
    map.on('moveend', handleMoveEnd);

    return () => {
      map.off('zoomend', handleZoomEnd);
      map.off('moveend', handleMoveEnd);
    };
  }, [map]);

  // Update target progress from props
  useEffect(() => {
    targetProgressRef.current = progress;
  }, [progress]);

  // Continuous animation loop - runs at 60fps regardless of timer updates
  useEffect(() => {
    const animate = () => {
      const routePoints = routePointsRef.current;

      // Safety check
      if (!routePoints || routePoints.length < 2) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      const currentProgress = targetProgressRef.current;

      // Calculate current position on the route
      const index = Math.floor(currentProgress * (routePoints.length - 1));
      const nextIndex = Math.min(index + 1, routePoints.length - 1);

      // Interpolate between points for extra smoothness
      const localProgress = (currentProgress * (routePoints.length - 1)) - index;
      const currentPos = routePoints[index];
      const nextPos = routePoints[nextIndex];

      if (!currentPos || !nextPos) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      const interpolatedPosition: LatLngTuple = [
        currentPos[0] + (nextPos[0] - currentPos[0]) * localProgress,
        currentPos[1] + (nextPos[1] - currentPos[1]) * localProgress,
      ];

      setPosition(interpolatedPosition);

      // Calculate rotation based on trajectory (look ahead more points for stability)
      const lookAheadPoints = 50; // Look further ahead for more stable direction
      const lookAheadIndex = Math.min(index + lookAheadPoints, routePoints.length - 1);

      if (lookAheadIndex > index) {
        const currentPoint = routePoints[index];
        const lookAheadPoint = routePoints[lookAheadIndex];

        if (currentPoint && lookAheadPoint) {
          try {
            // Turf bearing expects [lng, lat]
            const angle = bearing(
              [currentPoint[1], currentPoint[0]],
              [lookAheadPoint[1], lookAheadPoint[0]]
            );

            setRotation(angle);
          } catch (e) {
            console.error('Bearing calculation error:', e);
          }
        }
      }

      // Camera follows the same route independently with smooth interpolation
      if (followCamera) {
        try {
          // Camera smoothly catches up to airplane's progress
          const targetCameraProgress = targetProgressRef.current;
          const currentCameraProgress = cameraProgressRef.current;

          // Smooth interpolation - camera gradually catches up
          const catchUpSpeed = 0.15;
          const newCameraProgress = currentCameraProgress + (targetCameraProgress - currentCameraProgress) * catchUpSpeed;
          cameraProgressRef.current = newCameraProgress;

          // Calculate camera position on the same route using its own progress
          const cameraIndex = Math.floor(newCameraProgress * (routePoints.length - 1));
          const cameraNextIndex = Math.min(cameraIndex + 1, routePoints.length - 1);
          const cameraLocalProgress = (newCameraProgress * (routePoints.length - 1)) - cameraIndex;

          const cameraCurrPos = routePoints[cameraIndex];
          const cameraNextPos = routePoints[cameraNextIndex];

          if (cameraCurrPos && cameraNextPos) {
            const cameraPosition: LatLngTuple = [
              cameraCurrPos[0] + (cameraNextPos[0] - cameraCurrPos[0]) * cameraLocalProgress,
              cameraCurrPos[1] + (cameraNextPos[1] - cameraCurrPos[1]) * cameraLocalProgress,
            ];

            // Store the new camera position
            mapCenterRef.current = cameraPosition;

            // Use pure Leaflet setView for smooth camera movement
            // This ensures tiles load correctly
            const currentCenter = map.getCenter();
            const distance = Math.sqrt(
              Math.pow(cameraPosition[0] - currentCenter.lat, 2) +
              Math.pow(cameraPosition[1] - currentCenter.lng, 2)
            );

            // Only update if camera has moved significantly (reduces unnecessary calls)
            if (distance > 0.0001) {
              map.setView(cameraPosition, map.getZoom(), {
                animate: false,
                duration: 0,
                noMoveStart: true,
              });
            }
          }
        } catch (e) {
          console.error('Camera follow error:', e);
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [followCamera, map]);

  // Create dynamic icon with rotation
  // Turf bearing: 0deg=North, 90deg=East, 180deg=South, 270deg=West
  // SVG needs adjustment - testing with -30deg offset
  const adjustedRotation = rotation - 45;

  const planeIcon = new DivIcon({
    html: `
      <div style="transform: rotate(${adjustedRotation}deg); transition: transform 0.2s ease-out;">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
          <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>
        </svg>
      </div>
    `,
    className: 'plane-marker',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });

  return <Marker position={position} icon={planeIcon} />;
}
