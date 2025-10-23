'use client';

import { motion } from 'framer-motion';
import { FlightDestination } from '@/types';
import { MapPin } from 'lucide-react';

interface DestinationCardProps {
  destination: FlightDestination;
  isSelected: boolean;
  onClick: () => void;
}

export default function DestinationCard({ destination, isSelected, onClick }: DestinationCardProps) {
  return (
    <motion.button
      onClick={onClick}
      className="relative flex-shrink-0 w-32 h-40 rounded-2xl overflow-hidden snap-center"
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      {isSelected && (
        <motion.div
          layoutId="selected-card-bg"
          className="absolute inset-0 bg-ios-white"
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
      )}
      <div
        className={`relative z-10 w-full h-full p-4 flex flex-col justify-between transition-colors ${
          isSelected ? 'text-ios-black' : 'text-ios-white bg-ios-zinc-800'
        }`}
        style={{ borderRadius: 'inherit' }}
      >
        <div className="flex flex-col items-start gap-1">
          <MapPin className="w-5 h-5" strokeWidth={1.5} />
          <h3 className="text-lg font-semibold">{destination.code}</h3>
        </div>
        <div className="flex flex-col items-start">
          <p className="text-sm font-medium">{destination.name}</p>
          <p className={`text-xs ${isSelected ? 'text-ios-zinc-700' : 'text-ios-gray-400'}`}>
            {destination.durationMinutes}m
          </p>
        </div>
      </div>
    </motion.button>
  );
}
