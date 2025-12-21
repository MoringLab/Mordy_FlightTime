'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useBookingStore } from '@/store/bookingStore';
import { useHistoryStore } from '@/store/historyStore';
import { useTimer } from '@/hooks/useTimer';
import { Pause, Play, Volume2, VolumeX, Focus, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import length from '@turf/length';
import { lineString } from '@turf/helpers';

const FlightMap = dynamic(() => import('@/components/FlightMap'), { ssr: false });
const FlightRoute = dynamic(() => import('@/components/FlightRoute'), { ssr: false });
const AnimatedMarker = dynamic(() => import('@/components/AnimatedMarker'), { ssr: false });
const LocationMarkers = dynamic(() => import('@/components/LocationMarkers'), { ssr: false });

export default function FlightPage() {
  const router = useRouter();
  const params = useParams();
  const { selectedFlight, selectedDeparture, selectedSeat, selectedFocus, startTime, resetBooking } = useBookingStore();
  const { addFlight } = useHistoryStore();
  const [isPaused, setIsPaused] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [followCamera, setFollowCamera] = useState(true);
  const [pausedAt, setPausedAt] = useState<number | null>(null);
  const [pausedDuration, setPausedDuration] = useState(0);
  const [showMapStyleSheet, setShowMapStyleSheet] = useState(false);
  const [mapStyle, setMapStyle] = useState<'monochrome' | 'vector' | 'standard' | 'satellite'>('satellite');
  const [showLabels, setShowLabels] = useState(true);
  const [hasSavedToHistory, setHasSavedToHistory] = useState(false);
  const layerButtonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Audio refs
  const planeAudioRef = useRef<HTMLAudioElement | null>(null);
  const startAudioRef = useRef<HTMLAudioElement | null>(null);
  const hasPlayedStartSound = useRef(false);

  const effectiveStartTime = startTime ? startTime + pausedDuration : null;
  const { progress, isCompleted, formattedTime } = useTimer(
    effectiveStartTime,
    selectedFlight?.durationMinutes || 0,
    isPaused
  );

  // Initialize audio elements and play start sound
  useEffect(() => {
    planeAudioRef.current = new Audio('/plane_sound/cabin/plane.mp3');
    planeAudioRef.current.loop = true;
    planeAudioRef.current.volume = 0.6;

    startAudioRef.current = new Audio('/plane_sound/cabin/start.mp3');
    startAudioRef.current.volume = 0.7;

    // Play start sound immediately when component mounts (flight begins)
    if (startTime && !hasPlayedStartSound.current) {
      // Small delay to ensure audio is ready
      setTimeout(() => {
        if (startAudioRef.current) {
          startAudioRef.current.play().catch(err => {
            console.log('Start sound play failed:', err);
            // Retry on user interaction
            const playOnInteraction = () => {
              startAudioRef.current?.play().catch(e => console.log('Retry failed:', e));
              document.removeEventListener('click', playOnInteraction);
              document.removeEventListener('touchstart', playOnInteraction);
            };
            document.addEventListener('click', playOnInteraction, { once: true });
            document.addEventListener('touchstart', playOnInteraction, { once: true });
          });
          hasPlayedStartSound.current = true;
        }
      }, 100);
    }

    return () => {
      if (planeAudioRef.current) {
        planeAudioRef.current.pause();
        planeAudioRef.current = null;
      }
      if (startAudioRef.current) {
        startAudioRef.current.pause();
        startAudioRef.current = null;
      }
    };
  }, [startTime]);

  // Handle plane background sound based on pause state and sound toggle
  useEffect(() => {
    const planeAudio = planeAudioRef.current;
    if (!planeAudio) return;

    if (soundEnabled && !isPaused && !isCompleted) {
      planeAudio.play().catch(err => console.log('Plane sound play failed:', err));
    } else {
      planeAudio.pause();
    }
  }, [soundEnabled, isPaused, isCompleted]);

  useEffect(() => {
    if (!selectedFlight || !startTime || selectedFlight.id !== params.flightId) {
      router.push('/');
    }
  }, [selectedFlight, startTime, params.flightId, router]);

  useEffect(() => {
    if (isCompleted && !hasSavedToHistory && selectedFlight && selectedDeparture && selectedSeat && selectedFocus) {
      // Save to history
      const turfRoute = [selectedFlight.departureCoords, selectedFlight.arrivalCoords].map((coord) => [
        coord[1],
        coord[0],
      ]);
      const line = lineString(turfRoute);
      const distance = Math.round(length(line, { units: 'kilometers' }));

      addFlight({
        id: `${Date.now()}-${selectedFlight.id}`,
        flightId: selectedFlight.id,
        departureCode: selectedDeparture.code,
        departureName: selectedDeparture.name,
        arrivalCode: selectedFlight.code,
        arrivalName: selectedFlight.name,
        departureCoords: selectedFlight.departureCoords,
        arrivalCoords: selectedFlight.arrivalCoords,
        durationMinutes: selectedFlight.durationMinutes,
        focusType: selectedFocus,
        seat: selectedSeat,
        completedAt: Date.now(),
        distance,
      });

      setHasSavedToHistory(true);

      // Reset booking and return to home
      setTimeout(() => {
        resetBooking();
        router.push('/');
      }, 2000);
    }
  }, [isCompleted, hasSavedToHistory, selectedFlight, selectedDeparture, selectedSeat, selectedFocus, addFlight, resetBooking, router]);

  // Click outside to close popover
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showMapStyleSheet &&
        popoverRef.current &&
        layerButtonRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        !layerButtonRef.current.contains(event.target as Node)
      ) {
        setShowMapStyleSheet(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMapStyleSheet]);

  if (!selectedFlight) {
    return null;
  }

  const togglePause = () => {
    if (isPaused) {
      // Resume
      setIsPaused(false);
      const now = Date.now();
      if (pausedAt) {
        setPausedDuration((prev) => prev + (now - pausedAt));
      }
      setPausedAt(null);
    } else {
      // Pause
      setIsPaused(true);
      setPausedAt(Date.now());
    }
  };

  // Calculate remaining distance
  const turfRoute = [selectedFlight.departureCoords, selectedFlight.arrivalCoords].map((coord) => [
    coord[1],
    coord[0],
  ]);
  const line = lineString(turfRoute);
  const totalDistance = length(line, { units: 'kilometers' });
  const remainingDistance = Math.round(totalDistance * (1 - progress));

  return (
    <div className="relative w-full h-[100dvh] bg-ios-black">
      <FlightMap
        center={selectedFlight.departureCoords}
        zoom={4}
        dragging={true}
        mapStyle={mapStyle}
        showLabels={showLabels}
      >
        <FlightRoute start={selectedFlight.departureCoords} end={selectedFlight.arrivalCoords} />
        <LocationMarkers
          departure={selectedFlight.departureCoords}
          arrival={selectedFlight.arrivalCoords}
          departureLabel={selectedDeparture ? `${selectedDeparture.name} (${selectedDeparture.code})` : "Departure"}
          arrivalLabel={`${selectedFlight.name} (${selectedFlight.code})`}
        />
        <AnimatedMarker
          route={[selectedFlight.departureCoords, selectedFlight.arrivalCoords]}
          progress={progress}
          followCamera={followCamera}
          isPaused={isPaused}
        />
      </FlightMap>

      {/* Top Controls */}
      <div className="absolute top-0 left-0 right-0 z-10 pt-6 px-6 pointer-events-none">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={togglePause}
              className="w-12 h-12 rounded-full bg-ios-white/10 backdrop-blur-md flex items-center justify-center text-ios-white pointer-events-auto"
            >
              {isPaused ? <Play className="w-5 h-5" strokeWidth={1.5} /> : <Pause className="w-5 h-5" strokeWidth={1.5} />}
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setFollowCamera(!followCamera)}
              className={`w-12 h-12 rounded-full backdrop-blur-md flex items-center justify-center transition-colors pointer-events-auto ${
                followCamera ? 'bg-ios-white text-ios-black' : 'bg-ios-white/10 text-ios-white'
              }`}
            >
              <Focus className="w-5 h-5" strokeWidth={1.5} />
            </motion.button>
          </div>

          <div className="flex items-center gap-3">
            <motion.button
              ref={layerButtonRef}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowMapStyleSheet(!showMapStyleSheet)}
              className="w-12 h-12 rounded-full bg-ios-white/10 backdrop-blur-md flex items-center justify-center text-ios-white pointer-events-auto"
            >
              <Layers className="w-5 h-5" strokeWidth={1.5} />
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="w-12 h-12 rounded-full bg-ios-white/10 backdrop-blur-md flex items-center justify-center text-ios-white pointer-events-auto"
            >
              {soundEnabled ? <Volume2 className="w-5 h-5" strokeWidth={1.5} /> : <VolumeX className="w-5 h-5" strokeWidth={1.5} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pb-6 px-6">
        <div className="space-y-3">
          <div className="flex items-end justify-between w-full">
            <div className="text-left">
              <p className="text-xs text-ios-gray-600 uppercase tracking-wider mb-1 font-semibold drop-shadow-lg">Time Remaining</p>
              <p className="text-4xl font-black text-ios-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">{formattedTime}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-ios-gray-600 uppercase tracking-wider mb-1 font-semibold drop-shadow-lg">Distance</p>
              <p className="text-4xl font-black text-ios-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
                {remainingDistance} <span className="text-lg text-ios-gray-500 font-semibold drop-shadow-lg">km</span>
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-ios-white/10 rounded-full h-2 overflow-hidden backdrop-blur-md shadow-lg">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress * 100}%` }}
              transition={{ duration: 1, ease: 'linear' }}
              className="h-full bg-ios-white"
            />
          </div>
        </div>
      </div>

      {/* Map Style Popover */}
      <AnimatePresence>
        {showMapStyleSheet && (() => {
          const buttonRect = layerButtonRef.current?.getBoundingClientRect();
          const popoverWidth = 320; // w-80 = 20rem = 320px
          const popoverRight = 24; // right-6 = 1.5rem = 24px
          const arrowSize = 16; // w-4 = 1rem = 16px

          // Calculate arrow position relative to popover
          const arrowRightOffset = buttonRect
            ? (window.innerWidth - buttonRect.right + buttonRect.width / 2 - popoverRight - arrowSize / 2)
            : 70;

          return (
            <motion.div
              ref={popoverRef}
              initial={{ opacity: 0, scale: 0.9, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="absolute top-20 right-6 z-40 w-80 bg-zinc-900/50 backdrop-blur-xl rounded-2xl p-4 shadow-2xl"
            >
                {/* Arrow pointing up to button */}
                <div
                  className="absolute -top-2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-zinc-900/50"
                  style={{ right: `${arrowRightOffset}px` }}
                />

              <h2 className="text-lg font-semibold text-ios-white mb-3 px-1">Choose Map Style</h2>

              <div className="grid grid-cols-2 gap-3 mb-3">
                {([
                  { id: 'monochrome', name: 'Monochrome', preview: '/maps/layer_icon/Monochrome.png' },
                  { id: 'vector', name: 'Terra', preview: '/maps/layer_icon/Terra.png' },
                  { id: 'standard', name: 'Standard', preview: '/maps/layer_icon/Standard.png' },
                  { id: 'satellite', name: 'Satellite', preview: '/maps/layer_icon/Satellite.jpg' },
                ] as const).map((style) => (
                  <motion.button
                    key={style.id}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setMapStyle(style.id);
                      setShowMapStyleSheet(false);
                    }}
                    className={`relative aspect-[4/3] rounded-xl overflow-hidden border-3 transition-all ${
                      mapStyle === style.id ? 'border-ios-white ring-2 ring-ios-white/50' : 'border-zinc-700'
                    }`}
                  >
                    <Image
                      src={style.preview}
                      alt={style.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 40vw, 160px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-ios-black/60 z-10" />
                    <div className="absolute bottom-1.5 left-0 right-0 flex items-center justify-center z-20 px-2">
                      <span className="text-ios-white font-medium text-xs drop-shadow-lg">{style.name}</span>
                    </div>
                  </motion.button>
                ))}
              </div>

<div className="flex items-center justify-between bg-zinc-800/60 rounded-xl px-3 py-2.5">
                <span className="text-ios-white text-sm font-medium">Labels</span>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowLabels(!showLabels)}
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                    showLabels ? 'bg-green-500' : 'bg-zinc-700'
                  }`}
                >
                  <motion.div
                    // ✅ 수정된 부분: 이동 거리를 20으로 변경
                    animate={{ x: showLabels ? 20 : 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    // ✅ 수정된 부분: 원 크기를 w-4 h-4로 변경하고, 수직/수평 정렬을 위해 top/left 조정
                    className="absolute top-1 left-1 w-4 h-4 rounded-full bg-ios-white shadow-md"
                  />
                </motion.button>
              </div>
            </motion.div>
          );
        })()}
      </AnimatePresence>

      {/* Completion Overlay */}
      {isCompleted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 z-20 bg-ios-black/80 backdrop-blur-xl flex items-center justify-center"
        >
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              <h2 className="text-4xl font-bold text-ios-white mb-2">Flight Complete!</h2>
              <p className="text-lg text-ios-gray-400">You've arrived at your destination</p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
}