'use client';

import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useBookingStore } from '@/store/bookingStore';
import DraggableBottomSheet from '@/components/DraggableBottomSheet';
import FlightCarousel from '@/components/FlightCarousel';
import AirportSelector from '@/components/AirportSelector';
import { Plane } from 'lucide-react';
import { FlightDestination } from '@/types';

const FlightMap = dynamic(() => import('@/components/FlightMap'), { ssr: false });
const LocationMarkers = dynamic(() => import('@/components/LocationMarkers'), { ssr: false });

export default function Home() {
  const router = useRouter();
  const {
    airports,
    routes,
    selectedDeparture,
    selectedFlight,
    setSelectedDeparture,
    setSelectedFlight,
  } = useBookingStore();

  // Calculate available flights from selected departure
  const availableFlights = useMemo<FlightDestination[]>(() => {
    if (!selectedDeparture) return [];

    const departureRoutes = routes.filter((r) => r.departure === selectedDeparture.code);

    return departureRoutes.map((route) => {
      const arrivalAirport = airports.find((a) => a.code === route.arrival)!;
      return {
        id: route.id,
        name: arrivalAirport.name,
        code: arrivalAirport.code,
        country: arrivalAirport.country,
        durationMinutes: route.durationMinutes,
        departureCoords: selectedDeparture.coords,
        arrivalCoords: arrivalAirport.coords,
      };
    });
  }, [selectedDeparture, routes, airports]);

  const handleBookFlight = () => {
    if (selectedFlight) {
      router.push('/book/seat');
    }
  };

  const peekContent = (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-ios-white flex items-center justify-center">
          <Plane className="w-6 h-6 text-ios-black" strokeWidth={1.5} />
        </div>
        <div>
          <p className="text-sm text-ios-gray-400">Selected Flight</p>
          <p className="text-lg font-semibold text-ios-white">
            {selectedFlight
              ? `${selectedFlight.name} ${selectedFlight.durationMinutes}m`
              : 'No flight selected'}
          </p>
        </div>
      </div>
      <button
        onClick={handleBookFlight}
        disabled={!selectedFlight}
        className={`px-6 py-3 rounded-full font-semibold text-sm transition-all ${
          selectedFlight
            ? 'bg-ios-white text-ios-black active:scale-95'
            : 'bg-ios-zinc-800 text-ios-gray-400 cursor-not-allowed'
        }`}
      >
        Book
      </button>
    </div>
  );

  const fullContent = (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-ios-white mb-2">Choose Your Flight</h2>
        <p className="text-sm text-ios-gray-400">Select a departure and destination for your focus session</p>
      </div>

      <AirportSelector
        airports={airports}
        selected={selectedDeparture}
        onSelect={setSelectedDeparture}
      />

      {availableFlights && availableFlights.length > 0 && (
        <>
          <h3 className="text-sm font-semibold text-ios-gray-400 uppercase tracking-wider">
            Available Destinations
          </h3>
          <FlightCarousel
            flights={availableFlights}
            selectedFlight={selectedFlight}
            onSelectFlight={setSelectedFlight}
          />
        </>
      )}

      <button
        onClick={handleBookFlight}
        disabled={!selectedFlight}
        className={`w-full py-4 rounded-2xl font-semibold text-base transition-all ${
          selectedFlight
            ? 'bg-ios-white text-ios-black active:scale-[0.98]'
            : 'bg-ios-zinc-800 text-ios-gray-400 cursor-not-allowed'
        }`}
      >
        Book My Flight
      </button>
    </div>
  );

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <FlightMap
        center={selectedFlight?.arrivalCoords || selectedDeparture?.coords || [1.3521, 103.8198]}
        zoom={selectedFlight ? 5 : 3}
      >
        {selectedFlight && selectedDeparture && (
          <LocationMarkers
            departure={selectedDeparture.coords}
            arrival={selectedFlight.arrivalCoords}
            departureLabel={`${selectedDeparture.name} (${selectedDeparture.code})`}
            arrivalLabel={`${selectedFlight.name} (${selectedFlight.code})`}
          />
        )}
      </FlightMap>
      <DraggableBottomSheet initialSnap="FULL" peekContent={peekContent}>
        {fullContent}
      </DraggableBottomSheet>
    </div>
  );
}
