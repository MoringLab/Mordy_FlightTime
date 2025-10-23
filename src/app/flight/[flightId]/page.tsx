'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useBookingStore } from '@/store/bookingStore';
import { useTimer } from '@/hooks/useTimer';
import { Pause, Play, Volume2, VolumeX, Focus } from 'lucide-react';
import { motion } from 'framer-motion';
import length from '@turf/length';
import { lineString } from '@turf/helpers';

const FlightMap = dynamic(() => import('@/components/FlightMap'), { ssr: false });
const FlightRoute = dynamic(() => import('@/components/FlightRoute'), { ssr: false });
const AnimatedMarker = dynamic(() => import('@/components/AnimatedMarker'), { ssr: false });
const LocationMarkers = dynamic(() => import('@/components/LocationMarkers'), { ssr: false });

export default function FlightPage() {
  const router = useRouter();
  const params = useParams();
  const { selectedFlight, startTime, setStartTime } = useBookingStore();
  const [isPaused, setIsPaused] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [followCamera, setFollowCamera] = useState(true);
  const [pausedAt, setPausedAt] = useState<number | null>(null);
  const [pausedDuration, setPausedDuration] = useState(0);

  const effectiveStartTime = startTime ? startTime + pausedDuration : null;
  const { remainingSeconds, progress, isCompleted, formattedTime } = useTimer(
    effectiveStartTime,
    selectedFlight?.durationMinutes || 0,
    isPaused
  );

  useEffect(() => {
    if (!selectedFlight || !startTime || selectedFlight.id !== params.flightId) {
      router.push('/');
    }
  }, [selectedFlight, startTime, params.flightId, router]);

  useEffect(() => {
    if (isCompleted) {
      setTimeout(() => {
        router.push('/');
      }, 2000);
    }
  }, [isCompleted, router]);

  if (!selectedFlight) {
    return null;
  }

  const togglePause = () => {
    if (isPaused) {
      // Resume
      const now = Date.now();
      if (pausedAt) {
        setPausedDuration((prev) => prev + (now - pausedAt));
      }
      setPausedAt(null);
    } else {
      // Pause
      setPausedAt(Date.now());
    }
    setIsPaused(!isPaused);
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
    <div className="relative w-full h-screen overflow-hidden bg-ios-black">
      <FlightMap
        center={selectedFlight.departureCoords}
        zoom={4}
        dragging={true}
      >
        <FlightRoute start={selectedFlight.departureCoords} end={selectedFlight.arrivalCoords} />
        <LocationMarkers
          departure={selectedFlight.departureCoords}
          arrival={selectedFlight.arrivalCoords}
          departureLabel="Singapore (SPX)"
          arrivalLabel={`${selectedFlight.name} (${selectedFlight.code})`}
        />
        <AnimatedMarker
          route={[selectedFlight.departureCoords, selectedFlight.arrivalCoords]}
          progress={progress}
          followCamera={followCamera}
        />
      </FlightMap>

      {/* Top Controls */}
      <div className="absolute top-0 left-0 right-0 z-10 p-6 bg-gradient-to-b from-ios-black/60 to-transparent backdrop-blur-sm">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <div className="flex items-center gap-3">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={togglePause}
              className="w-12 h-12 rounded-full bg-ios-white/10 backdrop-blur-md flex items-center justify-center text-ios-white"
            >
              {isPaused ? <Play className="w-5 h-5" strokeWidth={1.5} /> : <Pause className="w-5 h-5" strokeWidth={1.5} />}
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setFollowCamera(!followCamera)}
              className={`w-12 h-12 rounded-full backdrop-blur-md flex items-center justify-center transition-colors ${
                followCamera ? 'bg-ios-white text-ios-black' : 'bg-ios-white/10 text-ios-white'
              }`}
            >
              <Focus className="w-5 h-5" strokeWidth={1.5} />
            </motion.button>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="w-12 h-12 rounded-full bg-ios-white/10 backdrop-blur-md flex items-center justify-center text-ios-white"
          >
            {soundEnabled ? <Volume2 className="w-5 h-5" strokeWidth={1.5} /> : <VolumeX className="w-5 h-5" strokeWidth={1.5} />}
          </motion.button>
        </div>
      </div>

      {/* Bottom Info - 수정된 부분 */}
      <div className="absolute bottom-2 md:bottom-8 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-lg z-10 p-6 bg-ios-black/50 backdrop-blur-xl rounded-3xl">
        <div className="space-y-4">
          <div className="text-center">
            <p className="text-sm text-ios-gray-400 mb-1">Flying to</p>
            <h1 className="text-3xl font-bold text-ios-white">
              {selectedFlight.name} ({selectedFlight.code})
            </h1>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-ios-white/10 rounded-2xl p-4 text-center">
              <p className="text-xs text-ios-gray-400 uppercase tracking-wider mb-2">Time Remaining</p>
              <p className="text-2xl font-bold text-ios-white">{formattedTime}</p>
            </div>
            <div className="bg-ios-white/10 rounded-2xl p-4 text-center">
              <p className="text-xs text-ios-gray-400 uppercase tracking-wider mb-2">Distance</p>
              <p className="text-2xl font-bold text-ios-white">{remainingDistance} km</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-ios-white/10 rounded-full h-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress * 100}%` }}
              transition={{ duration: 1, ease: 'linear' }}
              className="h-full bg-ios-white"
            />
          </div>
        </div>
      </div>

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