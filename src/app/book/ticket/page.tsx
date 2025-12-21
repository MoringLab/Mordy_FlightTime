'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useBookingStore } from '@/store/bookingStore';
import BoardingPass from '@/components/BoardingPass';

const FlightMap = dynamic(() => import('@/components/FlightMap'), { ssr: false });
const FlightRoute = dynamic(() => import('@/components/FlightRoute'), { ssr: false });
const LocationMarkers = dynamic(() => import('@/components/LocationMarkers'), { ssr: false });

function MapContent() {
  const { selectedFlight, selectedDeparture } = useBookingStore();

  if (!selectedFlight || !selectedDeparture) return null;

  return (
    <>
      <FlightRoute start={selectedFlight.departureCoords} end={selectedFlight.arrivalCoords} />
      <LocationMarkers
        departure={selectedFlight.departureCoords}
        arrival={selectedFlight.arrivalCoords}
        departureLabel={`${selectedDeparture.name} (${selectedDeparture.code})`}
        arrivalLabel={`${selectedFlight.name} (${selectedFlight.code})`}
      />
    </>
  );
}

export default function BoardingPassPage() {
  const router = useRouter();
  const { selectedFlight, selectedDeparture, selectedSeat, selectedFocus, setStartTime } = useBookingStore();

  useEffect(() => {
    if (!selectedFlight || !selectedSeat || !selectedFocus) {
      router.push('/');
    }
  }, [selectedFlight, selectedSeat, selectedFocus, router]);

  if (!selectedFlight || !selectedSeat || !selectedFocus) {
    return null;
  }

  const handleStartFocus = () => {
    setStartTime(Date.now());
    router.push(`/flight/${selectedFlight.id}`);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-ios-black">
      <FlightMap dragging={false} center={selectedFlight.departureCoords} zoom={3}>
        <MapContent />
      </FlightMap>

      <BoardingPass
        flight={selectedFlight}
        seat={selectedSeat}
        focus={selectedFocus}
        departureCode={selectedDeparture?.code}
        departureName={selectedDeparture?.name}
        departureCoords={selectedFlight.departureCoords}
        onStartFocus={handleStartFocus}
      />

    </div>
  );
}