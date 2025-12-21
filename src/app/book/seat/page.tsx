'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useBookingStore } from '@/store/bookingStore';
import FocusTypePopover from '@/components/FocusTypePopover';
import { ChevronLeft, Laptop, BookOpen, Coffee, Moon, LucideIcon } from 'lucide-react';
import { FocusType } from '@/types';

const SEATS = [
  ['01A', '01C', '', '01D', '01F'],
  ['02A', '02C', '', '02D', '02F'],
  ['03A', '03C', '', '03D', '03F'],
  ['04A', '04C', '', '04D', '04F'],
  ['05A', '05C', '', '05D', '05F'],
  ['06A', '06C', '', '06D', '06F'],
  ['07A', '07C', '', '07D', '07F'],
  ['08A', '08C', '', '08D', '08F'],
  ['09A', '09C', '', '09D', '09F'],
  ['10A', '10C', '', '10D', '10F'],
];

const FOCUS_ICONS: Record<FocusType, LucideIcon> = {
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
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

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

  const handleBack = () => {
    setIsVisible(false);
    setTimeout(() => {
      router.back();
    }, 300);
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
    <div className="relative w-full h-screen bg-ios-zinc-950 overflow-y-auto">
      {/* Background Overlay with fade-in */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 0.6 : 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 bg-black z-30"
      />

      {/* Back Button - Original Position */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={handleBack}
        className="fixed top-6 left-6 z-50 w-12 h-12 rounded-full bg-ios-white/8 border border-ios-white/10 backdrop-blur-md flex items-center justify-center text-ios-white"
      >
        <ChevronLeft className="w-8 h-8" strokeWidth={1.5} />
      </motion.button>

      {/* Modal Container with scale animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0.92,
          y: isVisible ? 0 : 30,
        }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-40 flex items-center justify-center p-6"
      >
        {/* Airplane Frame & Content Container */}
        <div className="relative w-full max-w-md h-[85vh]">
          {/* Airplane Fuselage Outer Frame */}
          <div className="absolute inset-0 pointer-events-none z-10">
          </div>

          {/* Content Area with backdrop blur */}
          <div className="relative w-full h-full bg-ios-zinc-950/90 backdrop-blur-2xl rounded-[40px] border border-ios-white/10 shadow-2xl overflow-hidden">
            <div className="overflow-y-auto px-8 py-8 h-full scrollbar-hidden">
              <div className="max-w-sm mx-auto">
                {/* Flight Info */}
                <div className="mb-8 text-center">
                  <p className="text-xs text-ios-gray-400 uppercase tracking-wider mb-1">Flight to</p>
                  <h2 className="text-2xl font-bold text-ios-white mb-1">
                    {selectedFlight.name}
                  </h2>
                  <p className="text-sm text-ios-gray-400">
                    {selectedFlight.code} · {selectedFlight.durationMinutes} min
                  </p>
                </div>

                {/* Column Labels */}
                <div className="grid grid-cols-5 gap-2 mb-4 px-2">
                  <div className="text-center text-xs font-semibold text-ios-gray-500">A</div>
                  <div className="text-center text-xs font-semibold text-ios-gray-500">C</div>
                  <div />
                  <div className="text-center text-xs font-semibold text-ios-gray-500">D</div>
                  <div className="text-center text-xs font-semibold text-ios-gray-500">F</div>
                </div>

                {/* Seat Grid */}
                <div className="space-y-3">
                  {SEATS.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex items-center gap-2">
                      {row.map((seat, seatIndex) => {
                        if (!seat) {
                          return (
                            <div key={`aisle-${rowIndex}-${seatIndex}`} className="w-full flex items-center justify-center">
                              <div className="text-[10px] font-bold text-ios-gray-600">
                                {String(rowIndex + 1).padStart(2, '0')}
                              </div>
                            </div>
                          );
                        }

                        const isSelected = selectedSeat === seat;
                        return (
                          <motion.button
                            key={seat}
                            onClick={(e) => handleSeatClick(seat, e)}
                            whileTap={{ scale: 0.92 }}
                            whileHover={{ scale: 1.05 }}
                            className={`w-full aspect-square rounded-xl flex items-center justify-center font-semibold text-xs transition-all ${
                              isSelected
                                ? 'bg-ios-white text-ios-black shadow-lg shadow-ios-white/20'
                                : 'bg-ios-white/8 text-ios-gray-400 hover:bg-ios-white/12 border border-ios-white/10 backdrop-blur-sm'
                            }`}
                          >
                            {isSelected && FocusIcon ? (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                              >
                                <FocusIcon className="w-5 h-5" strokeWidth={2} />
                              </motion.div>
                            ) : (
                              <span className="text-base font-medium">{seat}</span>
                            )}
                          </motion.button>
                        );
                      })}
                    </div>
                  ))}
                </div>

                {/* Legend */}
                <div className="mt-8 flex items-center justify-center gap-6 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-ios-white/8 border border-ios-white/10" />
                    <span className="text-ios-gray-400">Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-ios-white" />
                    <span className="text-ios-gray-400">Selected</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

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
