'use client';

import { useEffect, useState, useRef, useMemo } from 'react';
import { Marker, useMap } from 'react-leaflet';
import { LatLngTuple, DivIcon, Marker as LeafletMarker } from 'leaflet';
import 'leaflet-rotate';
import bearing from '@turf/bearing';
import greatCircle from '@turf/great-circle';

interface AnimatedMarkerProps {
  route: LatLngTuple[];
  progress: number;
  followCamera: boolean;
  isPaused?: boolean;
}

export default function AnimatedMarker({ route, progress, followCamera, isPaused = false }: AnimatedMarkerProps) {
  const map = useMap();
  const [position] = useState<LatLngTuple>(route[0]);
  const animationFrameRef = useRef<number>(0);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const routePointsRef = useRef<LatLngTuple[]>([]);
  const cameraProgressRef = useRef(0);
  const mapCenterRef = useRef<LatLngTuple>(route[0]);
  const mapZoomRef = useRef<number>(map.getZoom());
  const markerRef = useRef<LeafletMarker | null>(null);
  const currentPositionRef = useRef<LatLngTuple>(route[0]);
  const currentRotationRef = useRef<number>(0);
  const smoothedRotationRef = useRef<number>(0);

  const lastProgressUpdateTimeRef = useRef<number>(Date.now());
  const progressVelocityRef = useRef<number>(0);
  const justResumedRef = useRef<boolean>(false);

  useEffect(() => {
    if (route.length < 2) return;

    try {
      const startPoint = [route[0][1], route[0][0]];
      const endPoint = [route[1][1], route[1][0]];
      const greatCircleRoute = greatCircle(startPoint, endPoint, { npoints: 1000 });

      const points = (greatCircleRoute.geometry.coordinates as number[][]).map(
        (coord) => [coord[1], coord[0]] as LatLngTuple
      );

      routePointsRef.current = points;
      mapCenterRef.current = route[0];
    } catch (error) {
      console.error('Error calculating route:', error);
      routePointsRef.current = [route[0], route[1]];
    }
  }, [route]);

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

  useEffect(() => {
    const now = Date.now();
    const lastTime = lastProgressUpdateTimeRef.current;
    const timeDelta = now - lastTime;

    // Skip velocity calculation if we just resumed from pause
    if (justResumedRef.current) {
      justResumedRef.current = false;
      targetProgressRef.current = progress;
      lastProgressUpdateTimeRef.current = now;
      return;
    }

    // Calculate velocity only when not paused and with reasonable time delta
    if (!isPaused && timeDelta > 0 && timeDelta < 1000) {
      const progressDelta = progress - targetProgressRef.current;
      progressVelocityRef.current = progressDelta / timeDelta;
    }

    targetProgressRef.current = progress;
    lastProgressUpdateTimeRef.current = now;
  }, [progress, isPaused]);

  // Sync camera progress and reset velocity when pause state changes
  useEffect(() => {
    if (!isPaused) {
      // When resuming, sync camera position to current progress to avoid shake
      cameraProgressRef.current = currentProgressRef.current;
      // Reset velocity to prevent jump
      progressVelocityRef.current = 0;
      // Reset time reference
      lastProgressUpdateTimeRef.current = Date.now();
      // Mark that we just resumed to skip next velocity calculation
      justResumedRef.current = true;
      // Sync target progress to current progress to avoid backward jump
      targetProgressRef.current = currentProgressRef.current;
    }
  }, [isPaused]);

  useEffect(() => {
  // ...existing code...

    const animate = () => {
      const routePoints = routePointsRef.current;
      if (!routePoints || routePoints.length < 2) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

  const now = Date.now();

      let newProgress;
      if (isPaused) {
        progressVelocityRef.current = 0;
        newProgress = currentProgressRef.current;
        // Update time reference during pause to prevent time accumulation
        lastProgressUpdateTimeRef.current = now;
      } else {
        const targetProgress = targetProgressRef.current;
        const velocity = progressVelocityRef.current;
        const timeSinceLastUpdate = now - lastProgressUpdateTimeRef.current;

        // Use velocity-based extrapolation when time delta is reasonable
        // This ensures smooth movement even between progress updates
        if (velocity !== 0 && timeSinceLastUpdate < 200) {
          const extrapolatedProgress = targetProgress + (velocity * timeSinceLastUpdate);
          newProgress = Math.max(0, Math.min(1, extrapolatedProgress));
        } else {
          // Fallback to smooth interpolation when velocity is stale
          const smoothingFactor = 0.15;
          newProgress = currentProgressRef.current + (targetProgress - currentProgressRef.current) * smoothingFactor;
          newProgress = Math.max(0, Math.min(1, newProgress));
        }
        currentProgressRef.current = newProgress;
      }

      const index = Math.floor(newProgress * (routePoints.length - 1));
      const nextIndex = Math.min(index + 1, routePoints.length - 1);
      const localProgress = (newProgress * (routePoints.length - 1)) - index;
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

      currentPositionRef.current = interpolatedPosition;
      if (markerRef.current) {
        markerRef.current.setLatLng(interpolatedPosition);
      }

      const lookAheadPoints = 150;
      const lookAheadIndex = Math.min(index + lookAheadPoints, routePoints.length - 1);

      if (lookAheadIndex > index) {
        const currentPoint = routePoints[index];
        const lookAheadPoint = routePoints[lookAheadIndex];

        if (currentPoint && lookAheadPoint) {
          try {
            // Calculate bearing using more look-ahead for smoother rotation
            const targetAngle = bearing(
              [interpolatedPosition[1], interpolatedPosition[0]],
              [lookAheadPoint[1], lookAheadPoint[0]]
            );

            // Smooth the rotation angle to reduce jitter
            let angleDiff = targetAngle - smoothedRotationRef.current;
            while (angleDiff > 180) angleDiff -= 360;
            while (angleDiff < -180) angleDiff += 360;

            const smoothedAngle = smoothedRotationRef.current + angleDiff * 0.05;
            smoothedRotationRef.current = smoothedAngle;
            currentRotationRef.current = smoothedAngle;

            if (followCamera && map.setBearing) {
              const currentBearing = map.getBearing();
              const targetBearing = -smoothedAngle;
              let bearingDiff = targetBearing - currentBearing;

              while (bearingDiff > 180) bearingDiff -= 360;
              while (bearingDiff < -180) bearingDiff += 360;

              const newBearing = currentBearing + bearingDiff * 0.05;
              map.setBearing(newBearing);

              if (markerRef.current) {
                const element = markerRef.current.getElement();
                if (element) {
                  const iconWrapper = element.querySelector('.plane-icon-wrapper') as HTMLElement;
                  if (iconWrapper) {
                    iconWrapper.style.transform = `rotate(-45deg)`;
                  }
                }
              }
            } else {
              if (map.getBearing && map.getBearing() !== 0) {
                const currentBearing = map.getBearing();
                const newBearing = currentBearing * 0.92;
                if (Math.abs(newBearing) < 0.1) {
                  map.setBearing(0);
                } else {
                  map.setBearing(newBearing);
                }
              }

              if (markerRef.current) {
                const element = markerRef.current.getElement();
                if (element) {
                  const iconWrapper = element.querySelector('.plane-icon-wrapper') as HTMLElement;
                  if (iconWrapper) {
                    // followCamera가 아닐 때는 비행기 아이콘이 직접 진행 방향을 가리킵니다.
                    // SVG의 기본 각도 45도를 보정해줍니다.
                    const adjustedRotation = smoothedAngle - 45;
                    iconWrapper.style.transform = `rotate(${adjustedRotation}deg)`;
                  }
                }
              }
            }
          } catch (e) {
            console.error('Bearing calculation error:', e);
          }
        }
      }

      if (followCamera) {
        try {
          // Use the actual plane position directly for smoother camera follow
          const cameraPosition = interpolatedPosition;
          mapCenterRef.current = cameraPosition;
          cameraProgressRef.current = newProgress;

          map.panTo(cameraPosition, {
            animate: false,
            duration: 0,
            noMoveStart: true,
          });
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
  }, [followCamera, map, isPaused]);

  const planeIcon = useMemo(() => new DivIcon({
    html: `
      <div class="plane-icon-wrapper" style="will-change: transform; transform: rotate(-45deg);">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
          <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>
        </svg>
      </div>
    `,
    className: 'plane-marker',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  }), []);

  return <Marker position={position} icon={planeIcon} ref={markerRef} />;
}