'use client';

import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useBookingStore } from '@/store/bookingStore';
import { useHistoryStore } from '@/store/historyStore';
import { Plane, Plus } from 'lucide-react';
import { FlightDestination } from '@/types';
import FlightHistoryCard from '@/components/FlightHistoryCard';
import FlightStats from '@/components/FlightStats';
import DraggableBottomSheet from '@/components/DraggableBottomSheet';
import FlightCarousel from '@/components/FlightCarousel';
import AirportSelector from '@/components/AirportSelector';

const FlightMap = dynamic(() => import('@/components/FlightMap'), { ssr: false });
const LocationMarkers = dynamic(() => import('@/components/LocationMarkers'), { ssr: false });
const FlightRoute = dynamic(() => import('@/components/FlightRoute'), { ssr: false });

export default function Home() {
  const router = useRouter();
  const [showFlightSelector, setShowFlightSelector] = useState(false);

  const {
    airports,
    routes,
    selectedDeparture,
    selectedFlight,
    setSelectedDeparture,
    setSelectedFlight,
  } = useBookingStore();

  const { history, getStats, getRecentFlights } = useHistoryStore();
  const stats = getStats();
  const recentFlights = getRecentFlights(3);

  // Calculate available flights from selected departure
  const availableFlights = useMemo<FlightDestination[]>(() => {
    if (!selectedDeparture) return [];

    const departureRoutes = routes.filter((r) => r.departure === selectedDeparture.code);

    return departureRoutes.map((route) => {
      const arrivalAirport = airports.find((a) => a.code === route.arrival)!;
      const today = new Date();
      const formattedDate = `${today.getFullYear()}/${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getDate()).padStart(2, '0')}`;
      return {
        id: route.id,
        name: arrivalAirport.name,
        code: arrivalAirport.code,
        country: arrivalAirport.country,
        durationMinutes: route.durationMinutes,
        departureCoords: selectedDeparture.coords,
        arrivalCoords: arrivalAirport.coords,
        date: formattedDate,
      };
    });
  }, [selectedDeparture, routes, airports]);

  const handleBookFlight = () => {
    if (selectedFlight) {
      router.push('/book/seat', { scroll: false });
    }
  };

  const handleRefly = (flight: typeof recentFlights[0]) => {
    // Set departure and arrival based on history
    const departure = airports.find((a) => a.code === flight.departureCode);
    const arrival = airports.find((a) => a.code === flight.arrivalCode);

    if (departure) {
      setSelectedDeparture(departure);
    }

    if (arrival && departure) {
      const route = routes.find(
        (r) => r.departure === flight.departureCode && r.arrival === flight.arrivalCode
      );

      if (route) {
        const today = new Date();
        const formattedDate = `${today.getFullYear()}/${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getDate()).padStart(2, '0')}`;

        setSelectedFlight({
          id: route.id,
          name: arrival.name,
          code: arrival.code,
          country: arrival.country,
          durationMinutes: route.durationMinutes,
          departureCoords: departure.coords,
          arrivalCoords: arrival.coords,
          date: formattedDate,
        });

        router.push('/book/seat', { scroll: false });
      }
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
        className={`w-full py-4 rounded-full font-semibold text-base transition-all ${
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
    <div className="relative w-full h-[100dvh] bg-black overflow-hidden">
      {/* Background Map */}
      <div className="absolute inset-0">
        <FlightMap
          center={selectedFlight?.arrivalCoords || selectedDeparture?.coords || [1.3521, 103.8198]}
          zoom={selectedFlight ? 5 : 2}
        >
          {selectedFlight && selectedDeparture && (
            <>
              <FlightRoute
                start={selectedDeparture.coords}
                end={selectedFlight.arrivalCoords}
              />
              <LocationMarkers
                departure={selectedDeparture.coords}
                arrival={selectedFlight.arrivalCoords}
                departureLabel={`${selectedDeparture.name} (${selectedDeparture.code})`}
                arrivalLabel={`${selectedFlight.name} (${selectedFlight.code})`}
              />
            </>
          )}
        </FlightMap>
      </div>

      {/* Main Content Overlay */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <div className="pt-safe px-6 pt-6 pb-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl font-bold text-white mb-1">Gateway</h1>
            <p className="text-sm text-gray-400">Your focus flight companion</p>
          </motion.div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 pb-28">
          <div className="space-y-6">
            {/* Stats */}
            <FlightStats stats={stats} />

            {/* Recent Flights */}
            {recentFlights.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  Recent Flights
                </h3>
                <div className="space-y-3">
                  {recentFlights.map((flight) => (
                    <FlightHistoryCard
                      key={flight.id}
                      flight={flight}
                      onRefly={() => handleRefly(flight)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Empty State */}
            {history.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 rounded-full bg-zinc-900/50 backdrop-blur-md flex items-center justify-center mx-auto mb-4">
                  <Plane className="w-10 h-10 text-gray-600" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Ready for takeoff?</h3>
                <p className="text-sm text-gray-400 mb-6">
                  Start your first focus session and track your journey
                </p>
              </motion.div>
            )}
          </div>
        </div>

        {/* New Flight Button */}
        <div className="absolute bottom-0 left-0 right-0 p-6 pb-safe bg-gradient-to-t from-black via-black/90 to-transparent pointer-events-none">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowFlightSelector(true)}
            className="w-full py-4 bg-white rounded-full font-semibold text-base text-black flex items-center justify-center gap-2 shadow-lg pointer-events-auto"
          >
            <Plus className="w-5 h-5" strokeWidth={2} />
            New Flight
          </motion.button>
        </div>
      </div>

      {/* Flight Selector Bottom Sheet */}
      <AnimatePresence>
        {showFlightSelector && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFlightSelector(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
            <DraggableBottomSheet
              initialSnap="FULL"
              peekContent={peekContent}
              onClose={() => setShowFlightSelector(false)}
            >
              {fullContent}
            </DraggableBottomSheet>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
