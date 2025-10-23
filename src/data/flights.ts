import { Airport, FlightRoute } from '@/types';

// Major airports worldwide
export const AIRPORTS: Airport[] = [
  // Asia
  { code: 'SIN', name: 'Singapore', country: 'Singapore', coords: [1.3521, 103.8198] },
  { code: 'NRT', name: 'Tokyo', country: 'Japan', coords: [35.7720, 140.3929] },
  { code: 'HND', name: 'Tokyo Haneda', country: 'Japan', coords: [35.5494, 139.7798] },
  { code: 'ICN', name: 'Seoul', country: 'South Korea', coords: [37.4602, 126.4407] },
  { code: 'HKG', name: 'Hong Kong', country: 'Hong Kong', coords: [22.3080, 113.9185] },
  { code: 'PVG', name: 'Shanghai', country: 'China', coords: [31.1443, 121.8083] },
  { code: 'PEK', name: 'Beijing', country: 'China', coords: [40.0799, 116.6031] },
  { code: 'BKK', name: 'Bangkok', country: 'Thailand', coords: [13.6900, 100.7501] },
  { code: 'KUL', name: 'Kuala Lumpur', country: 'Malaysia', coords: [2.7456, 101.7072] },
  { code: 'CGK', name: 'Jakarta', country: 'Indonesia', coords: [-6.1256, 106.6558] },
  { code: 'MNL', name: 'Manila', country: 'Philippines', coords: [14.5086, 121.0194] },
  { code: 'DEL', name: 'New Delhi', country: 'India', coords: [28.5562, 77.1000] },
  { code: 'BOM', name: 'Mumbai', country: 'India', coords: [19.0896, 72.8656] },
  { code: 'DXB', name: 'Dubai', country: 'UAE', coords: [25.2532, 55.3657] },

  // Europe
  { code: 'LHR', name: 'London', country: 'United Kingdom', coords: [51.4700, -0.4543] },
  { code: 'CDG', name: 'Paris', country: 'France', coords: [49.0097, 2.5479] },
  { code: 'FRA', name: 'Frankfurt', country: 'Germany', coords: [50.0379, 8.5622] },
  { code: 'AMS', name: 'Amsterdam', country: 'Netherlands', coords: [52.3105, 4.7683] },
  { code: 'MAD', name: 'Madrid', country: 'Spain', coords: [40.4983, -3.5676] },
  { code: 'FCO', name: 'Rome', country: 'Italy', coords: [41.8003, 12.2389] },
  { code: 'ZRH', name: 'Zurich', country: 'Switzerland', coords: [47.4647, 8.5492] },
  { code: 'IST', name: 'Istanbul', country: 'Turkey', coords: [41.2753, 28.7519] },

  // North America
  { code: 'JFK', name: 'New York', country: 'USA', coords: [40.6413, -73.7781] },
  { code: 'LAX', name: 'Los Angeles', country: 'USA', coords: [33.9416, -118.4085] },
  { code: 'ORD', name: 'Chicago', country: 'USA', coords: [41.9742, -87.9073] },
  { code: 'SFO', name: 'San Francisco', country: 'USA', coords: [37.6213, -122.3790] },
  { code: 'YYZ', name: 'Toronto', country: 'Canada', coords: [43.6777, -79.6248] },
  { code: 'YVR', name: 'Vancouver', country: 'Canada', coords: [49.1967, -123.1815] },
  { code: 'MEX', name: 'Mexico City', country: 'Mexico', coords: [19.4361, -99.0719] },

  // Oceania
  { code: 'SYD', name: 'Sydney', country: 'Australia', coords: [-33.9399, 151.1753] },
  { code: 'MEL', name: 'Melbourne', country: 'Australia', coords: [-37.6690, 144.8410] },
  { code: 'AKL', name: 'Auckland', country: 'New Zealand', coords: [-37.0082, 174.7850] },

  // South America
  { code: 'GRU', name: 'São Paulo', country: 'Brazil', coords: [-23.4356, -46.4731] },
  { code: 'GIG', name: 'Rio de Janeiro', country: 'Brazil', coords: [-22.8099, -43.2505] },
  { code: 'EZE', name: 'Buenos Aires', country: 'Argentina', coords: [-34.8222, -58.5358] },

  // Africa
  { code: 'CAI', name: 'Cairo', country: 'Egypt', coords: [30.1127, 31.4000] },
  { code: 'JNB', name: 'Johannesburg', country: 'South Africa', coords: [-26.1367, 28.2411] },
  { code: 'CPT', name: 'Cape Town', country: 'South Africa', coords: [-33.9715, 18.6021] },
];

