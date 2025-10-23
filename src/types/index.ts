export type FocusType = 'work' | 'study' | 'relax' | 'sleep';

export interface Airport {
  code: string;
  name: string;
  country: string;
  coords: [number, number]; // [lat, lng]
}

export interface FlightRoute {
  id: string;
  departure: string; // airport code
  arrival: string; // airport code
  durationMinutes: number;
}

export interface FlightDestination {
  id: string;
  name: string;
  code: string;
  country: string;
  durationMinutes: number;
  departureCoords: [number, number]; // [lat, lng]
  arrivalCoords: [number, number]; // [lat, lng]
}

export interface BookingState {
  airports: Airport[];
  routes: FlightRoute[];
  selectedDeparture: Airport | null;
  selectedFlight: FlightDestination | null;
  selectedSeat: string | null;
  selectedFocus: FocusType | null;
  startTime: number | null;
  setSelectedDeparture: (airport: Airport) => void;
  setSelectedFlight: (flight: FlightDestination) => void;
  setSelectedSeat: (seat: string) => void;
  setSelectedFocus: (focus: FocusType) => void;
  setStartTime: (time: number) => void;
  resetBooking: () => void;
}

export type SnapPoint = 'PEEK' | 'FULL';
