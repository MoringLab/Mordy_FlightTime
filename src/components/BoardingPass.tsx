'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Plane } from 'lucide-react';
import length from '@turf/length';
import { lineString } from '@turf/helpers';
import { FlightDestination, FocusType } from '@/types';


interface BoardingPassProps {
  flight: FlightDestination;
  seat: string;
  focus: FocusType;
  departureCode?: string;
  departureName?: string;
  departureCoords: [number, number];
  boardingStatus?: string;
  onStartFocus?: () => void;
}

const DottedWorldMap = () => (
    <svg className="absolute inset-0 w-full h-full text-white/10 -z-10" width="100%" height="100%" viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid slice">
      {[...Array(20)].map((_, i) => <circle key={`sea-${i}`} cx={750 + Math.random()*100} cy={350 + Math.random()*80} r="1.5" />)}
      {[...Array(15)].map((_, i) => <circle key={`ea-${i}`} cx={800 + Math.random()*100} cy={200 + Math.random()*80} r="1.5" />)}
      {[...Array(15)].map((_, i) => <circle key={`mid-${i}`} cx={650 + Math.random()*80} cy={280 + Math.random()*60} r="1.5" />)}
    </svg>
);

const PreciseBarcode = () => (
    <svg width="100%" height="50" viewBox="0 0 320 50" fill="white" className="w-full">
      <rect x="0" y="0" width="8.5" height="50" /><rect x="12" y="0" width="1.5" height="50" /><rect x="16.5" y="0" width="1.5" height="50" /><rect x="21" y="0" width="1.5" height="50" /><rect x="25.5" y="0" width="1.5" height="50" /><rect x="30" y="0" width="1.5" height="50" /><rect x="34.5" y="0" width="1.5" height="50" /><rect x="42" y="0" width="1.2" height="50" /><rect x="45" y="0" width="1.2" height="50" /><rect x="48" y="0" width="1.2" height="50" /><rect x="51" y="0" width="1.2" height="50" /><rect x="54" y="0" width="1.2" height="50" /><rect x="57" y="0" width="1.2" height="50" /><rect x="60" y="0" width="1.2" height="50" /><rect x="63" y="0" width="1.2" height="50" /><rect x="66" y="0" width="1.2" height="50" /><rect x="69" y="0" width="1.2" height="50" /><rect x="72" y="0" width="1.2" height="50" /><rect x="75" y="0" width="1.2" height="50" /><rect x="83" y="0" width="1.5" height="50" /><rect x="88" y="0" width="4" height="50" /><rect x="95" y="0" width="1.5" height="50" /><rect x="100" y="0" width="1.5" height="50" /><rect x="105" y="0" width="2" height="50" /><rect x="110" y="0" width="1.5" height="50" /><rect x="115" y="0" width="1.5" height="50" /><rect x="120" y="0" width="4" height="50" /><rect x="127" y="0" width="1.5" height="50" /><rect x="131" y="0" width="1.5" height="50" /><rect x="135" y="0" width="1.5" height="50" /><rect x="142" y="0" width="1.2" height="50" /><rect x="145" y="0" width="1.2" height="50" /><rect x="148" y="0" width="1.2" height="50" /><rect x="151" y="0" width="1.2" height="50" /><rect x="154" y="0" width="1.2" height="50" /><rect x="157" y="0" width="1.2" height="50" /><rect x="160" y="0" width="1.2" height="50" /><rect x="163" y="0" width="1.2" height="50" /><rect x="166" y="0" width="1.2" height="50" /><rect x="169" y="0" width="1.2" height="50" /><rect x="172" y="0" width="1.2" height="50" /><rect x="175" y="0" width="1.2" height="50" /><rect x="183" y="0" width="1.5" height="50" /><rect x="188" y="0" width="1.5" height="50" /><rect x="193" y="0" width="1.5" height="50" /><rect x="198" y="0" width="4" height="50" /><rect x="205" y="0" width="1.5" height="50" /><rect x="210" y="0" width="8.5" height="50" /><rect x="221" y="0" width="1.5" height="50" /><rect x="225" y="0" width="4" height="50" /><rect x="232" y="0" width="1.5" height="50" /><rect x="237" y="0" width="1.5" height="50" /><rect x="242" y="0" width="1.5" height="50" /><rect x="247" y="0" width="1.5" height="50" /><rect x="252" y="0" width="1.5" height="50" /><rect x="257" y="0" width="1.5" height="50" /><rect x="262" y="0" width="1.5" height="50" /><rect x="267" y="0" width="4" height="50" /><rect x="274" y="0" width="1.5" height="50" /><rect x="278" y="0" width="1.5" height="50" /><rect x="282" y="0" width="1.5" height="50" /><rect x="289" y="0" width="1.2" height="50" /><rect x="292" y="0" width="1.2" height="50" /><rect x="295" y="0" width="1.2" height="50" /><rect x="298" y="0" width="1.2" height="50" /><rect x="301" y="0" width="1.2" height="50" /><rect x="304" y="0" width="8.5" height="50" />
    </svg>
);


