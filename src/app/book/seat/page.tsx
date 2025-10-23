'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useBookingStore } from '@/store/bookingStore';
import FocusTypePopover from '@/components/FocusTypePopover';
import { ChevronLeft, Laptop, BookOpen, Coffee, Moon } from 'lucide-react';
import { FocusType } from '@/types';

const SEATS = [
  ['01A', '01C', '01D', '01F'],
  ['02A', '02C', '02D', '02F'],
  ['03A', '03C', '03D', '03F'],
  ['04A', '04C', '04D', '04F'],
  ['05A', '05C', '05D', '05F'],
  ['06A', '06C', '06D', '06F'],
  ['07A', '07C', '07D', '07F'],
  ['08A', '08C', '08D', '08F'],
  ['09A', '09C', '09D', '09F'],
  ['10A', '10C', '10D', '10F'],
];

const FOCUS_ICONS: Record<FocusType, any> = {
  work: Laptop,
  study: BookOpen,
  relax: Coffee,
  sleep: Moon,
};

export default function SeatSelectionPage() {
  const router = useRouter();
  const { selectedFlight, selectedSeat, selectedFocus, setSelectedSeat, setSelectedFocus } =
    useBookingStore();
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [popoverOrigin, setPopoverOrigin] = useState({ x: 0, y: 0 });
  const [tempSelectedSeat, setTempSelectedSeat] = useState<string | null>(null);

  const handleSeatClick = (seat: string, event: React.MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setPopoverOrigin({
      x: rect.left + rect.width / 2 - window.innerWidth / 2,
      y: rect.top + rect.height / 2 - window.innerHeight / 2,
    });
    setTempSelectedSeat(seat);
    setPopoverOpen(true);
  };

  const handleFocusSelect = (focus: FocusType) => {
    if (tempSelectedSeat) {
      setSelectedSeat(tempSelectedSeat);
      setSelectedFocus(focus);
      setPopoverOpen(false);

      setTimeout(() => {
        router.push('/book/ticket');
      }, 500);
    }
  };

  useEffect(() => {
    if (!selectedFlight) {
      router.push('/');
    }
  }, [selectedFlight, router]);

  if (!selectedFlight) {
    return null;
  }

  const FocusIcon = selectedFocus ? FOCUS_ICONS[selectedFocus] : null;

  return (
    <div className="relative w-full h-screen bg-ios-zinc-950 overflow-hidden">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-ios-zinc-900/70 backdrop-blur-xl border-b border-ios-zinc-800">
        <div className="flex items-center justify-between px-6 py-4">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-ios-white">
            <ChevronLeft className="w-6 h-6" strokeWidth={1.5} />
            <span className="text-base">Back</span>
          </button>
          <h1 className="text-lg font-semibold text-ios-white">Select Seat</h1>
          <div className="w-16" />
        </div>
      </div>

      {/* Seat Map */}
      <div className="px-8 py-12 overflow-y-auto h-full">
        <div className="max-w-md mx-auto">
          <div className="mb-8 text-center">
            <p className="text-sm text-ios-gray-400">Flight to</p>
            <h2 className="text-2xl font-bold text-ios-white">
              {selectedFlight.name} ({selectedFlight.code})
            </h2>
            <p className="text-sm text-ios-gray-400 mt-1">{selectedFlight.durationMinutes} minutes</p>
          </div>

          {/* Seat Grid */}
          <div className="space-y-3">
            {SEATS.map((row, rowIndex) => (
              <div key={rowIndex} className="grid grid-cols-4 gap-3">
                {row.map((seat) => {
                  const isSelected = selectedSeat === seat;
                  return (
                    <motion.button
                      key={seat}
                      onClick={(e) => handleSeatClick(seat, e)}
                      whileTap={{ scale: 0.95 }}
                      className={`aspect-square rounded-xl flex items-center justify-center font-semibold text-sm transition-all ${
                        isSelected
                          ? 'bg-ios-white text-ios-black'
                          : 'bg-ios-zinc-800 text-ios-gray-400 hover:bg-ios-zinc-700'
                      }`}
                    >
                      {isSelected && FocusIcon ? (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                        >
                          <FocusIcon className="w-6 h-6" strokeWidth={1.5} />
                        </motion.div>
                      ) : (
                        seat
                      )}
                    </motion.button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Focus Type Popover */}
      <FocusTypePopover
        isOpen={popoverOpen}
        origin={popoverOrigin}
        onSelect={handleFocusSelect}
        onClose={() => setPopoverOpen(false)}
      />
    </div>
  );
}
