'use client';

import { motion } from 'framer-motion';
import { Airport } from '@/types';

interface AirportSelectorProps {
  airports: Airport[];
  selected: Airport | null;
  onSelect: (airport: Airport) => void;
}

export default function AirportSelector({ airports, selected, onSelect }: AirportSelectorProps) {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-ios-gray-400 uppercase tracking-wider mb-3">
        Departure City
      </h3>
      <div
        className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar"
        style={{
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {airports.slice(0, 15).map((airport) => (
          <motion.button
            key={airport.code}
            onClick={() => onSelect(airport)}
            whileTap={{ scale: 0.95 }}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors snap-center ${
              selected?.code === airport.code
                ? 'bg-ios-white text-ios-black'
                : 'bg-ios-zinc-800 text-ios-white hover:bg-ios-zinc-700'
            }`}
          >
            {airport.name}
          </motion.button>
        ))}
        <style jsx>{`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
      </div>
    </div>
  );
}