export default function BoardingPass({ flight, seat, onStartFocus, departureCode = 'SIN', departureName = 'Singapore', departureCoords, boardingStatus = 'Now' }: BoardingPassProps) {
  
  const totalDistance = useMemo(() => {
    if (departureCoords && flight.arrivalCoords) {
      // Turf.js expects [longitude, latitude] format (GeoJSON standard)
      const turfRoute = [departureCoords, flight.arrivalCoords].map((coord) => [
        coord[1], // longitude
        coord[0], // latitude
      ]);
      const line = lineString(turfRoute);
      return Math.round(length(line, { units: 'kilometers' }));
    }
    return 0;
  }, [departureCoords, flight.arrivalCoords]);

  const formattedDuration = useMemo(() => {
    const hours = Math.floor(flight.durationMinutes / 60);
    const minutes = flight.durationMinutes % 60;
    return `${hours}h ${minutes}m`;
  }, [flight.durationMinutes]);

  return (
    <motion.div
      initial={{ y: '100vh' }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 80, damping: 20 }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-sm"
    >
      <div className="relative w-full bg-stone-900/80 backdrop-blur-md rounded-2xl text-white overflow-hidden shadow-2xl border border-white/10">
        <DottedWorldMap />

        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="text-left">
              <p className="text-5xl font-bold tracking-tight">{departureCode}</p>
              <p className="text-sm text-neutral-400 mt-1">{departureName}</p>
            </div>
            
            <div className="flex flex-col items-center justify-center text-center text-neutral-300">
              <Plane className="w-6 h-6 rotate-45 opacity-70" strokeWidth={1.5} />
              <p className="text-xs mt-1">{formattedDuration}</p>
            </div>

            <div className="text-right">
              <p className="text-5xl font-bold tracking-tight">{flight.code}</p>
              <p className="text-sm text-neutral-400 mt-1">{flight.name}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-6">
            <div>
              <p className="text-xs font-light text-neutral-400 uppercase tracking-wider">Seat</p>
              <p className="text-lg font-medium">{seat}</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-light text-neutral-400 uppercase tracking-wider">Distance</p>
              <div className="flex items-center justify-end gap-2 mt-1">
                                <div className="flex items-center gap-1 bg-yellow-400 text-black px-2 py-0.5 rounded-md">
                   <Plane className="w-3 h-3" strokeWidth={2}/>
                   <span className="text-xs font-bold">{flight.code}</span>
                </div>
                <p className="text-lg font-medium">{totalDistance.toLocaleString()} km</p>
              </div>
            </div>
            <div>
              <p className="text-xs font-light text-neutral-400 uppercase tracking-wider">Boarding</p>
              <p className="text-lg font-medium">{boardingStatus}</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-light text-neutral-400 uppercase tracking-wider">Date</p>
              <p className="text-lg font-medium">{flight.date}</p>
            </div>
          </div>
        </div>
        
        <div className="px-6 py-4 bg-black/20">
            <PreciseBarcode />
        </div>
      </div>

      <button
        onClick={onStartFocus}
        className="mt-4 w-full py-4 bg-white text-black rounded-2xl font-semibold text-lg active:scale-[0.98] transition-transform shadow-lg"
      >
        Check in
      </button>
    </motion.div>
  );
}