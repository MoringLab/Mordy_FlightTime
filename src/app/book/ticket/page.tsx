'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useMap } from 'react-leaflet';
import { useBookingStore } from '@/store/bookingStore';
import BoardingPass from '@/components/BoardingPass';

const FlightMap = dynamic(() => import('@/components/FlightMap'), { ssr: false });
const FlightRoute = dynamic(() => import('@/components/FlightRoute'), { ssr: false });

function MapFitter({ start, end }: { start: [number, number]; end: [number, number] }) {
  const map = useMap();

  useEffect(() => {
    // Import leaflet only on client side
    import('leaflet').then(({ latLngBounds }) => {
      const bounds = latLngBounds([start, end]);
      map.fitBounds(bounds, {
        padding: [100, 100],
        animate: true,
        duration: 1.5,
      });
    });
  }, [start, end, map]);

  return null;
}

function MapContent() {
  const { selectedFlight } = useBookingStore();

  if (!selectedFlight) return null;

  return (
    <>
      <FlightRoute start={selectedFlight.departureCoords} end={selectedFlight.arrivalCoords} />
      <MapFitter start={selectedFlight.departureCoords} end={selectedFlight.arrivalCoords} />
    </>
  );
}

export default function BoardingPassPage() {
  const router = useRouter();
  const { selectedFlight, selectedSeat, selectedFocus, setStartTime } = useBookingStore();

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
        onStartFocus={handleStartFocus}
      />

    </div>
  );
}