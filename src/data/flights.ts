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
  // TEST ROUTE - 1 minute for quick testing
  { id: 'TEST-SIN-HKG', departure: 'LHR', arrival: 'SYD', durationMinutes: 0.5 },

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
  { id: 'BKK-NRT', departure: 'BKK', arrival: 'NRT', durationMinutes: 380 },
  { id: 'BKK-ICN', departure: 'BKK', arrival: 'ICN', durationMinutes: 340 },
  { id: 'BKK-KUL', departure: 'BKK', arrival: 'KUL', durationMinutes: 120 },
  { id: 'BKK-DXB', departure: 'BKK', arrival: 'DXB', durationMinutes: 390 },

  { id: 'KUL-SIN', departure: 'KUL', arrival: 'SIN', durationMinutes: 70 },
  { id: 'KUL-BKK', departure: 'KUL', arrival: 'BKK', durationMinutes: 120 },
  { id: 'KUL-HKG', departure: 'KUL', arrival: 'HKG', durationMinutes: 240 },
  { id: 'KUL-CGK', departure: 'KUL', arrival: 'CGK', durationMinutes: 120 },
  { id: 'KUL-NRT', departure: 'KUL', arrival: 'NRT', durationMinutes: 420 },

  { id: 'CGK-SIN', departure: 'CGK', arrival: 'SIN', durationMinutes: 110 },
  { id: 'CGK-KUL', departure: 'CGK', arrival: 'KUL', durationMinutes: 120 },
  { id: 'CGK-HKG', departure: 'CGK', arrival: 'HKG', durationMinutes: 270 },
  { id: 'CGK-BKK', departure: 'CGK', arrival: 'BKK', durationMinutes: 180 },
  { id: 'CGK-SYD', departure: 'CGK', arrival: 'SYD', durationMinutes: 420 },

  { id: 'MNL-SIN', departure: 'MNL', arrival: 'SIN', durationMinutes: 230 },
  { id: 'MNL-HKG', departure: 'MNL', arrival: 'HKG', durationMinutes: 130 },
  { id: 'MNL-NRT', departure: 'MNL', arrival: 'NRT', durationMinutes: 270 },
  { id: 'MNL-ICN', departure: 'MNL', arrival: 'ICN', durationMinutes: 240 },
  { id: 'MNL-BKK', departure: 'MNL', arrival: 'BKK', durationMinutes: 210 },

  { id: 'DEL-DXB', departure: 'DEL', arrival: 'DXB', durationMinutes: 220 },
  { id: 'DEL-SIN', departure: 'DEL', arrival: 'SIN', durationMinutes: 320 },
  { id: 'DEL-BKK', departure: 'DEL', arrival: 'BKK', durationMinutes: 240 },
  { id: 'DEL-HKG', departure: 'DEL', arrival: 'HKG', durationMinutes: 330 },
  { id: 'DEL-LHR', departure: 'DEL', arrival: 'LHR', durationMinutes: 520 },
  { id: 'DEL-BOM', departure: 'DEL', arrival: 'BOM', durationMinutes: 130 },

  { id: 'BOM-DXB', departure: 'BOM', arrival: 'DXB', durationMinutes: 190 },
  { id: 'BOM-SIN', departure: 'BOM', arrival: 'SIN', durationMinutes: 340 },
  { id: 'BOM-LHR', departure: 'BOM', arrival: 'LHR', durationMinutes: 540 },
  { id: 'BOM-DEL', departure: 'BOM', arrival: 'DEL', durationMinutes: 130 },
  { id: 'BOM-HKG', departure: 'BOM', arrival: 'HKG', durationMinutes: 360 },

  // Shanghai (PVG) routes
  { id: 'PVG-SIN', departure: 'PVG', arrival: 'SIN', durationMinutes: 310 },
  { id: 'PVG-NRT', departure: 'PVG', arrival: 'NRT', durationMinutes: 210 },
  { id: 'PVG-ICN', departure: 'PVG', arrival: 'ICN', durationMinutes: 120 },
  { id: 'PVG-HKG', departure: 'PVG', arrival: 'HKG', durationMinutes: 170 },
  { id: 'PVG-BKK', departure: 'PVG', arrival: 'BKK', durationMinutes: 270 },
  { id: 'PVG-LAX', departure: 'PVG', arrival: 'LAX', durationMinutes: 720 },
  { id: 'PVG-SFO', departure: 'PVG', arrival: 'SFO', durationMinutes: 700 },
  { id: 'PVG-PEK', departure: 'PVG', arrival: 'PEK', durationMinutes: 130 },

  // Beijing (PEK) routes
  { id: 'PEK-SIN', departure: 'PEK', arrival: 'SIN', durationMinutes: 370 },
  { id: 'PEK-NRT', departure: 'PEK', arrival: 'NRT', durationMinutes: 230 },
  { id: 'PEK-ICN', departure: 'PEK', arrival: 'ICN', durationMinutes: 130 },
  { id: 'PEK-HKG', departure: 'PEK', arrival: 'HKG', durationMinutes: 210 },
  { id: 'PEK-PVG', departure: 'PEK', arrival: 'PVG', durationMinutes: 130 },
  { id: 'PEK-LAX', departure: 'PEK', arrival: 'LAX', durationMinutes: 720 },
  { id: 'PEK-LHR', departure: 'PEK', arrival: 'LHR', durationMinutes: 600 },

  // Tokyo Haneda (HND) routes
  { id: 'HND-SIN', departure: 'HND', arrival: 'SIN', durationMinutes: 450 },
  { id: 'HND-ICN', departure: 'HND', arrival: 'ICN', durationMinutes: 150 },
  { id: 'HND-HKG', departure: 'HND', arrival: 'HKG', durationMinutes: 280 },
  { id: 'HND-PVG', departure: 'HND', arrival: 'PVG', durationMinutes: 210 },
  { id: 'HND-BKK', departure: 'HND', arrival: 'BKK', durationMinutes: 390 },
  { id: 'HND-LAX', departure: 'HND', arrival: 'LAX', durationMinutes: 600 },
  { id: 'HND-SFO', departure: 'HND', arrival: 'SFO', durationMinutes: 570 },

  // European routes
  { id: 'FRA-LHR', departure: 'FRA', arrival: 'LHR', durationMinutes: 90 },
  { id: 'FRA-CDG', departure: 'FRA', arrival: 'CDG', durationMinutes: 80 },
  { id: 'FRA-AMS', departure: 'FRA', arrival: 'AMS', durationMinutes: 70 },
  { id: 'FRA-MAD', departure: 'FRA', arrival: 'MAD', durationMinutes: 160 },
  { id: 'FRA-FCO', departure: 'FRA', arrival: 'FCO', durationMinutes: 100 },
  { id: 'FRA-ZRH', departure: 'FRA', arrival: 'ZRH', durationMinutes: 60 },
  { id: 'FRA-JFK', departure: 'FRA', arrival: 'JFK', durationMinutes: 510 },
  { id: 'FRA-DXB', departure: 'FRA', arrival: 'DXB', durationMinutes: 370 },
  { id: 'FRA-SIN', departure: 'FRA', arrival: 'SIN', durationMinutes: 750 },

  { id: 'AMS-LHR', departure: 'AMS', arrival: 'LHR', durationMinutes: 70 },
  { id: 'AMS-CDG', departure: 'AMS', arrival: 'CDG', durationMinutes: 70 },
  { id: 'AMS-FRA', departure: 'AMS', arrival: 'FRA', durationMinutes: 70 },
  { id: 'AMS-JFK', departure: 'AMS', arrival: 'JFK', durationMinutes: 490 },
  { id: 'AMS-DXB', departure: 'AMS', arrival: 'DXB', durationMinutes: 390 },

  { id: 'MAD-LHR', departure: 'MAD', arrival: 'LHR', durationMinutes: 150 },
  { id: 'MAD-CDG', departure: 'MAD', arrival: 'CDG', durationMinutes: 130 },
  { id: 'MAD-FRA', departure: 'MAD', arrival: 'FRA', durationMinutes: 160 },
  { id: 'MAD-FCO', departure: 'MAD', arrival: 'FCO', durationMinutes: 170 },
  { id: 'MAD-JFK', departure: 'MAD', arrival: 'JFK', durationMinutes: 510 },

  { id: 'FCO-LHR', departure: 'FCO', arrival: 'LHR', durationMinutes: 170 },
  { id: 'FCO-CDG', departure: 'FCO', arrival: 'CDG', durationMinutes: 130 },
  { id: 'FCO-FRA', departure: 'FCO', arrival: 'FRA', durationMinutes: 100 },
  { id: 'FCO-MAD', departure: 'FCO', arrival: 'MAD', durationMinutes: 170 },
  { id: 'FCO-IST', departure: 'FCO', arrival: 'IST', durationMinutes: 150 },

  { id: 'ZRH-LHR', departure: 'ZRH', arrival: 'LHR', durationMinutes: 100 },
  { id: 'ZRH-CDG', departure: 'ZRH', arrival: 'CDG', durationMinutes: 80 },
  { id: 'ZRH-FRA', departure: 'ZRH', arrival: 'FRA', durationMinutes: 60 },
  { id: 'ZRH-JFK', departure: 'ZRH', arrival: 'JFK', durationMinutes: 520 },

  { id: 'IST-LHR', departure: 'IST', arrival: 'LHR', durationMinutes: 240 },
  { id: 'IST-CDG', departure: 'IST', arrival: 'CDG', durationMinutes: 220 },
  { id: 'IST-FRA', departure: 'IST', arrival: 'FRA', durationMinutes: 200 },
  { id: 'IST-DXB', departure: 'IST', arrival: 'DXB', durationMinutes: 270 },
  { id: 'IST-FCO', departure: 'IST', arrival: 'FCO', durationMinutes: 150 },

  // North American routes
  { id: 'ORD-JFK', departure: 'ORD', arrival: 'JFK', durationMinutes: 140 },
  { id: 'ORD-LAX', departure: 'ORD', arrival: 'LAX', durationMinutes: 260 },
  { id: 'ORD-SFO', departure: 'ORD', arrival: 'SFO', durationMinutes: 270 },
  { id: 'ORD-LHR', departure: 'ORD', arrival: 'LHR', durationMinutes: 470 },
  { id: 'ORD-NRT', departure: 'ORD', arrival: 'NRT', durationMinutes: 780 },

  { id: 'SFO-JFK', departure: 'SFO', arrival: 'JFK', durationMinutes: 350 },
  { id: 'SFO-LAX', departure: 'SFO', arrival: 'LAX', durationMinutes: 80 },
  { id: 'SFO-ORD', departure: 'SFO', arrival: 'ORD', durationMinutes: 260 },
  { id: 'SFO-NRT', departure: 'SFO', arrival: 'NRT', durationMinutes: 590 },
  { id: 'SFO-HKG', departure: 'SFO', arrival: 'HKG', durationMinutes: 780 },
  { id: 'SFO-SYD', departure: 'SFO', arrival: 'SYD', durationMinutes: 870 },

  { id: 'YYZ-JFK', departure: 'YYZ', arrival: 'JFK', durationMinutes: 90 },
  { id: 'YYZ-LAX', departure: 'YYZ', arrival: 'LAX', durationMinutes: 290 },
  { id: 'YYZ-ORD', departure: 'YYZ', arrival: 'ORD', durationMinutes: 100 },
  { id: 'YYZ-LHR', departure: 'YYZ', arrival: 'LHR', durationMinutes: 440 },
  { id: 'YYZ-YVR', departure: 'YYZ', arrival: 'YVR', durationMinutes: 280 },

  { id: 'YVR-LAX', departure: 'YVR', arrival: 'LAX', durationMinutes: 170 },
  { id: 'YVR-SFO', departure: 'YVR', arrival: 'SFO', durationMinutes: 150 },
  { id: 'YVR-YYZ', departure: 'YVR', arrival: 'YYZ', durationMinutes: 270 },
  { id: 'YVR-NRT', departure: 'YVR', arrival: 'NRT', durationMinutes: 550 },
  { id: 'YVR-ICN', departure: 'YVR', arrival: 'ICN', durationMinutes: 620 },

  { id: 'MEX-JFK', departure: 'MEX', arrival: 'JFK', durationMinutes: 280 },
  { id: 'MEX-LAX', departure: 'MEX', arrival: 'LAX', durationMinutes: 210 },
  { id: 'MEX-ORD', departure: 'MEX', arrival: 'ORD', durationMinutes: 220 },
  { id: 'MEX-MAD', departure: 'MEX', arrival: 'MAD', durationMinutes: 660 },

  // Oceania routes
  { id: 'MEL-SYD', departure: 'MEL', arrival: 'SYD', durationMinutes: 90 },
  { id: 'MEL-AKL', departure: 'MEL', arrival: 'AKL', durationMinutes: 240 },
  { id: 'MEL-SIN', departure: 'MEL', arrival: 'SIN', durationMinutes: 470 },
  { id: 'MEL-HKG', departure: 'MEL', arrival: 'HKG', durationMinutes: 560 },
  { id: 'MEL-LAX', departure: 'MEL', arrival: 'LAX', durationMinutes: 860 },

  { id: 'AKL-SYD', departure: 'AKL', arrival: 'SYD', durationMinutes: 190 },
  { id: 'AKL-MEL', departure: 'AKL', arrival: 'MEL', durationMinutes: 240 },
  { id: 'AKL-SIN', departure: 'AKL', arrival: 'SIN', durationMinutes: 630 },
  { id: 'AKL-LAX', departure: 'AKL', arrival: 'LAX', durationMinutes: 780 },

  // South American routes
  { id: 'GRU-GIG', departure: 'GRU', arrival: 'GIG', durationMinutes: 70 },
  { id: 'GRU-EZE', departure: 'GRU', arrival: 'EZE', durationMinutes: 190 },
  { id: 'GRU-JFK', departure: 'GRU', arrival: 'JFK', durationMinutes: 600 },
  { id: 'GRU-LHR', departure: 'GRU', arrival: 'LHR', durationMinutes: 670 },
  { id: 'GRU-CDG', departure: 'GRU', arrival: 'CDG', durationMinutes: 680 },

  { id: 'GIG-GRU', departure: 'GIG', arrival: 'GRU', durationMinutes: 70 },
  { id: 'GIG-EZE', departure: 'GIG', arrival: 'EZE', durationMinutes: 210 },
  { id: 'GIG-JFK', departure: 'GIG', arrival: 'JFK', durationMinutes: 620 },
  { id: 'GIG-LHR', departure: 'GIG', arrival: 'LHR', durationMinutes: 680 },

  { id: 'EZE-GRU', departure: 'EZE', arrival: 'GRU', durationMinutes: 190 },
  { id: 'EZE-GIG', departure: 'EZE', arrival: 'GIG', durationMinutes: 210 },
  { id: 'EZE-MAD', departure: 'EZE', arrival: 'MAD', durationMinutes: 770 },
  { id: 'EZE-JFK', departure: 'EZE', arrival: 'JFK', durationMinutes: 660 },

  // African routes
  { id: 'CAI-DXB', departure: 'CAI', arrival: 'DXB', durationMinutes: 210 },
  { id: 'CAI-LHR', departure: 'CAI', arrival: 'LHR', durationMinutes: 290 },
  { id: 'CAI-CDG', departure: 'CAI', arrival: 'CDG', durationMinutes: 280 },
  { id: 'CAI-IST', departure: 'CAI', arrival: 'IST', durationMinutes: 130 },
  { id: 'CAI-JNB', departure: 'CAI', arrival: 'JNB', durationMinutes: 500 },

  { id: 'JNB-CPT', departure: 'JNB', arrival: 'CPT', durationMinutes: 130 },
  { id: 'JNB-CAI', departure: 'JNB', arrival: 'CAI', durationMinutes: 500 },
  { id: 'JNB-DXB', departure: 'JNB', arrival: 'DXB', durationMinutes: 490 },
  { id: 'JNB-LHR', departure: 'JNB', arrival: 'LHR', durationMinutes: 670 },
  { id: 'JNB-SIN', departure: 'JNB', arrival: 'SIN', durationMinutes: 640 },

  { id: 'CPT-JNB', departure: 'CPT', arrival: 'JNB', durationMinutes: 130 },
  { id: 'CPT-LHR', departure: 'CPT', arrival: 'LHR', durationMinutes: 680 },
  { id: 'CPT-DXB', departure: 'CPT', arrival: 'DXB', durationMinutes: 510 },

  // Additional missing routes to complete coverage
  // HND connections
  { id: 'HND-NRT', departure: 'HND', arrival: 'NRT', durationMinutes: 30 },
  { id: 'NRT-HND', departure: 'NRT', arrival: 'HND', durationMinutes: 30 },

  // More Asian interconnections
  { id: 'PVG-BOM', departure: 'PVG', arrival: 'BOM', durationMinutes: 400 },
  { id: 'PVG-DEL', departure: 'PVG', arrival: 'DEL', durationMinutes: 390 },
  { id: 'PVG-KUL', departure: 'PVG', arrival: 'KUL', durationMinutes: 320 },
  { id: 'PVG-MNL', departure: 'PVG', arrival: 'MNL', durationMinutes: 240 },
  { id: 'PVG-CGK', departure: 'PVG', arrival: 'CGK', durationMinutes: 330 },
  { id: 'PVG-DXB', departure: 'PVG', arrival: 'DXB', durationMinutes: 530 },

  { id: 'PEK-BKK', departure: 'PEK', arrival: 'BKK', durationMinutes: 310 },
  { id: 'PEK-BOM', departure: 'PEK', arrival: 'BOM', durationMinutes: 410 },
  { id: 'PEK-DEL', departure: 'PEK', arrival: 'DEL', durationMinutes: 380 },
  { id: 'PEK-KUL', departure: 'PEK', arrival: 'KUL', durationMinutes: 360 },
  { id: 'PEK-MNL', departure: 'PEK', arrival: 'MNL', durationMinutes: 260 },
  { id: 'PEK-DXB', departure: 'PEK', arrival: 'DXB', durationMinutes: 500 },
  { id: 'PEK-SYD', departure: 'PEK', arrival: 'SYD', durationMinutes: 680 },

  { id: 'HKG-PVG', departure: 'HKG', arrival: 'PVG', durationMinutes: 170 },
  { id: 'HKG-PEK', departure: 'HKG', arrival: 'PEK', durationMinutes: 210 },
  { id: 'HKG-KUL', departure: 'HKG', arrival: 'KUL', durationMinutes: 240 },
  { id: 'HKG-MNL', departure: 'HKG', arrival: 'MNL', durationMinutes: 130 },
  { id: 'HKG-CGK', departure: 'HKG', arrival: 'CGK', durationMinutes: 270 },
  { id: 'HKG-DEL', departure: 'HKG', arrival: 'DEL', durationMinutes: 340 },
  { id: 'HKG-BOM', departure: 'HKG', arrival: 'BOM', durationMinutes: 360 },
  { id: 'HKG-DXB', departure: 'HKG', arrival: 'DXB', durationMinutes: 480 },
  { id: 'HKG-LHR', departure: 'HKG', arrival: 'LHR', durationMinutes: 780 },
  { id: 'HKG-JFK', departure: 'HKG', arrival: 'JFK', durationMinutes: 900 },
  { id: 'HKG-SFO', departure: 'HKG', arrival: 'SFO', durationMinutes: 780 },

  // NRT to other Asian cities
  { id: 'NRT-BKK', departure: 'NRT', arrival: 'BKK', durationMinutes: 380 },
  { id: 'NRT-KUL', departure: 'NRT', arrival: 'KUL', durationMinutes: 420 },
  { id: 'NRT-MNL', departure: 'NRT', arrival: 'MNL', durationMinutes: 270 },
  { id: 'NRT-CGK', departure: 'NRT', arrival: 'CGK', durationMinutes: 450 },
  { id: 'NRT-DEL', departure: 'NRT', arrival: 'DEL', durationMinutes: 600 },
  { id: 'NRT-DXB', departure: 'NRT', arrival: 'DXB', durationMinutes: 680 },
  { id: 'NRT-PEK', departure: 'NRT', arrival: 'PEK', durationMinutes: 230 },
  { id: 'NRT-BOM', departure: 'NRT', arrival: 'BOM', durationMinutes: 620 },

  // ICN to other cities
  { id: 'ICN-PVG', departure: 'ICN', arrival: 'PVG', durationMinutes: 120 },
  { id: 'ICN-PEK', departure: 'ICN', arrival: 'PEK', durationMinutes: 130 },
  { id: 'ICN-BKK', departure: 'ICN', arrival: 'BKK', durationMinutes: 340 },
  { id: 'ICN-KUL', departure: 'ICN', arrival: 'KUL', durationMinutes: 380 },
  { id: 'ICN-MNL', departure: 'ICN', arrival: 'MNL', durationMinutes: 240 },
  { id: 'ICN-CGK', departure: 'ICN', arrival: 'CGK', durationMinutes: 410 },
  { id: 'ICN-DEL', departure: 'ICN', arrival: 'DEL', durationMinutes: 480 },
  { id: 'ICN-DXB', departure: 'ICN', arrival: 'DXB', durationMinutes: 600 },
  { id: 'ICN-SYD', departure: 'ICN', arrival: 'SYD', durationMinutes: 630 },
  { id: 'ICN-SFO', departure: 'ICN', arrival: 'SFO', durationMinutes: 660 },
  { id: 'ICN-HND', departure: 'ICN', arrival: 'HND', durationMinutes: 150 },
  { id: 'ICN-BOM', departure: 'ICN', arrival: 'BOM', durationMinutes: 510 },

  // BKK reverse routes
  { id: 'BKK-NRT', departure: 'BKK', arrival: 'NRT', durationMinutes: 380 },
  { id: 'BKK-PVG', departure: 'BKK', arrival: 'PVG', durationMinutes: 270 },
  { id: 'BKK-PEK', departure: 'BKK', arrival: 'PEK', durationMinutes: 310 },
  { id: 'BKK-MNL', departure: 'BKK', arrival: 'MNL', durationMinutes: 210 },
  { id: 'BKK-CGK', departure: 'BKK', arrival: 'CGK', durationMinutes: 180 },
  { id: 'BKK-DEL', departure: 'BKK', arrival: 'DEL', durationMinutes: 240 },

  // More European connections
  { id: 'CDG-FRA', departure: 'CDG', arrival: 'FRA', durationMinutes: 80 },
  { id: 'CDG-AMS', departure: 'CDG', arrival: 'AMS', durationMinutes: 70 },
  { id: 'CDG-MAD', departure: 'CDG', arrival: 'MAD', durationMinutes: 130 },
  { id: 'CDG-FCO', departure: 'CDG', arrival: 'FCO', durationMinutes: 130 },
  { id: 'CDG-ZRH', departure: 'CDG', arrival: 'ZRH', durationMinutes: 80 },
  { id: 'CDG-IST', departure: 'CDG', arrival: 'IST', durationMinutes: 220 },
  { id: 'CDG-NRT', departure: 'CDG', arrival: 'NRT', durationMinutes: 740 },
  { id: 'CDG-ICN', departure: 'CDG', arrival: 'ICN', durationMinutes: 700 },
  { id: 'CDG-HKG', departure: 'CDG', arrival: 'HKG', durationMinutes: 730 },
  { id: 'CDG-LAX', departure: 'CDG', arrival: 'LAX', durationMinutes: 670 },
  { id: 'CDG-SFO', departure: 'CDG', arrival: 'SFO', durationMinutes: 660 },

  // FRA connections
  { id: 'FRA-IST', departure: 'FRA', arrival: 'IST', durationMinutes: 200 },
  { id: 'FRA-NRT', departure: 'FRA', arrival: 'NRT', durationMinutes: 730 },
  { id: 'FRA-ICN', departure: 'FRA', arrival: 'ICN', durationMinutes: 690 },
  { id: 'FRA-PEK', departure: 'FRA', arrival: 'PEK', durationMinutes: 610 },
  { id: 'FRA-HKG', departure: 'FRA', arrival: 'HKG', durationMinutes: 720 },
  { id: 'FRA-LAX', departure: 'FRA', arrival: 'LAX', durationMinutes: 680 },
  { id: 'FRA-SFO', departure: 'FRA', arrival: 'SFO', durationMinutes: 670 },
  { id: 'FRA-ORD', departure: 'FRA', arrival: 'ORD', durationMinutes: 540 },

  // AMS connections
  { id: 'AMS-IST', departure: 'AMS', arrival: 'IST', durationMinutes: 210 },
  { id: 'AMS-MAD', departure: 'AMS', arrival: 'MAD', durationMinutes: 160 },
  { id: 'AMS-FCO', departure: 'AMS', arrival: 'FCO', durationMinutes: 130 },
  { id: 'AMS-ZRH', departure: 'AMS', arrival: 'ZRH', durationMinutes: 90 },
  { id: 'AMS-SIN', departure: 'AMS', arrival: 'SIN', durationMinutes: 780 },
  { id: 'AMS-NRT', departure: 'AMS', arrival: 'NRT', durationMinutes: 720 },

  // IST reverse routes
  { id: 'IST-CAI', departure: 'IST', arrival: 'CAI', durationMinutes: 130 },
  { id: 'IST-AMS', departure: 'IST', arrival: 'AMS', durationMinutes: 210 },
  { id: 'IST-ZRH', departure: 'IST', arrival: 'ZRH', durationMinutes: 190 },
  { id: 'IST-MAD', departure: 'IST', arrival: 'MAD', durationMinutes: 250 },
  { id: 'IST-SIN', departure: 'IST', arrival: 'SIN', durationMinutes: 660 },
  { id: 'IST-BOM', departure: 'IST', arrival: 'BOM', durationMinutes: 380 },
  { id: 'IST-DEL', departure: 'IST', arrival: 'DEL', durationMinutes: 360 },

  // MAD reverse routes
  { id: 'MAD-IST', departure: 'MAD', arrival: 'IST', durationMinutes: 250 },
  { id: 'MAD-AMS', departure: 'MAD', arrival: 'AMS', durationMinutes: 160 },
  { id: 'MAD-ZRH', departure: 'MAD', arrival: 'ZRH', durationMinutes: 150 },
  { id: 'MAD-MEX', departure: 'MAD', arrival: 'MEX', durationMinutes: 670 },
  { id: 'MAD-GRU', departure: 'MAD', arrival: 'GRU', durationMinutes: 660 },
  { id: 'MAD-EZE', departure: 'MAD', arrival: 'EZE', durationMinutes: 770 },
  { id: 'MAD-DXB', departure: 'MAD', arrival: 'DXB', durationMinutes: 410 },

  // FCO reverse routes
  { id: 'FCO-AMS', departure: 'FCO', arrival: 'AMS', durationMinutes: 130 },
  { id: 'FCO-ZRH', departure: 'FCO', arrival: 'ZRH', durationMinutes: 90 },
  { id: 'FCO-DXB', departure: 'FCO', arrival: 'DXB', durationMinutes: 330 },

  // ZRH reverse routes
  { id: 'ZRH-IST', departure: 'ZRH', arrival: 'IST', durationMinutes: 190 },
  { id: 'ZRH-AMS', departure: 'ZRH', arrival: 'AMS', durationMinutes: 90 },
  { id: 'ZRH-MAD', departure: 'ZRH', arrival: 'MAD', durationMinutes: 150 },
  { id: 'ZRH-FCO', departure: 'ZRH', arrival: 'FCO', durationMinutes: 90 },
  { id: 'ZRH-DXB', departure: 'ZRH', arrival: 'DXB', durationMinutes: 380 },

  // North American connections
  { id: 'JFK-ORD', departure: 'JFK', arrival: 'ORD', durationMinutes: 150 },
  { id: 'JFK-YYZ', departure: 'JFK', arrival: 'YYZ', durationMinutes: 90 },
  { id: 'JFK-FRA', departure: 'JFK', arrival: 'FRA', durationMinutes: 490 },
  { id: 'JFK-AMS', departure: 'JFK', arrival: 'AMS', durationMinutes: 470 },
  { id: 'JFK-MAD', departure: 'JFK', arrival: 'MAD', durationMinutes: 490 },
  { id: 'JFK-MEX', departure: 'JFK', arrival: 'MEX', durationMinutes: 290 },
  { id: 'JFK-GRU', departure: 'JFK', arrival: 'GRU', durationMinutes: 600 },
  { id: 'JFK-GIG', departure: 'JFK', arrival: 'GIG', durationMinutes: 620 },
  { id: 'JFK-EZE', departure: 'JFK', arrival: 'EZE', durationMinutes: 660 },
  { id: 'JFK-HKG', departure: 'JFK', arrival: 'HKG', durationMinutes: 930 },
  { id: 'JFK-SIN', departure: 'JFK', arrival: 'SIN', durationMinutes: 1080 },
  { id: 'JFK-ZRH', departure: 'JFK', arrival: 'ZRH', durationMinutes: 500 },
  { id: 'JFK-DXB', departure: 'JFK', arrival: 'DXB', durationMinutes: 780 },

  { id: 'LAX-ORD', departure: 'LAX', arrival: 'ORD', durationMinutes: 250 },
  { id: 'LAX-YYZ', departure: 'LAX', arrival: 'YYZ', durationMinutes: 280 },
  { id: 'LAX-YVR', departure: 'LAX', arrival: 'YVR', durationMinutes: 170 },
  { id: 'LAX-MEX', departure: 'LAX', arrival: 'MEX', durationMinutes: 200 },
  { id: 'LAX-LHR', departure: 'LAX', arrival: 'LHR', durationMinutes: 640 },
  { id: 'LAX-CDG', departure: 'LAX', arrival: 'CDG', durationMinutes: 650 },
  { id: 'LAX-FRA', departure: 'LAX', arrival: 'FRA', durationMinutes: 660 },
  { id: 'LAX-ICN', departure: 'LAX', arrival: 'ICN', durationMinutes: 680 },
  { id: 'LAX-PVG', departure: 'LAX', arrival: 'PVG', durationMinutes: 740 },
  { id: 'LAX-PEK', departure: 'LAX', arrival: 'PEK', durationMinutes: 740 },
  { id: 'LAX-SIN', departure: 'LAX', arrival: 'SIN', durationMinutes: 1020 },
  { id: 'LAX-MEL', departure: 'LAX', arrival: 'MEL', durationMinutes: 880 },
  { id: 'LAX-AKL', departure: 'LAX', arrival: 'AKL', durationMinutes: 760 },
  { id: 'LAX-GRU', departure: 'LAX', arrival: 'GRU', durationMinutes: 670 },

  { id: 'SFO-ORD', departure: 'SFO', arrival: 'ORD', durationMinutes: 250 },
  { id: 'SFO-YVR', departure: 'SFO', arrival: 'YVR', durationMinutes: 140 },
  { id: 'SFO-LHR', departure: 'SFO', arrival: 'LHR', durationMinutes: 630 },
  { id: 'SFO-CDG', departure: 'SFO', arrival: 'CDG', durationMinutes: 640 },
  { id: 'SFO-FRA', departure: 'SFO', arrival: 'FRA', durationMinutes: 650 },
  { id: 'SFO-ICN', departure: 'SFO', arrival: 'ICN', durationMinutes: 680 },
  { id: 'SFO-PVG', departure: 'SFO', arrival: 'PVG', durationMinutes: 720 },
  { id: 'SFO-SIN', departure: 'SFO', arrival: 'SIN', durationMinutes: 1000 },
  { id: 'SFO-BKK', departure: 'SFO', arrival: 'BKK', durationMinutes: 960 },
  { id: 'SFO-MEL', departure: 'SFO', arrival: 'MEL', durationMinutes: 890 },
  { id: 'SFO-AKL', departure: 'SFO', arrival: 'AKL', durationMinutes: 780 },

  { id: 'ORD-YYZ', departure: 'ORD', arrival: 'YYZ', durationMinutes: 90 },
  { id: 'ORD-MEX', departure: 'ORD', arrival: 'MEX', durationMinutes: 230 },
  { id: 'ORD-CDG', departure: 'ORD', arrival: 'CDG', durationMinutes: 500 },
  { id: 'ORD-FRA', departure: 'ORD', arrival: 'FRA', durationMinutes: 520 },
  { id: 'ORD-ICN', departure: 'ORD', arrival: 'ICN', durationMinutes: 800 },

  { id: 'YYZ-ORD', departure: 'YYZ', arrival: 'ORD', durationMinutes: 100 },
  { id: 'YYZ-SFO', departure: 'YYZ', arrival: 'SFO', durationMinutes: 300 },
  { id: 'YYZ-CDG', departure: 'YYZ', arrival: 'CDG', durationMinutes: 460 },
  { id: 'YYZ-FRA', departure: 'YYZ', arrival: 'FRA', durationMinutes: 470 },
  { id: 'YYZ-MEX', departure: 'YYZ', arrival: 'MEX', durationMinutes: 260 },

  { id: 'YVR-ORD', departure: 'YVR', arrival: 'ORD', durationMinutes: 260 },
  { id: 'YVR-JFK', departure: 'YVR', arrival: 'JFK', durationMinutes: 320 },
  { id: 'YVR-HKG', departure: 'YVR', arrival: 'HKG', durationMinutes: 740 },
  { id: 'YVR-SIN', departure: 'YVR', arrival: 'SIN', durationMinutes: 960 },
  { id: 'YVR-LHR', departure: 'YVR', arrival: 'LHR', durationMinutes: 560 },

  { id: 'MEX-ORD', departure: 'MEX', arrival: 'ORD', durationMinutes: 220 },
  { id: 'MEX-YYZ', departure: 'MEX', arrival: 'YYZ', durationMinutes: 270 },
  { id: 'MEX-SFO', departure: 'MEX', arrival: 'SFO', durationMinutes: 230 },
  { id: 'MEX-CDG', departure: 'MEX', arrival: 'CDG', durationMinutes: 680 },
  { id: 'MEX-GRU', departure: 'MEX', arrival: 'GRU', durationMinutes: 590 },

  // Oceania connections
  { id: 'SYD-MEL', departure: 'SYD', arrival: 'MEL', durationMinutes: 90 },
  { id: 'SYD-PVG', departure: 'SYD', arrival: 'PVG', durationMinutes: 670 },
  { id: 'SYD-PEK', departure: 'SYD', arrival: 'PEK', durationMinutes: 700 },
  { id: 'SYD-BKK', departure: 'SYD', arrival: 'BKK', durationMinutes: 560 },
  { id: 'SYD-KUL', departure: 'SYD', arrival: 'KUL', durationMinutes: 500 },
  { id: 'SYD-CGK', departure: 'SYD', arrival: 'CGK', durationMinutes: 430 },
  { id: 'SYD-MNL', departure: 'SYD', arrival: 'MNL', durationMinutes: 500 },
  { id: 'SYD-ICN', departure: 'SYD', arrival: 'ICN', durationMinutes: 630 },
  { id: 'SYD-SFO', departure: 'SYD', arrival: 'SFO', durationMinutes: 850 },
  { id: 'SYD-YVR', departure: 'SYD', arrival: 'YVR', durationMinutes: 890 },
  { id: 'SYD-JFK', departure: 'SYD', arrival: 'JFK', durationMinutes: 1180 },
  { id: 'SYD-LHR', departure: 'SYD', arrival: 'LHR', durationMinutes: 1220 },

  { id: 'MEL-SIN', departure: 'MEL', arrival: 'SIN', durationMinutes: 470 },
  { id: 'MEL-HKG', departure: 'MEL', arrival: 'HKG', durationMinutes: 560 },
  { id: 'MEL-NRT', departure: 'MEL', arrival: 'NRT', durationMinutes: 630 },
  { id: 'MEL-BKK', departure: 'MEL', arrival: 'BKK', durationMinutes: 550 },
  { id: 'MEL-KUL', departure: 'MEL', arrival: 'KUL', durationMinutes: 490 },
  { id: 'MEL-SFO', departure: 'MEL', arrival: 'SFO', durationMinutes: 870 },

  { id: 'AKL-LAX', departure: 'AKL', arrival: 'LAX', durationMinutes: 780 },
  { id: 'AKL-SFO', departure: 'AKL', arrival: 'SFO', durationMinutes: 760 },
  { id: 'AKL-HKG', departure: 'AKL', arrival: 'HKG', durationMinutes: 690 },
  { id: 'AKL-ICN', departure: 'AKL', arrival: 'ICN', durationMinutes: 690 },
  { id: 'AKL-NRT', departure: 'AKL', arrival: 'NRT', durationMinutes: 660 },

  // South American connections
  { id: 'GRU-CDG', departure: 'GRU', arrival: 'CDG', durationMinutes: 680 },
  { id: 'GRU-MAD', departure: 'GRU', arrival: 'MAD', durationMinutes: 660 },
  { id: 'GRU-LAX', departure: 'GRU', arrival: 'LAX', durationMinutes: 690 },
  { id: 'GRU-MEX', departure: 'GRU', arrival: 'MEX', durationMinutes: 600 },

  { id: 'GIG-CDG', departure: 'GIG', arrival: 'CDG', durationMinutes: 690 },
  { id: 'GIG-MAD', departure: 'GIG', arrival: 'MAD', durationMinutes: 670 },

  { id: 'EZE-LHR', departure: 'EZE', arrival: 'LHR', durationMinutes: 800 },
  { id: 'EZE-CDG', departure: 'EZE', arrival: 'CDG', durationMinutes: 800 },

  // African connections
  { id: 'CAI-FRA', departure: 'CAI', arrival: 'FRA', durationMinutes: 260 },
  { id: 'CAI-AMS', departure: 'CAI', arrival: 'AMS', durationMinutes: 270 },
  { id: 'CAI-JFK', departure: 'CAI', arrival: 'JFK', durationMinutes: 680 },

  { id: 'JNB-IST', departure: 'JNB', arrival: 'IST', durationMinutes: 540 },
  { id: 'JNB-FRA', departure: 'JNB', arrival: 'FRA', durationMinutes: 640 },
  { id: 'JNB-CDG', departure: 'JNB', arrival: 'CDG', durationMinutes: 650 },
  { id: 'JNB-BOM', departure: 'JNB', arrival: 'BOM', durationMinutes: 520 },

  { id: 'CPT-SIN', departure: 'CPT', arrival: 'SIN', durationMinutes: 650 },
  { id: 'CPT-IST', departure: 'CPT', arrival: 'IST', durationMinutes: 560 },

  // DXB reverse routes
  { id: 'DXB-CDG', departure: 'DXB', arrival: 'CDG', durationMinutes: 420 },
  { id: 'DXB-FRA', departure: 'DXB', arrival: 'FRA', durationMinutes: 380 },
  { id: 'DXB-AMS', departure: 'DXB', arrival: 'AMS', durationMinutes: 400 },
  { id: 'DXB-MAD', departure: 'DXB', arrival: 'MAD', durationMinutes: 420 },
  { id: 'DXB-FCO', departure: 'DXB', arrival: 'FCO', durationMinutes: 340 },
  { id: 'DXB-ZRH', departure: 'DXB', arrival: 'ZRH', durationMinutes: 390 },
  { id: 'DXB-IST', departure: 'DXB', arrival: 'IST', durationMinutes: 280 },
  { id: 'DXB-CAI', departure: 'DXB', arrival: 'CAI', durationMinutes: 220 },
  { id: 'DXB-JNB', departure: 'DXB', arrival: 'JNB', durationMinutes: 500 },
  { id: 'DXB-CPT', departure: 'DXB', arrival: 'CPT', durationMinutes: 520 },
  { id: 'DXB-JFK', departure: 'DXB', arrival: 'JFK', durationMinutes: 800 },
  { id: 'DXB-NRT', departure: 'DXB', arrival: 'NRT', durationMinutes: 700 },
  { id: 'DXB-ICN', departure: 'DXB', arrival: 'ICN', durationMinutes: 620 },
  { id: 'DXB-HKG', departure: 'DXB', arrival: 'HKG', durationMinutes: 500 },
  { id: 'DXB-PVG', departure: 'DXB', arrival: 'PVG', durationMinutes: 550 },
  { id: 'DXB-PEK', departure: 'DXB', arrival: 'PEK', durationMinutes: 520 },
  { id: 'DXB-BKK', departure: 'DXB', arrival: 'BKK', durationMinutes: 400 },
  { id: 'DXB-KUL', departure: 'DXB', arrival: 'KUL', durationMinutes: 450 },
  { id: 'DXB-CGK', departure: 'DXB', arrival: 'CGK', durationMinutes: 490 },
  { id: 'DXB-MNL', departure: 'DXB', arrival: 'MNL', durationMinutes: 530 },
  { id: 'DXB-SYD', departure: 'DXB', arrival: 'SYD', durationMinutes: 820 },

  // Additional reverse routes
  { id: 'LHR-ORD', departure: 'LHR', arrival: 'ORD', durationMinutes: 450 },
  { id: 'LHR-YYZ', departure: 'LHR', arrival: 'YYZ', durationMinutes: 440 },
  { id: 'LHR-YVR', departure: 'LHR', arrival: 'YVR', durationMinutes: 580 },
  { id: 'LHR-ICN', departure: 'LHR', arrival: 'ICN', durationMinutes: 660 },
  { id: 'LHR-HKG', departure: 'LHR', arrival: 'HKG', durationMinutes: 760 },
  { id: 'LHR-PVG', departure: 'LHR', arrival: 'PVG', durationMinutes: 690 },
  { id: 'LHR-PEK', departure: 'LHR', arrival: 'PEK', durationMinutes: 580 },
  { id: 'LHR-BKK', departure: 'LHR', arrival: 'BKK', durationMinutes: 700 },
  { id: 'LHR-SYD', departure: 'LHR', arrival: 'SYD', durationMinutes: 1200 },
  { id: 'LHR-DEL', departure: 'LHR', arrival: 'DEL', durationMinutes: 510 },
  { id: 'LHR-BOM', departure: 'LHR', arrival: 'BOM', durationMinutes: 530 },
  { id: 'LHR-GRU', departure: 'LHR', arrival: 'GRU', durationMinutes: 680 },
  { id: 'LHR-GIG', departure: 'LHR', arrival: 'GIG', durationMinutes: 690 },
  { id: 'LHR-EZE', departure: 'LHR', arrival: 'EZE', durationMinutes: 820 },
  { id: 'LHR-CAI', departure: 'LHR', arrival: 'CAI', durationMinutes: 300 },
  { id: 'LHR-JNB', departure: 'LHR', arrival: 'JNB', durationMinutes: 680 },
  { id: 'LHR-CPT', departure: 'LHR', arrival: 'CPT', durationMinutes: 690 },
  { id: 'LHR-IST', departure: 'LHR', arrival: 'IST', durationMinutes: 250 },
  { id: 'LHR-MAD', departure: 'LHR', arrival: 'MAD', durationMinutes: 140 },
  { id: 'LHR-FCO', departure: 'LHR', arrival: 'FCO', durationMinutes: 160 },
  { id: 'LHR-ZRH', departure: 'LHR', arrival: 'ZRH', durationMinutes: 100 },
  { id: 'LHR-SFO', departure: 'LHR', arrival: 'SFO', durationMinutes: 650 },

  // SIN additional connections
  { id: 'SIN-PEK', departure: 'SIN', arrival: 'PEK', durationMinutes: 380 },
  { id: 'SIN-BOM', departure: 'SIN', arrival: 'BOM', durationMinutes: 330 },
  { id: 'SIN-AKL', departure: 'SIN', arrival: 'AKL', durationMinutes: 620 },
  { id: 'SIN-MEL', departure: 'SIN', arrival: 'MEL', durationMinutes: 460 },
  { id: 'SIN-CDG', departure: 'SIN', arrival: 'CDG', durationMinutes: 790 },
  { id: 'SIN-FRA', departure: 'SIN', arrival: 'FRA', durationMinutes: 770 },
  { id: 'SIN-IST', departure: 'SIN', arrival: 'IST', durationMinutes: 680 },
  { id: 'SIN-JNB', departure: 'SIN', arrival: 'JNB', durationMinutes: 650 },
  { id: 'SIN-CPT', departure: 'SIN', arrival: 'CPT', durationMinutes: 660 },
  { id: 'SIN-JFK', departure: 'SIN', arrival: 'JFK', durationMinutes: 1100 },
  { id: 'SIN-LAX', departure: 'SIN', arrival: 'LAX', durationMinutes: 1040 },
  { id: 'SIN-SFO', departure: 'SIN', arrival: 'SFO', durationMinutes: 1020 },
  { id: 'SIN-YVR', departure: 'SIN', arrival: 'YVR', durationMinutes: 980 },
  { id: 'SIN-AMS', departure: 'SIN', arrival: 'AMS', durationMinutes: 800 },
];