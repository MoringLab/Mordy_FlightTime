import { create } from 'zustand';
import { BookingState, Airport, FocusType } from '@/types';
import { AIRPORTS, FLIGHT_ROUTES } from '@/data/flights';

export const useBookingStore = create<BookingState>((set) => ({
  airports: AIRPORTS,
  routes: FLIGHT_ROUTES,
  selectedDeparture: AIRPORTS[0], // Default to Singapore
  selectedFlight: null,
  selectedSeat: null,
  selectedFocus: null,
  startTime: null,

  setSelectedDeparture: (airport: Airport) => set({ selectedDeparture: airport, selectedFlight: null }),
  setSelectedFlight: (flight) => set({ selectedFlight: flight }),
  setSelectedSeat: (seat: string) => set({ selectedSeat: seat }),
  setSelectedFocus: (focus: FocusType) => set({ selectedFocus: focus }),
  setStartTime: (time: number) => set({ startTime: time }),

  resetBooking: () =>
    set({
      selectedFlight: null,
      selectedSeat: null,
      selectedFocus: null,
      startTime: null,
    }),
}));
