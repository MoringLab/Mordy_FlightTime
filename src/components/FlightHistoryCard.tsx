'use client';

import { motion } from 'framer-motion';
import { Plane, Clock, MapPin } from 'lucide-react';
import { FlightHistory } from '@/types';

interface FlightHistoryCardProps {
  flight: FlightHistory;
  onRefly?: () => void;
}

const focusTypeColors = {
  work: 'bg-blue-500',
  study: 'bg-purple-500',
  relax: 'bg-green-500',
  sleep: 'bg-indigo-500',
};

const focusTypeLabels = {
  work: 'Work',
  study: 'Study',
  relax: 'Relax',
  sleep: 'Sleep',
};

export default function FlightHistoryCard({ flight, onRefly }: FlightHistoryCardProps) {
  const completedDate = new Date(flight.completedAt);
  const formattedDate = completedDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
  const formattedTime = completedDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const hours = Math.floor(flight.durationMinutes / 60);
  const minutes = flight.durationMinutes % 60;
  const durationText = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      className="bg-zinc-900/50 backdrop-blur-md rounded-2xl p-4 border border-zinc-800/50"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <div className={`${focusTypeColors[flight.focusType]} w-2 h-2 rounded-full`} />
            <span className="text-xs text-gray-400 uppercase tracking-wider">
              {focusTypeLabels[flight.focusType]}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div>
              <p className="text-2xl font-bold text-white">{flight.departureCode}</p>
              <p className="text-xs text-gray-500">{flight.departureName}</p>
            </div>
            <Plane className="w-4 h-4 text-gray-400 rotate-45" strokeWidth={1.5} />
            <div>
              <p className="text-2xl font-bold text-white">{flight.arrivalCode}</p>
              <p className="text-xs text-gray-500">{flight.arrivalName}</p>
            </div>
          </div>
        </div>
        {onRefly && (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onRefly}
            className="px-3 py-1.5 bg-white/10 rounded-full text-xs font-semibold text-white backdrop-blur-sm"
          >
            Refly
          </motion.button>
        )}
      </div>

      <div className="flex items-center justify-between text-xs text-gray-400">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span>{durationText}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span>{flight.distance.toLocaleString()} km</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-gray-500">{formattedDate}</p>
          <p className="text-gray-600 text-[10px]">{formattedTime}</p>
        </div>
      </div>
    </motion.div>
  );
}