// Flight routes with realistic durations (rounded to nearest 10 minutes)
// (Version 2: Corrected for Jet Stream consistency)
export const FLIGHT_ROUTES: FlightRoute[] = [
  // From Singapore
  { id: 'SIN-NRT', departure: 'SIN', arrival: 'NRT', durationMinutes: 420 }, // 410 -> 420
  { id: 'SIN-HND', departure: 'SIN', arrival: 'HND', durationMinutes: 410 },
  { id: 'SIN-ICN', departure: 'SIN', arrival: 'ICN', durationMinutes: 410 }, // 380 -> 410
  { id: 'SIN-HKG', departure: 'SIN', arrival: 'HKG', durationMinutes: 230 },
  { id: 'SIN-PVG', departure: 'SIN', arrival: 'PVG', durationMinutes: 310 },
  { id: 'SIN-BKK', departure: 'SIN', arrival: 'BKK', durationMinutes: 150 },
  { id: 'SIN-KUL', departure: 'SIN', arrival: 'KUL', durationMinutes: 70 },
  { id: 'SIN-CGK', departure: 'SIN', arrival: 'CGK', durationMinutes: 110 },
  { id: 'SIN-MNL', departure: 'SIN', arrival: 'MNL', durationMinutes: 230 },
  { id: 'SIN-DEL', departure: 'SIN', arrival: 'DEL', durationMinutes: 330 },
  { id: 'SIN-DXB', departure: 'SIN', arrival: 'DXB', durationMinutes: 430 },
  { id: 'SIN-LHR', departure: 'SIN', arrival: 'LHR', durationMinutes: 850 }, // 800 -> 850
  { id: 'SIN-SYD', departure: 'SIN', arrival: 'SYD', durationMinutes: 480 },

  // From Tokyo (NRT)
  { id: 'NRT-SIN', departure: 'NRT', arrival: 'SIN', durationMinutes: 450 }, // 410 -> 450
  { id: 'NRT-ICN', departure: 'NRT', arrival: 'ICN', durationMinutes: 150 },
  { id: 'NRT-HKG', departure: 'NRT', arrival: 'HKG', durationMinutes: 280 },
  { id: 'NRT-PVG', departure: 'NRT', arrival: 'PVG', durationMinutes: 210 },
  { id: 'NRT-LAX', departure: 'NRT', arrival: 'LAX', durationMinutes: 600 },
  { id: 'NRT-SFO', departure: 'NRT', arrival: 'SFO', durationMinutes: 570 },
  { id: 'NRT-JFK', departure: 'NRT', arrival: 'JFK', durationMinutes: 800 },
  { id: 'NRT-LHR', departure: 'NRT', arrival: 'LHR', durationMinutes: 720 },
  { id: 'NRT-SYD', departure: 'NRT', arrival: 'SYD', durationMinutes: 590 },

  // From Seoul (ICN)
  { id: 'ICN-SIN', departure: 'ICN', arrival: 'SIN', durationMinutes: 390 }, // 380 -> 390
  { id: 'ICN-NRT', departure: 'ICN', arrival: 'NRT', durationMinutes: 150 },
  { id: 'ICN-HKG', departure: 'ICN', arrival: 'HKG', durationMinutes: 220 },
  { id: 'ICN-LAX', departure: 'ICN', arrival: 'LAX', durationMinutes: 660 },
  { id: 'ICN-JFK', departure: 'ICN', arrival: 'JFK', durationMinutes: 810 },
  { id: 'ICN-LHR', departure: 'ICN', arrival: 'LHR', durationMinutes: 680 },

  // From Hong Kong
  { id: 'HKG-SIN', departure: 'HKG', arrival: 'SIN', durationMinutes: 230 },
  { id: 'HKG-NRT', departure: 'HKG', arrival: 'NRT', durationMinutes: 280 },
  { id: 'HKG-ICN', departure: 'HKG', arrival: 'ICN', durationMinutes: 220 },
  { id: 'HKG-BKK', departure: 'HKG', arrival: 'BKK', durationMinutes: 170 },
  { id: 'HKG-SYD', departure: 'HKG', arrival: 'SYD', durationMinutes: 550 },
  { id: 'HKG-LAX', departure: 'HKG', arrival: 'LAX', durationMinutes: 780 },

  // From London (LHR)
  { id: 'LHR-SIN', departure: 'LHR', arrival: 'SIN', durationMinutes: 800 },
  { id: 'LHR-NRT', departure: 'LHR', arrival: 'NRT', durationMinutes: 720 },
  { id: 'LHR-JFK', departure: 'LHR', arrival: 'JFK', durationMinutes: 460 },
  { id: 'LHR-LAX', departure: 'LHR', arrival: 'LAX', durationMinutes: 660 },
  { id: 'LHR-DXB', departure: 'LHR', arrival: 'DXB', durationMinutes: 420 },
  { id: 'LHR-CDG', departure: 'LHR', arrival: 'CDG', durationMinutes: 80 },
  { id: 'LHR-FRA', departure: 'LHR', arrival: 'FRA', durationMinutes: 90 },
  { id: 'LHR-AMS', departure: 'LHR', arrival: 'AMS', durationMinutes: 70 },

  // From Paris (CDG)
  { id: 'CDG-LHR', departure: 'CDG', arrival: 'LHR', durationMinutes: 80 },
  { id: 'CDG-SIN', departure: 'CDG', arrival: 'SIN', durationMinutes: 770 },
  { id: 'CDG-JFK', departure: 'CDG', arrival: 'JFK', durationMinutes: 490 },
  { id: 'CDG-DXB', departure: 'CDG', arrival: 'DXB', durationMinutes: 410 },

  // From New York (JFK)
  { id: 'JFK-LHR', departure: 'JFK', arrival: 'LHR', durationMinutes: 430 },
  { id: 'JFK-CDG', departure: 'JFK', arrival: 'CDG', durationMinutes: 460 },
  { id: 'JFK-LAX', departure: 'JFK', arrival: 'LAX', durationMinutes: 360 },
  { id: 'JFK-SFO', departure: 'JFK', arrival: 'SFO', durationMinutes: 380 },
  { id: 'JFK-NRT', departure: 'JFK', arrival: 'NRT', durationMinutes: 820 },
  { id: 'JFK-ICN', departure: 'JFK', arrival: 'ICN', durationMinutes: 830 },

  // From Los Angeles (LAX)
  { id: 'LAX-JFK', departure: 'LAX', arrival: 'JFK', durationMinutes: 330 },
  { id: 'LAX-SFO', departure: 'LAX', arrival: 'SFO', durationMinutes: 80 },
  { id: 'LAX-NRT', departure: 'LAX', arrival: 'NRT', durationMinutes: 650 },
  { id: 'LAX-HKG', departure: 'LAX', arrival: 'HKG', durationMinutes: 840 },
  { id: 'LAX-SYD', departure: 'LAX', arrival: 'SYD', durationMinutes: 910 }, // 830 -> 910

  // From Sydney (SYD)
  { id: 'SYD-SIN', departure: 'SYD', arrival: 'SIN', durationMinutes: 480 },
  { id: 'SYD-NRT', departure: 'SYD', arrival: 'NRT', durationMinutes: 590 },
  { id: 'SYD-HKG', departure: 'SYD', arrival: 'HKG', durationMinutes: 550 },
  { id: 'SYD-LAX', departure: 'SYD', arrival: 'LAX', durationMinutes: 830 }, // 780 -> 830
  { id: 'SYD-AKL', departure: 'SYD', arrival: 'AKL', durationMinutes: 190 },

  // From Dubai (DXB)
  { id: 'DXB-LHR', departure: 'DXB', arrival: 'LHR', durationMinutes: 430 },
  { id: 'DXB-SIN', departure: 'DXB', arrival: 'SIN', durationMinutes: 420 },
  { id: 'DXB-BOM', departure: 'DXB', arrival: 'BOM', durationMinutes: 200 },
  { id: 'DXB-DEL', departure: 'DXB', arrival: 'DEL', durationMinutes: 210 },

  // Additional Asian routes
  { id: 'BKK-SIN', departure: 'BKK', arrival: 'SIN', durationMinutes: 150 },
  { id: 'BKK-HKG', departure: 'BKK', arrival: 'HKG', durationMinutes: 170 },
  { id: 'KUL-SIN', departure: 'KUL', arrival: 'SIN', durationMinutes: 70 },
  { id: 'DEL-DXB', departure: 'DEL', arrival: 'DXB', durationMinutes: 220 },
  { id: 'DEL-SIN', departure: 'DEL', arrival: 'SIN', durationMinutes: 320 },
];