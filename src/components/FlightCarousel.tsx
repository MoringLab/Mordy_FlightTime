'use client';

import { FlightDestination } from '@/types';
import DestinationCard from './DestinationCard';

interface FlightCarouselProps {
  flights: FlightDestination[];
  selectedFlight: FlightDestination | null;
  onSelectFlight: (flight: FlightDestination) => void;
}

export default function FlightCarousel({
  flights = [],
  selectedFlight,
  onSelectFlight,
}: FlightCarouselProps) {
  if (!flights || flights.length === 0) return null;

  return (
    <div
      className="flex gap-3 overflow-x-auto pb-4 px-6 hide-scrollbar"
      style={{
        scrollSnapType: 'x mandatory',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      {flights.map((flight) => (
        <DestinationCard
          key={flight.id}
          destination={flight}
          isSelected={selectedFlight?.id === flight.id}
          onClick={() => onSelectFlight(flight)}
        />
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
  );
}
