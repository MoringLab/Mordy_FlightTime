import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { FlightHistory, FlightStats } from '@/types';

interface HistoryState {
  history: FlightHistory[];
  addFlight: (flight: FlightHistory) => void;
  getStats: () => FlightStats;
  getRecentFlights: (limit?: number) => FlightHistory[];
  clearHistory: () => void;
}

export const useHistoryStore = create<HistoryState>()(
  persist(
    (set, get) => ({
      history: [],

      addFlight: (flight) =>
        set((state) => ({
          history: [flight, ...state.history],
        })),

      getStats: () => {
        const { history } = get();

        if (history.length === 0) {
          return {
            totalFlights: 0,
            totalMinutes: 0,
            totalDistance: 0,
            uniqueCities: 0,
            favoriteDestination: null,
            longestFlight: 0,
          };
        }

        const totalFlights = history.length;
        const totalMinutes = history.reduce((sum, flight) => sum + flight.durationMinutes, 0);
        const totalDistance = history.reduce((sum, flight) => sum + flight.distance, 0);

        // Count unique cities
        const cities = new Set<string>();
        history.forEach((flight) => {
          cities.add(flight.departureCode);
          cities.add(flight.arrivalCode);
        });
        const uniqueCities = cities.size;

        // Find favorite destination (most visited arrival city)
        const destinationCounts = new Map<string, number>();
        history.forEach((flight) => {
          const count = destinationCounts.get(flight.arrivalCode) || 0;
          destinationCounts.set(flight.arrivalCode, count + 1);
        });

        let favoriteDestination: string | null = null;
        let maxCount = 0;
        destinationCounts.forEach((count, code) => {
          if (count > maxCount) {
            maxCount = count;
            favoriteDestination = code;
          }
        });

        // Find longest flight
        const longestFlight = Math.max(...history.map((f) => f.durationMinutes));

        return {
          totalFlights,
          totalMinutes,
          totalDistance,
          uniqueCities,
          favoriteDestination,
          longestFlight,
        };
      },

      getRecentFlights: (limit = 5) => {
        const { history } = get();
        return history.slice(0, limit);
      },

      clearHistory: () => set({ history: [] }),
    }),
    {
      name: 'flight-history',
    }
  )
);
